"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

const GOLD = "#C9A84C";

export default function RenaissanceDivider() {
  const reducedMotion = useReducedMotion();

  const draw = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true },
          transition: { duration: 1, delay, ease: "easeOut" as const },
        };

  const fade = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <div className="mx-auto max-w-6xl w-full px-6" aria-hidden="true">
      <svg
        viewBox="0 0 800 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-6"
        fill="none"
      >
        {/* Left rule — draws from center outward */}
        <motion.line
          x1="370" y1="12" x2="0" y2="12"
          stroke={GOLD} strokeWidth="0.5" opacity="0.3"
          {...draw(0)}
        />
        {/* Right rule — draws from center outward */}
        <motion.line
          x1="430" y1="12" x2="800" y2="12"
          stroke={GOLD} strokeWidth="0.5" opacity="0.3"
          {...draw(0)}
        />
        {/* Flanking diamonds */}
        <motion.polygon
          points="370,8 376,12 370,16 364,12"
          fill={GOLD} opacity="0.4"
          {...fade(0.4)}
        />
        <motion.polygon
          points="430,8 436,12 430,16 424,12"
          fill={GOLD} opacity="0.4"
          {...fade(0.4)}
        />
        {/* Center medallion — fades in last */}
        <motion.g {...fade(0.7)}>
          <circle cx="400" cy="12" r="8" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
          <circle cx="400" cy="12" r="3" fill={GOLD} opacity="0.4" />
          <line x1="400" y1="5" x2="400" y2="7" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
          <line x1="400" y1="17" x2="400" y2="19" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
          <line x1="393" y1="12" x2="395" y2="12" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
          <line x1="405" y1="12" x2="407" y2="12" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
        </motion.g>
      </svg>
    </div>
  );
}
