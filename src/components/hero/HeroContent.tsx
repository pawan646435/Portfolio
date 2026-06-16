'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

const SUBTITLES = [
  'Building advanced AI systems, premium full-stack products,',
  'and high-performance agentic automations.',
];

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    if (!container) return;

    const nameChars = container.querySelectorAll('.name-char');
    const subtitleLines = container.querySelectorAll('.subtitle-line');

    // Stagger name characters
    animate(nameChars, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, ease: 'easeOut', delay: (i: number) => 0.05 + i * 0.02 });

    // Stagger subtitle lines
    animate(subtitleLines, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, ease: 'easeOut', delay: (i: number) => 0.35 + i * 0.08 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center z-10"
    >
      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* Name */}
        <h1 className="mb-12 text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
          {'PAWAN KUMAR'.split('').map((char, i) => (
            <span
              key={i}
              className="name-char inline-block opacity-0"
              style={char === ' ' ? { width: '0.3em' } : undefined}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4 mb-0">
          {SUBTITLES.map((line, i) => (
            <p
              key={i}
              className="subtitle-line text-lg md:text-2xl lg:text-3xl text-[#a0a0a0] font-light tracking-tight leading-[1.6] opacity-0"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
