'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING = { damping: 25, stiffness: 250, mass: 0.5 };
const SIZE_SPRING = { type: 'spring' as const, damping: 20, stiffness: 200, mass: 0.5 };

export default function CustomCursor() {
  const [disabled, setDisabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hoverColor, setHoverColor] = useState('blue');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, SPRING);
  const cursorY = useSpring(mouseY, SPRING);

  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const check = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isMobile = window.innerWidth < 1024;
      setDisabled(isTouch || isCoarse || isMobile);
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (disabled) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [disabled, mouseX, mouseY, isVisible]);

  useEffect(() => {
    if (disabled) return;

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor-text]');
      if (el) {
        const text = el.getAttribute('data-cursor-text');
        const color = el.getAttribute('data-cursor-color') || 'blue';
        if (text) {
          setHoverText(text);
          setHoverColor(color);
          setIsHovering(true);
        }
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor-text]');
      const related = (e.relatedTarget as HTMLElement)?.closest('[data-cursor-text]');
      if (target && target !== related) {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
    };
  }, [disabled]);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    if (reducedMotion) return;
    el.style.backdropFilter = isHovering ? 'blur(8px)' : 'blur(0px)';
    (el.style as any).WebkitBackdropFilter = isHovering ? 'blur(8px)' : 'blur(0px)';
  }, [isHovering, reducedMotion]);

  if (disabled) return null;

  const isWhitePageText = hoverColor === 'white';

  const size = isHovering ? 72 : 12;
  const bg = isHovering ? (isWhitePageText ? '#4F8CFF' : '#ffffff') : '#ffffff';
  const txtColor = isHovering ? (isWhitePageText ? '#ffffff' : '#4F8CFF') : '#ffffff';
  const shadow = isHovering
    ? isWhitePageText
      ? '0 0 30px rgba(79,140,255,0.35), 0 0 60px rgba(79,140,255,0.15)'
      : '0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.1)'
    : '0 0 10px rgba(255,255,255,0.3)';
  const baseTransition = reducedMotion ? { duration: 0 } : SIZE_SPRING;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed left-0 top-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{
        left: cursorX,
        top: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: bg,
        boxShadow: shadow,
        opacity: isVisible ? 1 : 0,
      }}
      transition={baseTransition}
    >
      <span
        ref={textRef}
        className="select-none"
        style={{
          color: txtColor,
          fontSize: isHovering ? '11px' : '0px',
          fontFamily: 'var(--font-geist-mono), monospace',
          fontWeight: 700,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? '1' : '0.5',
          transition: reducedMotion
            ? 'none'
            : 'opacity 200ms ease-out, scale 200ms ease-out, font-size 200ms ease-out',
        }}
      >
        {hoverText}
      </span>
    </motion.div>
  );
}
