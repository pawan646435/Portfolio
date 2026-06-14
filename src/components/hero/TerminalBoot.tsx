'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

const BOOT_LINES = [
  { text: '> Initializing system...', delay: 0 },
  { text: '> Loading projects...', delay: 600 },
  { text: '> Loading AI workflows...', delay: 1000 },
  { text: '> Loading automation engine...', delay: 1400 },
  { text: '> Loading developer profile...', delay: 1800 },
  { text: '> System ready.', delay: 2400 },
];

export default function TerminalBoot({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const typeLine = useCallback(
    (text: string): Promise<void> => {
      return new Promise((resolve) => {
        let i = 0;
        setCurrentTyping('');
        const interval = setInterval(() => {
          if (i < text.length) {
            setCurrentTyping(text.substring(0, i + 1));
            i++;
          } else {
            clearInterval(interval);
            setVisibleLines((prev) => [...prev, text]);
            setCurrentTyping('');
            resolve();
          }
        }, 25);
      });
    },
    []
  );

  useEffect(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const runSequence = async () => {
      // Wait a beat before starting
      await new Promise((r) => setTimeout(r, 500));

      for (const line of BOOT_LINES) {
        await new Promise((r) => setTimeout(r, 200));
        await typeLine(line.text);
      }

      // Brief pause after complete
      await new Promise((r) => setTimeout(r, 600));

      // Fade out terminal
      if (containerRef.current) {
        animate(containerRef.current, {
          opacity: [1, 0],
          scale: [1, 0.95],
          filter: ['blur(0px)', 'blur(10px)'],
          duration: 800,
          ease: 'easeInExpo',
          onComplete: () => {
            setShowCursor(false);
            onComplete();
          },
        });
      }
    };

    runSequence();
  }, [typeLine, onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center z-10"
    >
      <div className="w-full max-w-xl px-6">
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-xl p-6 md:p-8 font-mono text-sm md:text-base">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-xs text-[#a0a0a0]">terminal</span>
          </div>

          {/* Lines */}
          <div className="space-y-2">
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className="text-[#4ADE80] opacity-80"
              >
                {line}
              </div>
            ))}
            {currentTyping && (
              <div className="text-[#4ADE80]">
                {currentTyping}
                {showCursor && <span className="cursor-blink" />}
              </div>
            )}
            {!currentTyping && visibleLines.length === 0 && showCursor && (
              <div className="text-[#4ADE80]">
                <span className="cursor-blink" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
