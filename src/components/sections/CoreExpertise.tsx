'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/* ─── Types ─── */
interface SkillNode {
  id: number;
  label: string;
  description: string;
  orbitRadius: number;    // % of container half-width
  speed: number;          // radians per second
  startAngle: number;     // initial offset in radians
  eccentricity: number;   // 0 = circle, higher = more elliptical
}

/* ─── Skill data ─── */
const SKILLS: SkillNode[] = [
  {
    id: 1,
    label: 'AI Engineering',
    description:
      'Building intelligent systems with LLMs, fine-tuning models, prompt engineering, and deploying AI pipelines at scale.',
    orbitRadius: 0.82,
    speed: 0.35,
    startAngle: 0,
    eccentricity: 0.35,
  },
  {
    id: 2,
    label: 'Full Stack Dev',
    description:
      'End-to-end product development with Next.js, React, Node.js, databases, and modern deployment infrastructure.',
    orbitRadius: 0.7,
    speed: 0.45,
    startAngle: Math.PI / 3,
    eccentricity: 0.25,
  },
  {
    id: 3,
    label: 'Automation',
    description:
      'Designing systems that eliminate manual work — CI/CD pipelines, workflow automation, and intelligent scripting.',
    orbitRadius: 0.9,
    speed: 0.28,
    startAngle: (2 * Math.PI) / 3,
    eccentricity: 0.4,
  },
  {
    id: 4,
    label: 'Agentic Workflows',
    description:
      'Multi-agent orchestration, tool-use patterns, and autonomous AI systems that reason, plan, and execute.',
    orbitRadius: 0.65,
    speed: 0.55,
    startAngle: Math.PI,
    eccentricity: 0.2,
  },
  {
    id: 5,
    label: 'Product Dev',
    description:
      'Taking ideas from 0 → 1: user research, prototyping, shipping MVPs, and iterating with real feedback.',
    orbitRadius: 0.78,
    speed: 0.38,
    startAngle: (4 * Math.PI) / 3,
    eccentricity: 0.3,
  },
  {
    id: 6,
    label: 'Backend Arch',
    description:
      'Scalable APIs, microservices, event-driven architecture, database design, and performance optimisation.',
    orbitRadius: 0.85,
    speed: 0.42,
    startAngle: (5 * Math.PI) / 3,
    eccentricity: 0.28,
  },
];

/* ─── Mobile Card ─── */
function SkillCard({
  skill,
  index,
}: {
  skill: SkillNode;
  index: number;
}) {
  return (
    <div
      className="skill-card bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 opacity-0 transition-colors duration-300 hover:border-accent/20 hover:bg-white/[0.05] md:p-6"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(79,140,255,0.6)]" />
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-white">
          {skill.label}
        </h3>
      </div>
      <p className="text-xs leading-relaxed text-secondary">
        {skill.description}
      </p>
    </div>
  );
}

/* ─── Detail Panel (desktop, on node click) ─── */
function DetailPanel({
  skill,
  onClose,
}: {
  skill: SkillNode;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    animate(el, { opacity: [0, 1], y: [12, 0] }, { duration: 0.4, ease: 'easeOut' });
  }, []);

  return (
    <div
      ref={panelRef}
      className="absolute bottom-8 left-1/2 z-30 w-[min(360px,90%)] -translate-x-1/2 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 opacity-0 shadow-[0_0_60px_rgba(79,140,255,0.08)]"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-xs text-secondary transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Close detail panel"
      >
        ✕
      </button>
      <div className="mb-3 h-px w-8 bg-accent/60" />
      <h4 className="mb-2 text-base font-semibold tracking-tight text-white">
        {skill.label}
      </h4>
      <p className="text-sm leading-relaxed text-secondary">
        {skill.description}
      </p>
    </div>
  );
}

