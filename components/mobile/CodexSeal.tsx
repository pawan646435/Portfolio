"use client";

const GOLD = "#C9A84C";

/**
 * Hand-drawn compass seal — the mobile stand-in for the 3D golden spiral.
 * Pure SVG + CSS rotation, zero WebGL cost.
 */
export default function CodexSeal({
  size = 100,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return {
      x2: 60 + Math.cos(a) * 50,
      y2: 60 + Math.sin(a) * 50,
    };
  });

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`codex-seal ${className}`}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="50" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="60" cy="60" r="35" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.3" />
      {rays.map((r, i) => (
        <line
          key={i}
          x1="60"
          y1="60"
          x2={r.x2}
          y2={r.y2}
          stroke={GOLD}
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      <circle cx="60" cy="60" r="3" fill={GOLD} />
    </svg>
  );
}
