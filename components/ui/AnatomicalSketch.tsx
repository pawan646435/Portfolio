"use client";

const GOLD = "#C9A84C";

/**
 * A Da Vinci-inspired technical drawing — Vitruvian circles, measurement
 * rules, golden-ratio annotations. Hidden in darkness (opacity 0.06) until
 * the spotlight reveals it via the data-reveal system on its wrapper.
 */
export default function AnatomicalSketch() {
  const s = { stroke: GOLD, strokeWidth: 0.6, fill: "none" as const };
  const note = {
    fill: GOLD,
    fontSize: 7,
    fontStyle: "italic" as const,
    fontFamily: "var(--font-jetbrains-mono), monospace",
  };

  // Cross-hatch marks at 12 key intersections around the main circle
  const hatches = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const x = 200 + Math.cos(a) * 100;
    const y = 210 + Math.sin(a) * 100;
    return { x, y, a };
  });

  // 8 radiating measurement lines
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
    return {
      x1: 200 + Math.cos(a) * 100,
      y1: 210 + Math.sin(a) * 100,
      x2: 200 + Math.cos(a) * 148,
      y2: 210 + Math.sin(a) * 148,
    };
  });

  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full max-w-100 h-auto"
      aria-hidden="true"
    >
      {/* Main Vitruvian circle + crossing diameters */}
      <circle cx="200" cy="210" r="100" {...s} />
      <line x1="100" y1="210" x2="300" y2="210" {...s} />
      <line x1="200" y1="110" x2="200" y2="310" {...s} />

      {/* Outer concentric circle + inscribed square */}
      <circle cx="200" cy="210" r="140" {...s} strokeDasharray="2 3" />
      <rect x="60" y="70" width="280" height="280" {...s} opacity="0.7" />

      {/* Radiating measurement lines with arrow ticks */}
      {rays.map((r, i) => (
        <g key={i}>
          <line {...r} {...s} opacity="0.8" />
          <line
            x1={r.x2 - 3}
            y1={r.y2 - 3}
            x2={r.x2 + 3}
            y2={r.y2 + 3}
            {...s}
            opacity="0.6"
          />
        </g>
      ))}

      {/* Cross-hatch marks */}
      {hatches.map((h, i) => (
        <g key={i} transform={`translate(${h.x} ${h.y}) rotate(${(h.a * 180) / Math.PI})`}>
          <line x1="-3" y1="0" x2="3" y2="0" {...s} opacity="0.7" />
          <line x1="0" y1="-3" x2="0" y2="3" {...s} opacity="0.7" />
        </g>
      ))}

      {/* Technical arc segments */}
      <path d="M 130 140 A 100 100 0 0 1 270 140" {...s} opacity="0.5" />
      <path d="M 115 280 A 120 120 0 0 0 285 280" {...s} opacity="0.4" />
      <path d="M 160 170 A 55 55 0 0 1 240 170" {...s} opacity="0.5" strokeDasharray="1 2" />

      {/* Golden spiral fragment */}
      <path
        d="M 200 210 q 20 0 20 -20 q 0 -32 -32 -32 q -52 0 -52 52 q 0 84 84 84"
        {...s}
        opacity="0.55"
      />

      {/* Measurement rules below */}
      <line x1="80" y1="390" x2="320" y2="390" {...s} />
      <line x1="80" y1="402" x2="320" y2="402" {...s} opacity="0.7" />
      <line x1="80" y1="414" x2="320" y2="414" {...s} opacity="0.5" />
      {[80, 128, 176, 224, 272, 320].map((x) => (
        <line key={x} x1={x} y1="386" x2={x} y2="394" {...s} opacity="0.6" />
      ))}

      {/* Fake handwriting squiggles */}
      <path d="M 84 432 q 6 -4 12 0 t 12 0 t 12 0 t 12 0 t 12 0" {...s} opacity="0.35" />
      <path d="M 84 442 q 6 -4 12 0 t 12 0 t 12 0 t 12 0" {...s} opacity="0.3" />
      <path d="M 230 432 q 6 -4 12 0 t 12 0 t 12 0 t 12 0" {...s} opacity="0.3" />

      {/* Annotations */}
      <text x="308" y="164" {...note}>φ = 1.618</text>
      <text x="66" y="60" {...note}>aurea sectio</text>
      <text x="140" y="470" {...note} fontSize={8}>
        natura artis magistra
      </text>

      {/* Roman numerals */}
      <text x="94" y="102" {...note}>I</text>
      <text x="296" y="102" {...note}>II</text>
      <text x="94" y="336" {...note}>III</text>
      <text x="292" y="336" {...note}>IV</text>
    </svg>
  );
}
