'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import Button from '@/components/ui/Button';

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
    const buttons = container.querySelectorAll('.hero-btn');

    // Stagger name characters
    animate(nameChars, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      ease: 'easeOutExpo',
      delay: stagger(40, { start: 200 }),
    });

    // Stagger subtitle lines
    animate(subtitleLines, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      ease: 'easeOutExpo',
      delay: stagger(150, { start: 800 }),
    });

    // Animate buttons
    animate(buttons, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.95, 1],
      duration: 600,
      ease: 'easeOutExpo',
      delay: stagger(120, { start: 1300 }),
    });
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center z-10"
    >
      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-[56px]">
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
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4 mb-[72px]">
          {SUBTITLES.map((line, i) => (
            <p
              key={i}
              className="subtitle-line text-lg md:text-2xl lg:text-3xl text-[#a0a0a0] font-light tracking-tight leading-[1.6] opacity-0"
            >
              {line}
            </p>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] sm:gap-[24px]">
          <div className="hero-btn opacity-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleScrollTo('projects')}
            >
              <span>Explore Projects</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="hero-btn opacity-0">
            <Button
              variant="secondary"
              size="lg"
              href="/resume"
              target="_blank"
            >
              View Resume
            </Button>
          </div>
          <div className="hero-btn opacity-0">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => handleScrollTo('contact')}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