/* ─── SVG Orbital System (desktop) ─── */
function OrbitalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const anglesRef = useRef<number[]>(SKILLS.map((s) => s.startAngle));
  const lastTimeRef = useRef<number>(0);
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nodeGroupsRef = useRef<(SVGGElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const dashOffsetRef = useRef(0);

  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  /* IntersectionObserver to pause loop when offscreen */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Listen for tab visibility changes */
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  /* Resize handler */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  /* Animation loop */
  useEffect(() => {
    if (dimensions.width === 0 || !isInView || !isTabVisible) {
      lastTimeRef.current = 0;
      return;
    }

    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const baseRadius = Math.min(cx, cy);

    const loop = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      /* Mouse influence: subtle offset */
      const mx = (mouseRef.current.x - 0.5) * 0.15;
      const my = (mouseRef.current.y - 0.5) * 0.15;

      /* Animate dash offset for connection lines */
      dashOffsetRef.current -= dt * 30;

      SKILLS.forEach((skill, i) => {
        anglesRef.current[i] += skill.speed * dt;
        const angle = anglesRef.current[i];

        const rx = baseRadius * skill.orbitRadius;
        const ry = rx * (1 - skill.eccentricity);

        const nx = cx + Math.cos(angle) * rx + mx * rx * 0.3;
        const ny = cy + Math.sin(angle) * ry + my * ry * 0.3;

        /* Move node */
        const g = nodeGroupsRef.current[i];
        if (g) {
          g.setAttribute('transform', `translate(${nx}, ${ny})`);
        }

        /* Move line */
        const line = linesRef.current[i];
        if (line) {
          line.setAttribute('x2', String(nx));
          line.setAttribute('y2', String(ny));
          line.setAttribute('stroke-dashoffset', String(dashOffsetRef.current));
        }
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [dimensions, isInView, isTabVisible]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={60}
          fill="url(#center-glow)"
        />

        {/* Connection lines */}
        {SKILLS.map((_, i) => (
          <line
            key={`line-${i}`}
            ref={(el) => { linesRef.current[i] = el; }}
            x1={dimensions.width / 2}
            y1={dimensions.height / 2}
            x2={dimensions.width / 2}
            y2={dimensions.height / 2}
            stroke="rgba(79,140,255,0.12)"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeDashoffset="0"
          />
        ))}

        {/* Center node */}
        <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
          <circle r="38" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle r="12" fill="#4F8CFF" opacity="0.15" />
          <circle r="8" fill="#4F8CFF" opacity="0.4" />
          <circle r="4" fill="#4F8CFF" />
          <text
            y="-50"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.15em"
            fontFamily="var(--font-geist-mono), monospace"
          >
            CORE
          </text>
          <text
            y="-37"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.15em"
            fontFamily="var(--font-geist-mono), monospace"
          >
            EXPERTISE
          </text>
        </g>

        {/* Orbiting nodes */}
        {SKILLS.map((skill, i) => (
          <g
            key={skill.id}
            ref={(el) => { nodeGroupsRef.current[i] = el; }}
            className="cursor-pointer"
            data-cursor-text="Explore"
            data-cursor-color="white"
            onClick={() => setActiveSkill(activeSkill?.id === skill.id ? null : skill)}
          >
            {/* outer ring */}
            <circle
              r="32"
              fill="rgba(255,255,255,0.02)"
              stroke={
                activeSkill?.id === skill.id
                  ? 'rgba(79,140,255,0.5)'
                  : 'rgba(255,255,255,0.06)'
              }
              strokeWidth="1"
              className="transition-[stroke] duration-300"
            />
            {/* accent dot */}
            <circle
              r="10"
              fill="#4F8CFF"
              opacity={activeSkill?.id === skill.id ? 0.15 : 0.08}
              className="transition-opacity duration-300"
            />
            <circle
              r="6"
              fill="#4F8CFF"
              opacity={activeSkill?.id === skill.id ? 0.4 : 0.25}
              className="transition-opacity duration-300"
            />
            <circle
              r="3"
              fill="#4F8CFF"
              opacity={activeSkill?.id === skill.id ? 1 : 0.6}
              className="transition-opacity duration-300"
            />
            {/* label */}
            <text
              y="48"
              textAnchor="middle"
              fill={activeSkill?.id === skill.id ? '#ffffff' : '#a0a0a0'}
              fontSize="10"
              fontWeight="500"
              letterSpacing="0.04em"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif"
              className="select-none transition-[fill] duration-300"
            >
              {skill.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Detail panel */}
      {activeSkill && (
        <DetailPanel
          key={activeSkill.id}
          skill={activeSkill}
          onClose={() => setActiveSkill(null)}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════ */
export default function CoreExpertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const isVisible = useInView(sectionRef, {
    amount: 0.1,
    margin: '0px 0px -40px 0px',
    once: true,
  });

  /* Responsive breakpoint */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Entrance animations */
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const section = sectionRef.current;
    if (!section) return;

    const safeAnimate = (selector: string, keyframes: any, options: any) => {
      const els = section.querySelectorAll(selector);
      if (els.length > 0) animate(els, keyframes, options);
    };

    safeAnimate('.title-word', { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, ease: 'easeOut', delay: (i: number) => 0.1 + i * 0.1 });

    safeAnimate('.section-sub', { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, ease: 'easeOut', delay: 0.4 });

    safeAnimate('.orbital-wrapper', { opacity: [0, 1], scale: [0.95, 1] }, { duration: 1.0, ease: 'easeOut', delay: 0.5 });

    safeAnimate('.skill-card', { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: 'easeOut', delay: (i: number) => 0.4 + i * 0.08 });
  }, [isVisible]);

  const titleWords = ['Core', 'Expertise'];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* ambient */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-[140px]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 flex flex-col items-center">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
        {/* ── label ── */}
        <p className="section-eyebrow section-label text-xs font-mono uppercase tracking-[0.2em] text-[#4F8CFF] opacity-0">
          <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
          Skills &amp; Domains
          <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
        </p>

        {/* ── title ── */}
        <h2 className="section-heading flex flex-wrap justify-center gap-x-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white" data-cursor-text="Expertise" data-cursor-color="white">
          {titleWords.map((word, i) => (
            <span key={i} className="title-word inline-block opacity-0">
              {word}
            </span>
          ))}
        </h2>

        {/* ── subtitle ── */}
        <p className="section-description section-sub text-base text-[#A0A0A0] font-light leading-relaxed opacity-0 text-center">
          An interconnected system of skills — click a node to explore.
        </p>

        {/* ── orbital (desktop) / grid (mobile) ── */}
        {isMobile ? (
          <div className="grid w-full max-w-2xl mx-auto grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-6">
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        ) : (
          <div className="orbital-wrapper relative mx-auto aspect-square w-full max-w-[640px] opacity-0">
            <OrbitalCanvas />
          </div>
        )}
        </div>
      </div>

      {/* bottom gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-accent/[0.015] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
