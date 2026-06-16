'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CONTACT_METHODS = [
  {
    title: 'Email',
    subtitle: 'pawan646435@gmail.com',
    href: 'mailto:pawan646435@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    cta: 'Email Me',
  },
  {
    title: 'LinkedIn',
    subtitle: 'Connect professionally',
    href: 'https://www.linkedin.com/in/pawan646435/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    cta: 'Connect',
  },
  {
    title: 'GitHub',
    subtitle: 'pawan646435',
    href: 'https://github.com/pawan646435',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    cta: 'Browse',
  },
  {
    title: 'Resume',
    subtitle: 'Download PDF',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    cta: 'View Resume',
  },
];

function ContactCard({
  method,
  index,
  isVisible,
}: {
  method: (typeof CONTACT_METHODS)[number];
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.a
      href={method.href}
      target={method.href.startsWith('mailto:') ? undefined : '_blank'}
      rel={method.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="group block"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl border h-full p-4"
        style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(255,255,255,0.05)',
        }}
        whileHover={{
          y: -3,
          borderColor: 'rgba(79,140,255,0.25)',
          boxShadow: '0 8px 32px rgba(79,140,255,0.08), 0 0 0 1px rgba(79,140,255,0.06)',
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
      >
        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(300px circle at 50% 0%, rgba(79,140,255,0.06), transparent 60%)',
          }}
        />

        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(79,140,255,0.5), transparent)',
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          {/* Icon */}
          <motion.div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(79,140,255,0.08)', color: '#4F8CFF' }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {method.icon}
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-tight">
              {method.title}
            </p>
            <p className="text-[11px] font-mono text-[#808080] mt-0.5 truncate">
              {method.subtitle}
            </p>
          </div>

          {/* CTA */}
          <span
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold rounded-lg transition-all duration-200 shrink-0"
            style={{
              backgroundColor: 'rgba(79,140,255,0.1)',
              color: '#4F8CFF',
            }}
          >
            {method.cta}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </span>
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function ContactExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 right-1/4 h-[500px] w-[500px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #4F8CFF 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="section-eyebrow text-[11px] font-mono text-[#4F8CFF] tracking-[0.2em] uppercase">
            <span className="mr-2 inline-block h-px w-5 bg-accent align-middle" />
            {'// Get In Touch'}
            <span className="ml-2 inline-block h-px w-5 bg-accent align-middle" />
          </p>
          <h2
            className="section-heading text-[clamp(1.8rem,4.5vw,3rem)] font-bold tracking-tight text-white leading-[1.05]"
            data-cursor-text="Build Together"
            data-cursor-color="white"
          >
            Let&apos;s Build Together
          </h2>
          <p className="section-description text-xs text-[#808080]">
            Open to full-stack engineering, AI development, automation projects, and exciting opportunities.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-5">
          {/* Left — Intro */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div
              className="rounded-xl border p-5 md:p-6 h-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <p className="text-sm text-[#a0a0a0] leading-relaxed mb-5">
                I&apos;m currently exploring new opportunities where I can contribute to meaningful products — whether it&apos;s architecting AI systems, building full-stack platforms, or automating complex workflows.
              </p>

              {/* Availability */}
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">Available for opportunities</p>
                  <p className="text-[10px] font-mono text-[#606060]">Freelance &bull; Contract &bull; Full-time</p>
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-[11px] font-mono text-[#606060]">
                  Response time: <span className="text-[#a0a0a0]">usually within 24h</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:col-span-3">
            {CONTACT_METHODS.map((method, i) => (
              <ContactCard key={method.title} method={method} index={i} isVisible={isInView} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-6 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-[11px] text-[#606060] font-mono">
            &copy; 2026 Pawan Kumar &mdash; Built with Next.js
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:pawan646435@gmail.com" className="text-[11px] text-[#606060] hover:text-white transition-colors font-mono">
              Email
            </a>
            <span className="text-[#383838]">/</span>
            <a href="https://github.com/pawan646435" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#606060] hover:text-white transition-colors font-mono">
              GitHub
            </a>
            <span className="text-[#383838]">/</span>
            <a href="https://www.linkedin.com/in/pawan646435/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#606060] hover:text-white transition-colors font-mono">
              LinkedIn
            </a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
