// File: app/api/github-stats/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Mendefinisikan tipe data untuk kejelasan dan keamanan
type Repo = { name: string; owner: { login: string; }; };
type RepoContribution = { repository: Repo };
type CommitNode = { additions: number; deletions: number; committedDate: string; };

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.nodeId || !session.accessToken || !session.user.login) {
    return NextResponse.json({ error: "Unauthorized: Session data is incomplete." }, { status: 401 });
  }

  const { accessToken } = session;
  const { login: username, nodeId: authorId } = session.user;

  const now = new Date();
  const fromDateISO = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const toDateISO = toDate.toISOString();

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
    const repositories: Repo[] = contributions.commitContributionsByRepository.map((item: RepoContribution) => item.repository);
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
              for (const commit of repoData.defaultBranchRef.target.history.nodes as CommitNode[]) {
                  // --- PERUBAHAN KUNCI ADA DI 2 BARIS INI ---
                  totalAdditions += (commit.additions || 0); // Memberi nilai default 0
                  totalDeletions += (commit.deletions || 0); // Memberi nilai default 0
              }
          }
      }
    }
    
    const daysInMonth = toDate.getDate();
    const totalChanges = totalAdditions + totalDeletions;
    const averageChangesPerDay = daysInMonth > 0 ? totalChanges / daysInMonth : 0;

    const processedData = {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalAdditions,
      totalDeletions,
      calendarWeeks: contributions.contributionCalendar.weeks,
      averageChangesPerDay: averageChangesPerDay,
    };

    return NextResponse.json(processedData);

   } catch (error) {
    // FIX: Penanganan error yang lebih aman
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Detailed API Error:", errorMessage);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}