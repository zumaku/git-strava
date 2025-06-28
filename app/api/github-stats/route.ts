import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

type Repo = { name: string; owner: { login: string; }; };
type RepoContribution = { repository: Repo };
type CommitNode = { oid: string; additions: number; deletions: number; committedDate: string; };

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.nodeId || !session.accessToken || !session.user.login) {
    return NextResponse.json({ error: "Unauthorized: Session data is incomplete." }, { status: 401 });
  }

  const { accessToken } = session;
  const { login: username, nodeId: authorId } = session.user;

  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  const now = new Date();
  // Gunakan input jika ada, jika tidak, gunakan bulan saat ini
  const targetYear = year ? parseInt(year) : now.getFullYear();
  const targetMonth = month ? parseInt(month) : now.getMonth();

  const fromDate = new Date(targetYear, targetMonth, 1);
  const toDate = new Date(targetYear, targetMonth + 1, 0);
  
  const fromDateISO = fromDate.toISOString();
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
    if (!reposData.data || !reposData.data.user) {
      throw new Error("Could not find user data or contributions in GitHub API response.");
    }
    
    const contributions = reposData.data.user.contributionsCollection;
    const repositories: Repo[] = contributions.commitContributionsByRepository.map((item: RepoContribution) => item.repository);
    const uniqueRepos = Array.from(new Map(repositories.map(repo => [`${repo.owner.login}/${repo.name}`, repo])).values());

    let totalAdditions = 0;
    let totalDeletions = 0;
    
    const processedCommitOids = new Set<string>();

    if (uniqueRepos.length > 0) {
      const commitStatsQuery = `
        query($fromDate: GitTimestamp!, $toDate: GitTimestamp!, $authorId: ID!) {
          ${uniqueRepos.map((repo, index) => `
            repo${index}: repository(owner: "${repo.owner.login}", name: "${repo.name}") {
              
              # --- PERUBAHAN UTAMA ADA DI BARIS INI ---
              # Menghapus 'orderBy' karena PUSHED_DATE tidak valid untuk refs
              refs(refPrefix: "refs/heads/", first: 20) {
                nodes {
                  name
                  target {
                    ... on Commit {
                      history(since: $fromDate, until: $toDate, author: { id: $authorId }) {
                        nodes {
                          oid
                          additions
                          deletions
                          committedDate
                        }
                      }
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
          if (repoData?.refs?.nodes) {
              for (const branch of repoData.refs.nodes) {
                  if (branch?.target?.history?.nodes) {
                      for (const commit of branch.target.history.nodes as CommitNode[]) {
                          if (!processedCommitOids.has(commit.oid)) {
                              totalAdditions += (commit.additions || 0);
                              totalDeletions += (commit.deletions || 0);
                              processedCommitOids.add(commit.oid);
                          }
                      }
                  }
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
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Detailed API Error:", errorMessage);
    return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
  }
}