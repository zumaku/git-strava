// File: app/api/github-stats/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

type Repo = { name: string; owner: { login: string; }; };

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.nodeId || !session.accessToken || !session.user.login) {
    return NextResponse.json({ error: "Unauthorized: Session data is incomplete." }, { status: 401 });
  }

  const { accessToken } = session;
  const { login: username, nodeId: authorId } = session.user;

  const now = new Date();
  const fromDateISO = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const toDateISO = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  try {
    // LANGKAH 1: Dapatkan daftar repositori tempat pengguna berkontribusi
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
    const dailyStats: { [key: string]: number } = {};

    // LANGKAH 2: Dapatkan statistik commit jika ada repositori
    if (uniqueRepos.length > 0) {
      const commitStatsQuery = `
        query($fromDate: GitTimestamp!, $toDate: GitTimestamp!, $authorId: ID!) {
          ${uniqueRepos.map((repo, index) => `
            repo${index}: repository(owner: "${repo.owner.login}", name: "${repo.name}") {
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(since: $fromDate, until: $toDate, author: { id: $authorId }) {
                      nodes { additions deletions committedDate }
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

      // LANGKAH 3: Proses semua data commit
      for (const key in statsData.data) {
          const repoData = statsData.data[key];
          if (repoData?.defaultBranchRef?.target?.history?.nodes) {
              for (const commit of repoData.defaultBranchRef.target.history.nodes) {
                  // Akumulasi total
                  totalAdditions += commit.additions;
                  totalDeletions += commit.deletions;

                  // Akumulasi data harian
                  const date = new Date(commit.committedDate).toISOString().split('T')[0];
                  const changes = commit.additions + commit.deletions;
                  dailyStats[date] = (dailyStats[date] || 0) + changes;
              }
          }
      }
    }

    // Mengubah format data harian untuk Recharts dan mengurutkannya
    const dailyStatsArray = Object.keys(dailyStats)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) // Urutkan berdasarkan tanggal
      .map(date => ({
        // Format tanggal menjadi '16 Jun' agar mudah dibaca di grafik
        date: new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        perubahan: dailyStats[date],
    }));

    // Data final yang akan dikirim ke frontend
    const processedData = {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalAdditions,
      totalDeletions,
      calendarWeeks: contributions.contributionCalendar.weeks,
      dailyStats: dailyStatsArray,
    };

    return NextResponse.json(processedData);

  } catch (error: any) {
    console.error("Detailed API Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}