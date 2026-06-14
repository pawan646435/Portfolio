'use client';

import React, { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { useAnimeOnScroll } from '@/hooks/useAnimeOnScroll';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  splitBy?: 'word' | 'character';
  delay?: number;
  staggerDelay?: number;
  animateOnScroll?: boolean;
}

export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  splitBy = 'word',
  delay = 0,
  staggerDelay = 80,
  animateOnScroll = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, isVisible } = useAnimeOnScroll<HTMLDivElement>({
    threshold: 0.3,
  });
  const hasAnimated = useRef(false);

  // Merge refs
  const setRefs = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (animateOnScroll) {
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }
  };

  useEffect(() => {
    if (hasAnimated.current) return;
    if (animateOnScroll && !isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.animate-unit');
    if (elements.length === 0) return;

    hasAnimated.current = true;

    animate(elements, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 700,
      ease: 'easeOutExpo',
      delay: stagger(staggerDelay, { start: delay }),
    });
  }, [isVisible, animateOnScroll, delay, staggerDelay]);

  const units =
    splitBy === 'word'
      ? text.split(' ').map((word, i) => (
          <span
            key={i}
            className="animate-unit inline-block opacity-0"
            style={{ marginRight: '0.3em' }}
          >
            {word}
          </span>
        ))
      : text.split('').map((char, i) => (
          <span
            key={i}
            className="animate-unit inline-block opacity-0"
            style={char === ' ' ? { width: '0.3em' } : undefined}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ));

  return (
    <div ref={setRefs}>
      <Tag className={className}>{units}</Tag>
    </div>
  );
}
