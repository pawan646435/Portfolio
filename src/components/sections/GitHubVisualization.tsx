'use client';

import { useRef, useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import type { Repo, GitHubProfile } from '@/types';

// ============================================
// LANGUAGE COLORS
// ============================================

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34C26',
  CSS: '#563D7C',
};

function getLanguageColor(language: string | null): string {
  return LANGUAGE_COLORS[language || ''] || '#4F8CFF';
}

// ============================================
// SKELETON CARD
// ============================================

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="skeleton-card rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-[32px] min-h-[200px] flex flex-col justify-center space-y-4"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="h-5 w-3/4 rounded-lg bg-white/[0.06] animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.04] animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-white/[0.04] animate-pulse" />
      </div>
      <div className="flex items-center gap-4 pt-2 mt-auto">
        <div className="h-3 w-16 rounded bg-white/[0.04] animate-pulse" />
        <div className="h-3 w-10 rounded bg-white/[0.04] animate-pulse" />
      </div>
    </div>
  );
}

// ============================================
// REPO CARD
// ============================================

function RepoCard({ repo }: { repo: Repo }) {
  const langColor = getLanguageColor(repo.language);
  const truncatedDesc =
    repo.description && repo.description.length > 100
      ? repo.description.slice(0, 100) + '…'
      : repo.description;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card opacity-0 group block h-full"
    >
      <div
        className={`
          relative rounded-2xl overflow-hidden
          bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]
          p-[32px] md:p-[36px] h-full min-h-[200px] flex flex-col justify-center items-start
          transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
          hover:bg-white/[0.05] hover:border-white/[0.12]
          hover:-translate-y-1.5 hover:shadow-[0_8px_40px_rgba(79,140,255,0.08)]
        `}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-400"
          style={{
            background: `linear-gradient(90deg, transparent, ${langColor}, transparent)`,
          }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-[16px] w-full">
          <div className="flex items-center gap-2.5 min-w-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-[#A0A0A0]"
            >
              <path
                d="M2 4.5A2.5 2.5 0 014.5 2h7A2.5 2.5 0 0114 4.5v7a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 012 11.5v-7z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M5.5 2v12"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            <h3 className="text-white font-bold text-lg tracking-tight truncate group-hover:text-[#4F8CFF] transition-colors duration-300">
              {repo.name}
            </h3>
          </div>

          {/* External link icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="shrink-0 text-[#A0A0A0] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path
              d="M5 2h7v7M12 2L5.5 8.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Description */}
        <p className="text-[#A0A0A0] text-sm leading-[1.7] mb-6 text-left">
          {truncatedDesc || 'No description provided'}
        </p>

        {/* Bottom metadata */}
        <div className="flex items-center gap-4 text-xs text-[#A0A0A0] mt-auto pt-4 border-t border-white/[0.04] w-full">
          {/* Language */}
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: langColor }}
              />
              <span>{repo.language}</span>
            </div>
          )}

          {/* Stars */}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.7 3.8 11.4l.6-3.6L1.8 5.3l3.6-.5L7 1.5z"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{repo.stargazers_count}</span>
            </div>
          )}

          {/* Forks */}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 2v4a3 3 0 003 3h0a3 3 0 003-3V2M4 12v-2M10 12v-2"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

// ============================================
// MAIN SECTION
// ============================================

