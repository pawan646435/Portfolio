"use client";

/**
 * Global spotlight store — a module-level mutable singleton so that
 * per-frame consumers (letter illumination, 3D reveals) can read the
 * cursor position without triggering React renders at 60fps.
 */
export type SpotlightState = {
  x: number;
  y: number;
  /** false until the first mousemove, and on coarse pointers */
  active: boolean;
};

export const spotlight: SpotlightState = {
  x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  active: false,
};

/** Distance from the spotlight to a point. */
export function spotlightDistance(x: number, y: number) {
  const dx = spotlight.x - x;
  const dy = spotlight.y - y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Proximity factor 0..1 for an element rect: 1 when the cursor is inside
 * or right next to the rect, falling to 0 beyond `radius` px away.
 */
export function spotlightProximity(rect: DOMRect, radius = 250) {
  if (!spotlight.active) return 0;
  const nx = Math.max(rect.left, Math.min(spotlight.x, rect.right));
  const ny = Math.max(rect.top, Math.min(spotlight.y, rect.bottom));
  const dist = spotlightDistance(nx, ny);
  return Math.max(0, Math.min(1, (radius - dist) / (radius * 0.8)));
}
