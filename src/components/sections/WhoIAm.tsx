'use client';

import React, { useRef, useEffect } from 'react';
import { animate, useInView } from 'framer-motion';

/* ─── Decorative: floating dot grid ─── */
function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 opacity-[0.04]"
      aria-hidden="true"
    >
      <div className="grid grid-cols-8 gap-3">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-white"
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Decorative: gradient accent line ─── */
function AccentLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent ${className}`}
      aria-hidden="true"
    />
  );
}

/* ─── Role Segment ─── */
interface RoleSegmentProps {
  label: string;
  index: number;
}

function RoleSegment({ label, index }: RoleSegmentProps) {
  return (
    <div className="flex items-center">
      {index > 0 && (
        <span className="role-divider mx-3 block h-4 w-px bg-white/20 opacity-0 md:mx-4" />
      )}
      <span className="role-segment block opacity-0 cursor-default" data-cursor-text={label} data-cursor-color="white">
        {label}
      </span>
    </div>
  );
}

/* ─── Main Section ─── */
export default function WhoIAm() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const isVisible = useInView(sectionRef, {
    amount: 0.15,
    margin: '0px 0px -60px 0px',
    once: true,
  });

  /* ── animations ── */
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const section = sectionRef.current;
    if (!section) return;

    /* 1. Label tag */
    animate(section.querySelectorAll('.section-label'), { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, ease: 'easeOut' });

    /* 2. Name – word by word */
    animate(section.querySelectorAll('.name-word'), { opacity: [0, 1], y: [40, 0] }, { duration: 0.8, ease: 'easeOut', delay: (i) => 0.2 + i * 0.12 });

    /* 3. Accent line below name */
    animate(section.querySelectorAll('.hero-line'), { scaleX: [0, 1], opacity: [0, 1] }, { duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.6 });

    /* 4. Role segments – independent stagger */
    animate(section.querySelectorAll('.role-segment'), { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, ease: 'easeOut', delay: (i) => 0.7 + i * 0.18 });

    /* 5. Role dividers */
    animate(section.querySelectorAll('.role-divider'), { opacity: [0, 0.2], scaleY: [0, 1] }, { duration: 0.5, ease: 'easeOut', delay: (i) => 0.9 + i * 0.18 });

    /* 6. Education card */
    animate(section.querySelectorAll('.edu-card'), { opacity: [0, 1], y: [32, 0] }, { duration: 0.8, ease: 'easeOut', delay: 1.2 });

    /* 7. Meta chips */
    animate(section.querySelectorAll('.meta-chip'), { opacity: [0, 1], scale: [0.85, 1] }, { duration: 0.6, ease: 'easeOut', delay: (i) => 1.5 + i * 0.1 });

    /* 8. Decorative dot grid */
    animate(section.querySelectorAll('.dot-grid-wrapper'), { opacity: [0, 1] }, { duration: 1.2, ease: 'easeOut', delay: 0.8 });
  }, [isVisible]);

  const nameWords = ['Pawan', 'Kumar'];
  const roles = ['AI Engineer', 'Full-Stack Developer', 'Automation Builder'];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* ── ambient glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-accent/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 flex flex-col items-center">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
        {/* ── tiny label ── */}
        <p className="section-eyebrow section-label flex items-center justify-center text-xs font-mono uppercase tracking-[0.2em] text-[#4F8CFF] opacity-0">
          <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
          Who I Am
          <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
        </p>

        {/* ── name heading ── */}
        <h2 className="mb-4 flex flex-wrap justify-center gap-x-4 text-[clamp(2.8rem,8vw,5rem)] font-bold leading-[1.05] tracking-tight text-white" data-cursor-text="Pawan Kumar" data-cursor-color="white">
          {nameWords.map((word, i) => (
            <span
              key={i}
              className="name-word inline-block opacity-0"
            >
              {word}
            </span>
          ))}
        </h2>

        {/* ── gradient line below name ── */}
        <div
          className="hero-line mb-6 h-px w-32 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 md:w-48"
          aria-hidden="true"
        />

        {/* ── role segments ── */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-y-2 text-base font-light text-secondary md:text-lg lg:text-xl">
          {roles.map((role, i) => (
            <RoleSegment key={role} label={role} index={i} />
          ))}
        </div>

        {/* ── content grid ── */}
        <div className="relative flex w-full justify-center">
          {/* education card */}
          <div className="edu-card w-full max-w-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 text-center flex flex-col items-center opacity-0 md:p-8">
            {/* card accent bar */}
            <div className="mb-5 h-px w-10 bg-accent/60 mx-auto" aria-hidden="true" />

            <h3 className="mb-1 text-sm font-mono uppercase tracking-[0.15em] text-accent">
              Education
            </h3>

            <p className="mb-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
              VIT — Vellore Institute of Technology
            </p>

            <p className="mb-5 text-sm leading-relaxed text-secondary max-w-md mx-auto">
              Bachelor&apos;s Degree in Computer Science &amp; Engineering.
              Building at the intersection of AI systems and full-stack
              development.
            </p>

            {/* meta chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Graduating 2026', 'CS & Engineering', 'Vellore, India'].map(
                (chip) => (
                  <span
                    key={chip}
                    className="meta-chip rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-secondary opacity-0"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
          </div>

          {/* dot grid decoration */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden opacity-0 lg:block dot-grid-wrapper pointer-events-none">
            <DotGrid />
          </div>
        </div>

        {/* ── bottom accent line ── */}
        <AccentLine className="mt-8 w-full md:mt-12" />
        </div>
      </div>

      {/* ── bottom ambient glow ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-accent/[0.02] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
