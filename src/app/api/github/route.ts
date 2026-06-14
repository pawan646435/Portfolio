import { NextResponse } from 'next/server';
import { fetchUserRepos, fetchUserProfile } from '@/lib/github';

export async function GET() {
  try {
    const [repos, profile] = await Promise.all([
      fetchUserRepos(),
      fetchUserProfile(),
    ]);
    return NextResponse.json({ repos, profile });
  } catch (error) {
    console.error('GitHub API fetch failed:', error);
    return NextResponse.json({ repos: [], profile: null }, { status: 500 });
  }
}
