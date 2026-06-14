// ============================================
// Animation Presets — Anime.js v4
// ============================================

'use client';

import { animate, stagger, createTimeline } from 'animejs';
import type { AnimationParams, DefaultsParams } from 'animejs';

// ---- Text Reveal Animations ----

export function animateTextReveal(
  selector: string | HTMLElement | HTMLElement[],
  options?: Partial<AnimationParams>
) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    ease: 'easeOutExpo',
    delay: stagger(80),
    ...options,
  });
}

export function animateCharacterReveal(
  selector: string | HTMLElement | HTMLElement[],
  options?: Partial<AnimationParams>
) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    ease: 'easeOutExpo',
    delay: stagger(30, { from: 'first' }),
    ...options,
  });
}

// ---- Stagger Presets ----

export const staggerPresets = {
  cascade: stagger(100, { from: 'first' }),
  center: stagger(80, { from: 'center' }),
  last: stagger(80, { from: 'last' }),
  fast: stagger(50, { from: 'first' }),
  slow: stagger(150, { from: 'first' }),
} as const;

// ---- SVG Path Draw ----

export function animatePathDraw(
  pathElement: SVGPathElement | string,
  options?: Partial<AnimationParams>
) {
  return animate(pathElement, {
    strokeDashoffset: [0, 0],
    duration: 2000,
    ease: 'easeInOutQuad',
    ...options,
  });
}

// ---- Entrance Animations ----

export function animateSlideUp(
  selector: string | HTMLElement | HTMLElement[],
  options?: Partial<AnimationParams>
) {
  return animate(selector, {
    opacity: [0, 1],
    translateY: [60, 0],
    duration: 1000,
    ease: 'easeOutExpo',
    ...options,
  });
}

export function animateSlideIn(
  selector: string | HTMLElement | HTMLElement[],
  direction: 'left' | 'right' = 'left',
  options?: Partial<AnimationParams>
) {
  const translateX = direction === 'left' ? [-60, 0] : [60, 0];
  return animate(selector, {
    opacity: [0, 1],
    translateX,
    duration: 1000,
    ease: 'easeOutExpo',
    ...options,
  });
}

export function animateScale(
  selector: string | HTMLElement | HTMLElement[],
  options?: Partial<AnimationParams>
) {
  return animate(selector, {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
    ease: 'easeOutExpo',
    ...options,
  });
}

// ---- Counter Animation ----

export function animateCounter(
  element: HTMLElement,
  target: number,
  options?: { duration?: number; prefix?: string; suffix?: string }
) {
  const obj = { value: 0 };
  const { duration = 2000, prefix = '', suffix = '' } = options || {};
  
  return animate(obj, {
    value: target,
    duration,
    ease: 'easeOutExpo',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
}

// ---- Timeline Factory ----

export function createScrollTimeline(defaults?: Partial<DefaultsParams>) {
  return createTimeline({
    defaults: {
      duration: 800,
      ease: 'easeOutExpo',
      ...defaults,
    },
    autoplay: false,
  });
}

// ---- Glow Pulse ----

export function animateGlowPulse(
  selector: string | HTMLElement,
  color: string = 'rgba(79, 140, 255, 0.4)'
) {
  return animate(selector, {
    boxShadow: [
      `0 0 20px ${color}`,
      `0 0 60px ${color}`,
      `0 0 20px ${color}`,
    ],
    duration: 3000,
    ease: 'easeInOutSine',
    loop: true,
  });
}
