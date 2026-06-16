'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { animate } from 'framer-motion';

/* ─── Types ─── */
interface Milestone {
  id: number;
  title: string;
  description: string;
  period: string;
}

/* ─── Data ─── */
const MILESTONES: Milestone[] = [
  {
    id: 1,
    title: 'Started Programming',
    description:
      'Discovered the joy of building things with code. Began with Python and C, solving problems and learning algorithmic thinking.',
    period: 'The Beginning',
  },
  {
    id: 2,
    title: 'Learned Full Stack Development',
    description:
      'Dove deep into React, Next.js, Node.js, and databases. Understood the full lifecycle of web applications from frontend to deployment.',
    period: 'Foundation',
  },
  {
    id: 3,
    title: 'Built Production Applications',
    description:
      'Shipped real products to real users. Learned about scale, reliability, user experience, and the discipline of production-grade engineering.',
    period: 'Execution',
  },
  {
    id: 4,
    title: 'Built AI Products',
    description:
      'Combined AI capabilities with product thinking. Built intelligent applications using LLMs, embeddings, and agentic workflows.',
    period: 'Evolution',
  },
  {
    id: 5,
    title: 'Focused on AI Engineering',
    description:
      'Specializing in AI systems architecture, multi-agent orchestration, and building the infrastructure that powers intelligent applications.',
    period: 'Now',
  },
];

/* ─── SVG Path generation ─── */
function generateTimelinePath(
  height: number,
  xCenter: number,
  amplitude: number,
  milestoneCount: number,
  width: number
): {
  path: string;
  milestonePositions: { x: number; y: number }[];
  viewBox: string;
} {
  const topPad = 60;
  const bottomPad = 60;
  const usableHeight = height - topPad - bottomPad;
  const segmentH = usableHeight / (milestoneCount - 1);

  const positions: { x: number; y: number }[] = [];
  let d = `M ${xCenter} ${topPad}`;

  for (let i = 0; i < milestoneCount; i++) {
    const y = topPad + i * segmentH;
    const direction = i % 2 === 0 ? 1 : -1;
    const x = xCenter + direction * amplitude * 0.3;

    if (i === 0) {
      positions.push({ x, y });
      continue;
    }

    const prevY = topPad + (i - 1) * segmentH;
    const prevDir = (i - 1) % 2 === 0 ? 1 : -1;
    const prevX = xCenter + prevDir * amplitude * 0.3;

    const cp1x = prevX + prevDir * amplitude * 0.6;
    const cp1y = prevY + segmentH * 0.4;
    const cp2x = x + direction * amplitude * 0.6;
    const cp2y = y - segmentH * 0.4;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;

    positions.push({ x, y });
  }

  const viewBox = `0 0 ${width} ${height}`;

  return { path: d, milestonePositions: positions, viewBox };
}

/* ─── Milestone Card ─── */
function MilestoneCard({
  milestone,
  index,
  isActive,
  isMobile,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;
    const el = cardRef.current;
    if (!el) return;

    const slideDir = isMobile ? 0 : index % 2 === 0 ? -40 : 40;

    animate(el, { opacity: [0, 1], x: [slideDir, 0], y: [20, 0] }, { duration: 0.7, ease: 'easeOut', delay: 0.1 });
  }, [isActive, index, isMobile]);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`
        w-full opacity-0
        ${isMobile ? '' : 'md:w-[calc(50%-40px)]'}
        ${!isMobile && isLeft ? 'md:mr-auto md:text-right' : ''}
        ${!isMobile && !isLeft ? 'md:ml-auto md:text-left' : ''}
      `}
    >
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 transition-all duration-400 hover:border-accent/20 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(79,140,255,0.06)] md:p-6">
        {/* period tag */}
        <span className="mb-2 inline-block rounded-full border border-accent/20 bg-accent/[0.06] px-3 py-0.5 text-[10px] font-mono uppercase tracking-[0.15em] text-accent">
          {milestone.period}
        </span>

        <h3 className="mb-2 text-base font-semibold tracking-tight text-white md:text-lg">
          {milestone.title}
        </h3>

        <p className="text-xs leading-relaxed text-secondary md:text-sm">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════ */