export default function GitHubVisualization() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Fetch repos & profile data
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!cancelled) {
          setRepos(data.repos || []);
          setProfile(data.profile || null);
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        if (!cancelled) {
          setRepos([]);
          setProfile(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate title
          if (titleRef.current) {
            animate(titleRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              ease: 'outExpo',
            });
          }

          // Animate stats cards & repo cards together
          const animElements = contentRef.current?.querySelectorAll('.stats-card, .repo-card');
          if (animElements && animElements.length > 0) {
            animate(animElements, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.97, 1],
              duration: 800,
              delay: stagger(60, { start: 200 }),
              ease: 'outExpo',
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAnimated, isLoading]);

  return (
    <section
      ref={sectionRef}
      id="github"
      className="relative w-full overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.025]"
          style={{
            background: 'radial-gradient(circle, #4F8CFF 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Title */}
        <div ref={titleRef} className="opacity-0 w-full max-w-5xl flex flex-col items-center text-center">
          <p className="text-[#4F8CFF] text-sm font-mono tracking-widest uppercase mb-4">
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
            {'// Open Source & Projects'}
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
          </p>
          <h2 className="section-title gradient-text mb-[20px]">GitHub</h2>
          <p className="section-subtitle mb-[56px] max-w-2xl mx-auto text-center leading-[1.7]">
            Open Source &amp; Projects — exploring ideas through code.
          </p>
        </div>

        {/* Content Area */}
        <div ref={contentRef} className="w-full">
          {isLoading ? (
            <div className="space-y-[48px]">
              {/* Skeleton Stats Header */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] md:gap-[24px] lg:gap-[32px]">
                <div className="md:col-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 md:p-8 flex items-center gap-5 animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-white/[0.05] shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-white/[0.05] rounded w-1/3" />
                    <div className="h-3 bg-white/[0.03] rounded w-1/4" />
                    <div className="h-3 bg-white/[0.03] rounded w-3/4 mt-2" />
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 md:p-8 flex flex-col justify-center items-center animate-pulse">
                  <div className="h-8 bg-white/[0.05] rounded w-1/2" />
                  <div className="h-3 bg-white/[0.03] rounded w-2/3 mt-3" />
                </div>
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 md:p-8 flex flex-col justify-center items-center animate-pulse">
                  <div className="h-8 bg-white/[0.05] rounded w-2/3" />
                  <div className="h-3 bg-white/[0.03] rounded w-2/3 mt-3" />
                </div>
              </div>

              {/* Skeleton Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px] lg:gap-[32px]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} index={i} />
                ))}
              </div>
            </div>
          ) : repos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#A0A0A0] text-lg">Unable to load repositories.</p>
              <p className="text-[#A0A0A0]/60 text-sm mt-2">Please try again later.</p>
            </div>
          ) : (
            <div className="space-y-[48px]">
              {/* Profile & Stats Header */}
              {profile && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] md:gap-[24px] lg:gap-[32px] items-stretch">
                  {/* Profile Card */}
                  <div className="stats-card opacity-0 md:col-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 flex items-center gap-5 hover:bg-white/[0.04] transition-all duration-300">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || profile.login}
                      className="w-16 h-16 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0"
                    />
                    <div className="min-w-0 text-left">
                      <h3 className="text-xl font-bold text-white tracking-tight">{profile.name || 'Pawan Kumar'}</h3>
                      <p className="text-[#a0a0a0] text-xs font-mono mt-0.5">@{profile.login}</p>
                      <p className="text-[#a0a0a0] text-sm mt-2 leading-relaxed line-clamp-2">{profile.bio || 'AI Engineer & Full-Stack Developer'}</p>
                    </div>
                  </div>

                  {/* Stat Card 1 */}
                  <div className="stats-card opacity-0 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 flex flex-col justify-center items-center text-center hover:bg-white/[0.04] transition-all duration-300">
                    <span className="text-4xl font-extrabold text-[#4F8CFF] tracking-tight">{profile.public_repos || 24}</span>
                    <span className="text-xs uppercase tracking-widest text-[#a0a0a0] mt-2 font-mono">Repositories</span>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="stats-card opacity-0 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 flex flex-col justify-center items-center text-center hover:bg-white/[0.04] transition-all duration-300">
                    <span className="text-4xl font-extrabold text-[#8B5CF6] tracking-tight">TypeScript</span>
                    <span className="text-xs uppercase tracking-widest text-[#a0a0a0] mt-2 font-mono">Primary Language</span>
                  </div>
                </div>
              )}

              {/* Repositories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px] lg:gap-[32px]">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View All link */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/pawan646435"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-medium">View All on GitHub</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
