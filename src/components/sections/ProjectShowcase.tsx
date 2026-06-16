'use client';

import { useState, useRef, useEffect } from 'react';
import { animate, motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string }[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'skillpilot',
    title: 'SkillPilot',
    tagline: 'AI-Enhanced Coding Assessment Platform',
    description:
      'A sophisticated platform for modern interview preparation, coding assessments, and competitive real-time coding. Features AI interviews with voice/text, 1v1 Code Battles, a recruiter dashboard, and India-focused career hub — built on a serverless micro-backend architecture.',
    metrics: [
      { value: '1v1', label: 'Code Battles' },
      { value: 'AI', label: 'Interviewer' },
      { value: 'Live', label: 'Collab Editor' },
    ],
    techStack: ['React', 'Vite', 'Firebase', 'Groq AI', 'Firestore', 'Monaco Editor'],
    liveUrl: 'https://skill-pilot-coral.vercel.app/',
    githubUrl: 'https://github.com/pawan646435',
    accentColor: '#4F8CFF',
  },
  {
    id: 'flowdesk',
    title: 'FlowDesk AI',
    tagline: 'AI-Powered Workflow & Automation Platform',
    description:
      'A multi-agent AI platform that orchestrates complex workflows, handles intelligent ticket routing, and automates multi-step processes through an intuitive pipeline builder.',
    metrics: [
      { value: '40%', label: 'Faster Routing' },
      { value: '3', label: 'AI Agents' },
      { value: '24/7', label: 'Automation' },
    ],
    techStack: ['React', 'Node.js', 'Python', 'LangChain', 'Redis', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/pawan646435',
    accentColor: '#8B5CF6',
  },
];

