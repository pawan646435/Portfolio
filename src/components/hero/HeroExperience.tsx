'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for code splitting
const NodeNetwork = dynamic(
  () => import('./NodeNetwork'),
  { ssr: false }
);

const HeroContent = dynamic(
  () => import('./HeroContent'),
  { ssr: false }
);

type HeroPhase = 'network' | 'content' | 'done';

export default function HeroExperience() {
  const [phase, setPhase] = useState<HeroPhase>('network');

  const handleNetworkComplete = useCallback(() => {
    setPhase('content');
  }, []);

  const handleFadeComplete = useCallback(() => {
    setPhase('done');
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-dvh overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Node network canvas */}
      {(phase === 'network' || phase === 'content') && (
        <NodeNetwork 
          onComplete={handleNetworkComplete} 
          onFadeComplete={handleFadeComplete}
          phase={phase}
        />
      )}

      {/* Final hero content */}
      {(phase === 'content' || phase === 'done') && <HeroContent />}

      {/* Scroll indicator */}
      {(phase === 'content' || phase === 'done') && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-[#a0a0a0] tracking-widest uppercase">
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-[#a0a0a0]"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="8" cy="8" r="2" fill="currentColor">
              <animate
                attributeName="cy"
                values="8;16;8"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      )}
    </section>
  );
}