export default function EngineeringJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const timelineWrapperRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const dotGlowRefs = useRef<(SVGCircleElement | null)[]>([]);
  const hasEnteredView = useRef(false);
  const [activeMilestones, setActiveMilestones] = useState<boolean[]>(
    () => MILESTONES.map(() => false)
  );
  const [isMobile, setIsMobile] = useState(false);
  const [pathData, setPathData] = useState<{
    d: string;
    positions: { x: number; y: number }[];
    totalLength: number;
    viewBox: string;
  } | null>(null);

  /* Responsive */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Compute SVG path on mount / resize */
  useEffect(() => {
    const wrapper = timelineWrapperRef.current;
    if (!wrapper) return;

    const computePath = () => {
      const rect = wrapper.getBoundingClientRect();
      const h = Math.max(rect.height, 600);
      const w = rect.width;
      const xCenter = isMobile ? 24 : w / 2;
      const amplitude = isMobile ? 0 : Math.min(w * 0.15, 100);

      const { path, milestonePositions, viewBox } = generateTimelinePath(
        h,
        xCenter,
        amplitude,
        MILESTONES.length,
        w
      );

      // Set path data with a fresh viewBox; totalLength will be updated after render
      setPathData({ d: path, positions: milestonePositions, totalLength: 0, viewBox });

      // Get real path length after DOM paint
      requestAnimationFrame(() => {
        const pathEl = pathRef.current;
        if (pathEl) {
          const length = pathEl.getTotalLength();

          setPathData((prev) =>
            prev ? { ...prev, totalLength: length } : prev
          );

          pathEl.style.strokeDasharray = `${length}`;
          pathEl.style.strokeDashoffset = `${length}`;

          if (glowPathRef.current) {
            glowPathRef.current.style.strokeDasharray = `${length}`;
            glowPathRef.current.style.strokeDashoffset = `${length}`;
          }
        }
      });
    };

    computePath();

    const ro = new ResizeObserver(() => computePath());
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [isMobile]);

  /* ── Scroll-driven path draw + milestone activation ── */
  useEffect(() => {
    const wrapper = timelineWrapperRef.current;
    const pathEl = pathRef.current;
    if (!wrapper || !pathEl || !pathData) return;

    let wrapperTop = 0;
    let wrapperHeight = 0;

    const updateDimensions = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      wrapperTop = rect.top + scrollTop;
      wrapperHeight = rect.height;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });

    const updateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewH = window.innerHeight;

      // Skip when section is well offscreen (more than 1 viewport away)
      if (wrapperTop + wrapperHeight < scrollY - viewH || wrapperTop > scrollY + viewH * 2) return;

      const rectTop = wrapperTop - scrollY;
      const scrollStart = rectTop;
      const scrollEnd = rectTop + wrapperHeight;
      const totalScroll = scrollEnd - scrollStart;

      const rawProgress = (viewH - scrollStart) / (totalScroll + viewH * 0.3);
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Animate path - using cached totalLength to avoid layout recalculations
      const length = pathData.totalLength;
      if (length > 0) {
        const offset = length * (1 - progress);
        pathEl.style.strokeDashoffset = `${offset}`;
        if (glowPathRef.current) {
          glowPathRef.current.style.strokeDashoffset = `${offset}`;
        }
      }

      // Activate milestones based on progress
      const newActive = MILESTONES.map((_, i) => {
        const threshold = (i + 0.3) / MILESTONES.length;
        return progress >= threshold;
      });

      setActiveMilestones((prev) => {
        const changed = prev.some((v, i) => v !== newActive[i]);
        return changed ? newActive : prev;
      });

      // Animate dots
      newActive.forEach((active, i) => {
        const dot = dotRefs.current[i];
        const glow = dotGlowRefs.current[i];
        if (dot) {
          dot.setAttribute('fill', active ? '#4F8CFF' : 'rgba(79,140,255,0.2)');
          dot.setAttribute('r', active ? '6' : '4');
        }
        if (glow) {
          glow.setAttribute('opacity', active ? '0.5' : '0');
        }
      });
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // initial
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathData]);

  /* ── Title animation on entry ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasEnteredView.current) {
          hasEnteredView.current = true;

          animate(section.querySelectorAll('.journey-label'), { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, ease: 'easeOut' });

          animate(section.querySelectorAll('.journey-title-word'), { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, ease: 'easeOut', delay: (i: number) => 0.15 + i * 0.12 });

          animate(section.querySelectorAll('.journey-sub'), { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, ease: 'easeOut', delay: 0.5 });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const titleWords = ['Engineering', 'Journey'];

  /* ── Compute card heights for positioning ── */
  const timelineHeight = isMobile
    ? MILESTONES.length * 220 + 120
    : MILESTONES.length * 200 + 120;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[160px]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 flex flex-col items-center">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          {/* ── label ── */}
          <p className="section-eyebrow journey-label text-xs font-mono uppercase tracking-[0.2em] text-[#4F8CFF] opacity-0">
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
            Growth &amp; Evolution
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
          </p>

          {/* ── title ── */}
          <h2 className="section-heading flex flex-wrap justify-center gap-x-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white" data-cursor-text="Journey" data-cursor-color="white">
            {titleWords.map((word, i) => (
              <span key={i} className="journey-title-word inline-block opacity-0">
                {word}
              </span>
            ))}
          </h2>

          {/* ── subtitle ── */}
          <p className="section-description journey-sub text-base text-[#A0A0A0] font-light leading-relaxed opacity-0 text-center">
            A path of continuous learning — from first lines of code to building intelligent systems.
          </p>

          {/* ── timeline ── */}
          <div
            ref={timelineWrapperRef}
            className="relative w-full text-left"
            style={{ minHeight: `${timelineHeight}px` }}
          >
          {/* SVG path layer */}
          <svg
            ref={svgRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox={pathData?.viewBox ?? '0 0 100 100'}
          >
            <defs>
              <linearGradient id="path-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Glow path (behind) - OPTIMIZED: Vector-based glow, no expensive filter */}
            {pathData && (
              <path
                ref={glowPathRef}
                d={pathData.d}
                fill="none"
                stroke="rgba(79,140,255,0.06)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}

            {/* Main path */}
            {pathData && (
              <path
                ref={pathRef}
                d={pathData.d}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}

            {/* Milestone dots */}
            {pathData?.positions.map((pos, i) => (
              <g key={i}>
                {/* glow ring */}
                <circle
                  ref={(el) => { dotGlowRefs.current[i] = el; }}
                  cx={pos.x}
                  cy={pos.y}
                  r="16"
                  fill="none"
                  stroke="#4F8CFF"
                  strokeWidth="1"
                  opacity="0"
                  className="transition-opacity duration-500"
                />
                {/* dot */}
                <circle
                  ref={(el) => { dotRefs.current[i] = el; }}
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill="rgba(79,140,255,0.2)"
                  className="transition-all duration-500"
                />
              </g>
            ))}
          </svg>

          {/* Milestone cards */}
          <div className="relative z-10">
            {MILESTONES.map((milestone, i) => {
              const topOffset = isMobile
                ? 40 + i * 220
                : 40 + i * 200;
              const yPos = pathData?.positions[i]?.y;
              const cardTop = yPos !== undefined ? yPos - 40 : topOffset;

              return (
                <div
                  key={milestone.id}
                  className="absolute w-full px-0 md:px-0"
                  style={{
                    top: `${cardTop}px`,
                    paddingLeft: isMobile ? '48px' : undefined,
                  }}
                >
                  <MilestoneCard
                    milestone={milestone}
                    index={i}
                    isActive={activeMilestones[i]}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>

      {/* bottom accent */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-accent/[0.02] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