function MockupVisualization({ project }: { project: FeaturedProject }) {
  const isSkillPilot = project.id === 'skillpilot';

  return (
    <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] md:min-h-[280px]">
      {/* Mockup top bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-[9px] font-mono text-[#606060]">
          {isSkillPilot ? 'assessment.run' : 'pipeline.flow'}
        </span>
      </div>

      {/* Mockup content */}
      <div className="p-5 md:p-6 space-y-4">
        {isSkillPilot ? (
          <>
            {/* Feature tabs */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.04]">
              {['Code Battle', 'AI Interview', 'Career Hub'].map((tab) => (
                <div
                  key={tab}
                  className="flex-1 text-center py-1.5 px-2 rounded-md text-[9px] font-mono font-semibold uppercase tracking-wider transition-all"
                  style={{
                    backgroundColor: tab === 'Code Battle' ? `${project.accentColor}15` : 'transparent',
                    color: tab === 'Code Battle' ? project.accentColor : '#606060',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Code Battle area */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-[#0a0a0a] border border-white/[0.06] overflow-hidden">
                <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/[0.04] bg-white/[0.02]">
                  <span className="text-[8px] font-mono text-emerald-400">●</span>
                  <span className="text-[8px] font-mono text-[#606060]">solution.ts</span>
                </div>
                <div className="p-2.5 font-mono text-[9px] leading-relaxed">
                  <div className="text-[#86C2FF]">function</div>
                  <div className="text-[#86C2FF] ml-2">twoSum</div>
                  <div className="text-[#606060] ml-2">(nums: number[],</div>
                  <div className="text-[#606060] ml-4">target: number)</div>
                  <div className="text-[#86C2FF] ml-2">: number[] {'{'}</div>
                  <div className="text-[#606060] ml-4">const map =</div>
                  <div className="text-[#606060] ml-4">new Map()</div>
                  <div className="text-[#606060] ml-2">{'}'}</div>
                </div>
              </div>
              <div className="rounded-lg bg-[#0a0a0a] border border-white/[0.06] overflow-hidden">
                <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/[0.04] bg-white/[0.02]">
                  <span className="text-[8px] font-mono text-[#ff5f56]">●</span>
                  <span className="text-[8px] font-mono text-[#606060]">opponent.py</span>
                </div>
                <div className="p-2.5 font-mono text-[9px] leading-relaxed opacity-60">
                  <div className="text-[#86C2FF]">def</div>
                  <div className="text-[#86C2FF] ml-2">two_sum</div>
                  <div className="text-[#606060] ml-2">(nums, target):</div>
                  <div className="text-[#606060] ml-4">seen = {'{}'}</div>
                  <div className="text-[#606060] ml-4">for i, val in</div>
                  <div className="text-[#606060] ml-4">enumerate(nums):</div>
                </div>
              </div>
            </div>

            {/* Match status */}
            <div
              className="rounded-lg p-3 border flex items-center justify-between"
              style={{
                backgroundColor: `${project.accentColor}06`,
                borderColor: `${project.accentColor}12`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400">Live — Round 3/5</span>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono">
                <span className="text-white/80">You: 2</span>
                <span className="text-[#606060]">|</span>
                <span className="text-[#808080]">Opp: 1</span>
              </div>
            </div>

            {/* AI Interview card */}
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] border border-white/[0.04] p-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px]"
                style={{ backgroundColor: `${project.accentColor}15` }}
              >
                🤖
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-white/80">AI Interview — Groq LLM</p>
                <p className="text-[8px] font-mono text-[#606060] truncate">
                  Voice & text with real-time feedback
                </p>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 shrink-0">✓ Ready</span>
            </div>
          </>
        ) : (
          <>
            {/* Pipeline flow */}
            <div className="flex items-center justify-between gap-1">
              {['Trigger', 'Classify', 'Route', 'Execute', 'Response'].map(
                (step, i) => (
                  <div key={step} className="flex items-center gap-1 flex-1">
                    <div
                      className="flex items-center justify-center w-7 h-7 rounded-full text-[9px] font-mono font-bold"
                      style={{
                        backgroundColor: i < 3 ? `${project.accentColor}20` : 'white/[0.04]',
                        color: i < 3 ? project.accentColor : '#606060',
                        borderColor: i < 3 ? `${project.accentColor}30` : 'white/[0.06]',
                        borderWidth: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < 4 && (
                      <div
                        className="h-px flex-1"
                        style={{
                          backgroundColor: i < 2 ? project.accentColor : 'white/[0.06]',
                          opacity: i < 2 ? 0.5 : 1,
                        }}
                      />
                    )}
                  </div>
                )
              )}
            </div>

            {/* Status console */}
            <div className="rounded-lg bg-[#0a0a0a] border border-white/[0.06] p-3 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>●</span>
                <span>Payload received (200 OK)</span>
              </div>
              <div className="flex items-center gap-2 text-[#86C2FF]">
                <span className="text-[#606060]">●</span>
                <span>Intent: db_connection_fail (97.4%)</span>
              </div>
              <div className="flex items-center gap-2 text-[#86C2FF]">
                <span className="text-[#606060]">●</span>
                <span>SLA: P0 Critical — 4h response</span>
              </div>
              <div className="flex items-center gap-2 text-[#86C2FF]">
                <span className="text-[#606060]">●</span>
                <span>Assigned: DB_Recovery_Agent</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Processed', value: '1,247' },
                { label: 'Success', value: '99.2%' },
                { label: 'Avg Time', value: '1.2s' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-2.5 text-center"
                >
                  <p className="text-[11px] font-bold" style={{ color: project.accentColor }}>
                    {stat.value}
                  </p>
                  <p className="text-[8px] font-mono text-[#606060] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FeaturedProjectCard({
  project,
}: {
  project: FeaturedProject;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${pointerX}% ${pointerY}%, ${project.accentColor}, transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleCardClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card opacity-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role={project.liveUrl ? 'link' : undefined}
      tabIndex={project.liveUrl ? 0 : undefined}
      onKeyDown={
        project.liveUrl
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') handleCardClick();
            }
          : undefined
      }
      style={{ cursor: project.liveUrl ? 'pointer' : undefined }}
    >
      <div
        className="relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out"
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderColor: isHovered
            ? `${project.accentColor}30`
            : 'rgba(255,255,255,0.06)',
          boxShadow: isHovered
            ? `0 0 60px ${project.accentColor}12, 0 0 120px ${project.accentColor}06`
            : 'none',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Spotlight gradient */}
        <motion.div
          className="pointer-events-none absolute -inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: spotlight,
          }}
        />

        {/* Top accent glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Mockup */}
          <div className="p-4 md:p-5 lg:p-6">
            <MockupVisualization project={project} />
          </div>

          {/* Right: Details */}
          <div className="p-4 md:p-5 lg:p-6 flex flex-col justify-center">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: project.accentColor }}
              />
              <span
                className="text-[9px] font-mono font-semibold uppercase tracking-[0.15em]"
                style={{ color: project.accentColor }}
              >
                Featured Project
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
              {project.title}
            </h3>

            <p className="text-[11px] font-mono text-[#808080] mb-3">
              {project.tagline}
            </p>

            <p className="text-xs md:text-sm text-[#a0a0a0] leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Metrics */}
            <div className="flex items-center gap-4 md:gap-6 mb-5">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p
                    className="text-base md:text-lg font-bold tracking-tight"
                    style={{ color: project.accentColor }}
                  >
                    {m.value}
                  </p>
                  <p className="text-[9px] font-mono text-[#606060] uppercase tracking-wider">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[9px] font-mono rounded-md border"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    color: '#a0a0a0',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="Live Demo"
                  data-cursor-color="white"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: project.accentColor,
                    color: '#ffffff',
                    boxShadow: `0 4px 16px ${project.accentColor}25`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1.5v9M1.5 6h9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="GitHub"
                  data-cursor-color="white"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold rounded-full border transition-all duration-300 hover:bg-white/[0.05]"
                  style={{
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const cards = sectionRef.current?.querySelectorAll('.project-card');
          if (cards) {
            animate(cards, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, ease: 'easeOut', delay: (i: number) => i * 0.15 });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const focusAreas = [
    {
      title: 'AI Agents',
      desc: 'Building autonomous agents that reason, plan, and execute complex tasks using LLM orchestration and tool-use frameworks.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 014 4c0 1.1-.9 2-2 2h-4a2 2 0 01-2-2 4 4 0 014-4z" />
          <path d="M8 8v2a4 4 0 008 0V8" />
          <path d="M12 14v4M8 22h8M10 18h4" />
          <circle cx="10" cy="5" r="0.5" fill="#4F8CFF" />
          <circle cx="14" cy="5" r="0.5" fill="#4F8CFF" />
        </svg>
      ),
    },
    {
      title: 'RAG Systems',
      desc: 'Designing retrieval-augmented generation pipelines that connect LLMs to private knowledge bases for accurate, grounded responses.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      ),
    },
    {
      title: 'Workflow Automation',
      desc: 'Creating multi-step automation pipelines that connect APIs, trigger actions, and replace manual processes with intelligent flows.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      title: 'Full Stack Engineering',
      desc: 'Crafting end-to-end applications from responsive UIs to serverless backends with focus on performance, DX, and scalability.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Cloud & DevOps',
      desc: 'Deploying, monitoring, and scaling applications on cloud infrastructure with CI/CD pipelines and containerized workflows.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14H4z" />
        </svg>
      ),
    },
    {
      title: 'System Design',
      desc: 'Architecting distributed systems with reliable data stores, caching layers, message queues, and fault-tolerant service boundaries.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="6" rx="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" />
          <circle cx="6" cy="6" r="1" fill="#4F8CFF" />
          <circle cx="6" cy="18" r="1" fill="#4F8CFF" />
        </svg>
      ),
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="section-container mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div className="section-header">
          <p className="section-eyebrow text-[11px] font-mono text-[#4F8CFF] tracking-[0.2em] uppercase">
            <span className="mr-2 inline-block h-px w-5 bg-accent align-middle" />
            Featured Work
            <span className="ml-2 inline-block h-px w-5 bg-accent align-middle" />
          </p>
          <h2
            className="section-heading text-[clamp(1.8rem,4.5vw,3rem)] font-bold tracking-tight text-white leading-[1.05]"
            data-cursor-text="Selected"
            data-cursor-color="white"
          >
            Selected Work
          </h2>
          <p className="section-description text-sm leading-relaxed text-[#808080]">
            A focused set of product builds that balance interface craft, system thinking, and execution speed.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12 flex w-full flex-col gap-5 lg:gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Current Focus */}
        <div className="border-t border-white/[0.06] pt-8 md:pt-12">
          <div className="section-header">
            <p className="section-eyebrow text-[11px] font-mono text-[#4F8CFF] tracking-[0.2em] uppercase">
              <span className="mr-2 inline-block h-px w-5 bg-accent align-middle" />
              {'// Building Toward'}
              <span className="ml-2 inline-block h-px w-5 bg-accent align-middle" />
            </p>
            <h3 className="section-heading text-lg font-bold tracking-tight text-white md:text-xl">
              Current Focus
            </h3>
            <p className="section-description max-w-xl text-xs leading-relaxed text-[#808080]">
              Technologies, domains, and systems I am actively exploring and building.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl border h-full"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                  whileHover={{
                    y: -3,
                    borderColor: 'rgba(79,140,255,0.25)',
                    boxShadow: '0 8px 32px rgba(79,140,255,0.08)',
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }}
                >
                  {/* Spotlight */}
                  <motion.div
                    className="pointer-events-none absolute -inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: 'radial-gradient(300px circle at 50% 0%, rgba(79,140,255,0.06), transparent 60%)',
                    }}
                  />

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5), transparent)',
                    }}
                  />

                  <div className="relative z-10 p-4 md:p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <motion.div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'rgba(79,140,255,0.1)' }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        {area.icon}
                      </motion.div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {area.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#808080]">
                      {area.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
