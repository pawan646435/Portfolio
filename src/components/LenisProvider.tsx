'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // OPTIMIZATION: Reduced smoothing to prevent jank during hero animations
  // - lerp reduced from 0.08 to 0.1 for slightly faster response
  // - duration reduced from 1.4s to 1.1s for snappier feel
  // - This allows hero canvas to animate without fighting Lenis interpolation
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 0.9,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      }}
    >
      {children}
    </ReactLenis>
  );
}
