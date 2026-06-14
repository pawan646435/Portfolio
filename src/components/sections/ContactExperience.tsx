'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';

// ============================================
// TYPES
// ============================================

interface TerminalLine {
  text: string;
  href?: string;
  isCheckmark: boolean;
}

// ============================================
// DATA
// ============================================

const TERMINAL_COMMAND = '> connect --developer';

const TERMINAL_LINES: TerminalLine[] = [
  {
    text: '✓ Email Connected',
    href: 'mailto:pawan646435@gmail.com',
    isCheckmark: true,
  },
  {
    text: '✓ GitHub Connected',
    href: 'https://github.com/pawan646435',
    isCheckmark: true,
  },
  {
    text: '✓ LinkedIn Connected',
    href: 'https://www.linkedin.com/in/pawan646435/',
    isCheckmark: true,
  },
  {
    text: '✓ Ready for Opportunities',
    isCheckmark: true,
  },
];

// ============================================
// MAIN SECTION
// ============================================

export default function ContactExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLSpanElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const [showLines, setShowLines] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Typing animation for command
  const startTypingAnimation = useCallback(() => {
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedCommand(TERMINAL_COMMAND.slice(0, charIndex));

      if (charIndex >= TERMINAL_COMMAND.length) {
        clearInterval(typeInterval);

        // Brief pause then reveal response lines
        setTimeout(() => {
          setShowLines(true);

          // Stagger-animate the response lines
          const lines = linesContainerRef.current?.querySelectorAll('.terminal-line');
          if (lines && lines.length > 0) {
            animate(lines, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 500,
              delay: stagger(200, { start: 100 }),
              ease: 'outCubic',
              onComplete: () => {
                setAnimationComplete(true);
              },
            });
          }
        }, 400);
      }
    }, 60);

    return typeInterval;
  }, []);

  // IntersectionObserver trigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let typeInterval: ReturnType<typeof setInterval> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate title
          if (titleRef.current) {
            animate(titleRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              ease: 'outExpo',
            });
          }

          // Animate terminal container
          if (terminalRef.current) {
            animate(terminalRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.97, 1],
              duration: 900,
              delay: 200,
              ease: 'outExpo',
              onComplete: () => {
                // Start typing after terminal appears
                typeInterval = startTypingAnimation();
              },
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [hasAnimated, startTypingAnimation]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #4ADE80 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center opacity-0">
          <p className="text-[#4F8CFF] text-sm font-mono tracking-widest uppercase mb-4">
            {'// Get In Touch'}
          </p>
          <h2 className="section-title gradient-text mx-auto mb-[24px]">
            Let&apos;s Connect
          </h2>
          <p className="section-subtitle mt-3 mx-auto text-center mb-[64px]">
            Always open to new opportunities and interesting conversations.
          </p>
        </div>

        {/* Terminal window */}
        <div className="max-w-2xl mx-auto">
          <div
            ref={terminalRef}
            className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] overflow-hidden opacity-0"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#28C840] opacity-80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-[#A0A0A0]/60">
                  terminal — contact
                </span>
              </div>
              {/* Spacer to balance the dots */}
              <div className="w-[52px]" />
            </div>

            {/* Terminal body */}
            <div className="p-6 md:p-8 font-mono text-sm leading-relaxed min-h-[240px]">
              {/* Command line */}
              <div className="flex items-center">
                <span className="text-[#4ADE80] select-none">
                  {typedCommand}
                </span>
                {!showLines && showCursor && (
                  <span className="cursor-blink ml-0.5" />
                )}
              </div>

              {/* Response lines */}
              {showLines && (
                <div ref={linesContainerRef} className="mt-4 space-y-2.5">
                  {TERMINAL_LINES.map((line, i) => (
                    <div
                      key={i}
                      className="terminal-line opacity-0"
                    >
                      {line.href ? (
                        <a
                          href={line.href}
                          target={line.href.startsWith('mailto:') ? undefined : '_blank'}
                          rel={line.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          className="group/link inline-flex items-center gap-1"
                        >
                          <span className="text-[#4ADE80]">✓</span>
                          <span className="text-white/80 group-hover/link:text-white group-hover/link:underline underline-offset-4 decoration-white/30 transition-colors duration-200">
                            {line.text.replace('✓ ', '')}
                          </span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className="text-[#A0A0A0] opacity-0 group-hover/link:opacity-100 transition-opacity ml-1"
                          >
                            <path
                              d="M4 2h6v6M10 2L4.5 7.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1">
                          <span className="text-[#4ADE80]">✓</span>
                          <span className="text-white/80">
                            {line.text.replace('✓ ', '')}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Blinking cursor at end */}
                  {animationComplete && (
                    <div className="mt-3 flex items-center">
                      <span className="text-[#A0A0A0]">{'>'}</span>
                      <span className="cursor-blink ml-1.5" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#A0A0A0] text-sm">
              © 2026 Pawan Kumar. Built with Next.js
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:pawan646435@gmail.com"
                className="text-[#A0A0A0] hover:text-white text-sm transition-colors duration-200"
              >
                Email
              </a>
              <a
                href="https://github.com/pawan646435"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-white text-sm transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pawan646435/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-white text-sm transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
