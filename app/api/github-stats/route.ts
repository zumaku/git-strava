// app/api/github-stats/route.ts

import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type Repo = { name: string; owner: { login: string; }; };

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || !token.nodeId || !token.accessToken || !token.login) {
    return NextResponse.json({ error: "Unauthorized: Invalid token data." }, { status: 401 });
  }

  const { accessToken, login: username, nodeId: authorId } = token;

  const now = new Date();
  const fromDateISO = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const toDateISO = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  try {
    const reposQuery = `
      query($username: String!, $fromDate: DateTime!, $toDate: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $fromDate, to: $toDate) {
            commitContributionsByRepository(maxRepositories: 100) {
              repository { name owner { login } }
            }
            contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } }
          }
        }
      }
    `;

    const reposResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: reposQuery, variables: { username, fromDate: fromDateISO, toDate: toDateISO } }),
    });

    const reposData = await reposResponse.json();
    if (reposData.errors) throw new Error(`Error fetching repos: ${JSON.stringify(reposData.errors)}`);
    
    const contributions = reposData.data.user.contributionsCollection;
    const repositories: Repo[] = contributions.commitContributionsByRepository.map((item: any) => item.repository);
    const uniqueRepos = Array.from(new Map(repositories.map(repo => [`${repo.owner.login}/${repo.name}`, repo])).values());

    let totalAdditions = 0;
    let totalDeletions = 0;

    if (uniqueRepos.length > 0) {
      const commitStatsQuery = `
        query($fromDate: GitTimestamp!, $toDate: GitTimestamp!, $authorId: ID!) {
          ${uniqueRepos.map((repo, index) => `
            repo${index}: repository(owner: "${repo.owner.login}", name: "${repo.name}") {
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(since: $fromDate, until: $toDate, author: { id: $authorId }) {
                      nodes { additions deletions }
                    }
                  }
                }
              }
            }
          `).join('\n')}
        }`;
      
      const statsResponse = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: { Authorization: `bearer ${accessToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ query: commitStatsQuery, variables: { fromDate: fromDateISO, toDate: toDateISO, authorId } }),
      });

      const statsData = await statsResponse.json();
      if (statsData.errors) throw new Error(`Error fetching stats: ${JSON.stringify(statsData.errors)}`);

      for (const key in statsData.data) {
          const repoData = statsData.data[key];
          if (repoData?.defaultBranchRef?.target?.history?.nodes) {
              for (const commit of repoData.defaultBranchRef.target.history.nodes) {
                  totalAdditions += commit.additions;
                  totalDeletions += commit.deletions;
              }
          }
      }
    }

    const processedData = {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalAdditions,
      totalDeletions,
      calendarWeeks: contributions.contributionCalendar.weeks,
    };

    return NextResponse.json(processedData);

  } catch (error: any) {
    console.error("Detailed API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}