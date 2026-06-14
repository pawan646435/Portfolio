// ============================================
// GitHub API Client
// ============================================

import { Repo, GitHubProfile } from '@/types';

const GITHUB_USERNAME = 'pawan646435';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchUserRepos(): Promise<Repo[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  // Use PAT if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`,
    {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status}`);
    return [];
  }

  const repos: Repo[] = await response.json();

  // Filter out forks, small repos, and specific excluded projects
  const excludedTerms = ['resume', 'judge0', 'judgeo', 'firebase_proxy_function', 'pawan646435'];

  return repos
    .filter((repo) => {
      if (repo.size <= 0) return false;
      const nameLower = repo.name.toLowerCase();
      return !excludedTerms.some((term) => nameLower.includes(term));
    })
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
    Rust: '#DEA584',
    Go: '#00ADD8',
    Java: '#B07219',
    'C++': '#F34B7D',
    C: '#555555',
    HTML: '#E34C26',
    CSS: '#563D7C',
    Shell: '#89E051',
    Jupyter: '#F37626',
    Dart: '#00B4AB',
    Swift: '#FA7343',
    Kotlin: '#A97BFF',
  };
  return colors[language || ''] || '#4F8CFF';
}

export async function fetchUserProfile(): Promise<GitHubProfile> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API profile error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return {
      login: GITHUB_USERNAME,
      avatar_url: 'https://avatars.githubusercontent.com/u/101740698?v=4',
      public_repos: 24,
      followers: 12,
      following: 15,
      bio: 'AI Engineer | Full-Stack Developer | Automation Builder',
      name: 'Pawan Kumar',
    };
  }
}
