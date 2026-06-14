'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import type { TechCategory, Skill, SkillCategory } from '@/types';

// ============================================
// DATA
// ============================================

const TECH_CATEGORIES: TechCategory[] = [
  {
    name: 'Frontend',
    key: 'frontend',
    description: 'Crafting pixel-perfect interfaces',
    color: '#61DAFB',
    technologies: [
      { name: 'React', category: 'frontend', level: 92 },
      { name: 'Next.js', category: 'frontend', level: 90 },
      { name: 'TypeScript', category: 'frontend', level: 88 },
      { name: 'Tailwind CSS', category: 'frontend', level: 95 },
      { name: 'HTML/CSS', category: 'frontend', level: 96 },
    ],
  },
  {
    name: 'Backend',
    key: 'backend',
    description: 'Building scalable architectures',
    color: '#68A063',
    technologies: [
      { name: 'Node.js', category: 'backend', level: 88 },
      { name: 'Python', category: 'backend', level: 85 },
      { name: 'Express', category: 'backend', level: 86 },
      { name: 'FastAPI', category: 'backend', level: 80 },
      { name: 'REST APIs', category: 'backend', level: 92 },
    ],
  },
  {
    name: 'Databases',
    key: 'databases',
    description: 'Designing data solutions',
    color: '#336791',
    technologies: [
      { name: 'PostgreSQL', category: 'databases', level: 85 },
      { name: 'MongoDB', category: 'databases', level: 82 },
      { name: 'Redis', category: 'databases', level: 75 },
      { name: 'Supabase', category: 'databases', level: 80 },
    ],
  },
  {
    name: 'AI',
    key: 'ai',
    description: 'Intelligent systems & models',
    color: '#FF6B6B',
    technologies: [
      { name: 'LangChain', category: 'ai', level: 82 },
      { name: 'OpenAI', category: 'ai', level: 88 },
      { name: 'Hugging Face', category: 'ai', level: 75 },
      { name: 'RAG', category: 'ai', level: 80 },
      { name: 'Vector DBs', category: 'ai', level: 78 },
    ],
  },
  {
    name: 'Automation',
    key: 'automation',
    description: 'Streamlining complex workflows',
    color: '#FFB347',
    technologies: [
      { name: 'n8n', category: 'automation', level: 85 },
      { name: 'Custom Agents', category: 'automation', level: 82 },
      { name: 'Workflow Engines', category: 'automation', level: 80 },
      { name: 'Cron Systems', category: 'automation', level: 78 },
    ],
  },
  {
    name: 'DevOps',
    key: 'devops',
    description: 'Shipping with confidence',
    color: '#4F8CFF',
    technologies: [
      { name: 'Docker', category: 'devops', level: 82 },
      { name: 'Git', category: 'devops', level: 92 },
      { name: 'GitHub Actions', category: 'devops', level: 80 },
      { name: 'Vercel', category: 'devops', level: 90 },
      { name: 'AWS', category: 'devops', level: 72 },
    ],
  },
];

// ============================================
// CATEGORY ICON
// ============================================

function CategoryIcon({ category, color }: { category: SkillCategory; color: string }) {
  const iconStyle = { stroke: color, strokeWidth: 1.5, fill: 'none' };

  switch (category) {
    case 'frontend':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'backend':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <rect x="2" y="3" width="20" height="6" rx="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" />
          <circle cx="6" cy="6" r="1" fill={color} />
          <circle cx="6" cy="18" r="1" fill={color} />
        </svg>
      );
    case 'databases':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'ai':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M12 2a4 4 0 014 4c0 1.1-.9 2-2 2h-4a2 2 0 01-2-2 4 4 0 014-4z" />
          <path d="M8 8v2a4 4 0 008 0V8" />
          <path d="M12 14v4M8 22h8M10 18h4" />
          <circle cx="10" cy="5" r="0.5" fill={color} />
          <circle cx="14" cy="5" r="0.5" fill={color} />
        </svg>
      );
    case 'automation':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'devops':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" {...iconStyle}>
          <path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14H4z" />
        </svg>
      );
    default:
      return null;
  }
}

// ============================================
// TECH CARD COMPONENT
// ============================================

function TechCard({
  category,
  index,
  isExpanded,
  onToggle,
}: {
  category: TechCategory;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    const validBars = progressRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validBars.length === 0) return;

    // Reset bars before animating
    validBars.forEach((bar) => {
      bar.style.width = '0%';
    });

    const anim = animate(validBars, {
      width: (_el: Element, i: number) => `${category.technologies[i]?.level ?? 0}%`,
      duration: 800,
      delay: stagger(100, { start: 200 }),
      ease: 'outExpo',
    });

    return () => {
      anim.pause();
    };
  }, [isExpanded, category.technologies]);

  return (
    <div
      className="tech-card group relative cursor-pointer"
      style={{ '--card-color': category.color } as React.CSSProperties}
      onClick={onToggle}
    >
      {/* Card body */}
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          hover:bg-white/[0.05] hover:scale-[1.02]
        `}
        style={{
          borderColor: isExpanded ? `${category.color}30` : undefined,
          boxShadow: isExpanded
            ? `0 0 40px ${category.color}15, 0 0 80px ${category.color}08, 0 0 0 1px ${category.color}20`
            : undefined,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
          }}
        />

        {/* Header */}
        <div className="p-[32px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <CategoryIcon category={category.key} color={category.color} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg leading-tight">
                {category.name}
              </h3>
              <p className="text-[#A0A0A0] text-sm mt-0.5">{category.description}</p>
            </div>
          </div>

          {/* Expand indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A0A0A0] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {category.technologies.length}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`text-[#A0A0A0] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Expandable content */}
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            maxHeight: isExpanded ? `${category.technologies.length * 80 + 40}px` : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="px-[32px] pb-[32px] space-y-6">
            {category.technologies.map((tech: Skill, i: number) => (
              <div key={tech.name} className="group/tech">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-white/80 font-medium">{tech.name}</span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: category.color }}
                  >
                    {tech.level}%
                  </span>
                </div>
                <div className="h-[2px] rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    ref={(el) => { progressRefs.current[i] = el; }}
                    className="h-full rounded-full transition-colors"
                    style={{
                      backgroundColor: category.color,
                      width: '0%',
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN SECTION
// ============================================

export default function TechArsenal() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate title
          if (titleRef.current) {
            animate(titleRef.current, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              ease: 'outExpo',
            });
          }

          // Animate cards with stagger
          const cards = gridRef.current?.querySelectorAll('.tech-card');
          if (cards && cards.length > 0) {
            animate(cards, {
              opacity: [0, 1],
              translateY: [60, 0],
              scale: [0.95, 1],
              duration: 800,
              delay: stagger(100, { start: 300 }),
              ease: 'outExpo',
            });
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative w-full overflow-hidden"
    >
      {/* Subtle background radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #4F8CFF 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Title */}
        <div ref={titleRef} className="opacity-0 w-full max-w-5xl flex flex-col items-center text-center">
          <p className="text-[#4F8CFF] text-sm font-mono tracking-widest uppercase mb-4">
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
            {'// Skills & Technologies'}
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
          </p>
          <h2 className="section-title gradient-text mb-[20px]">Tech Arsenal</h2>
          <p className="section-subtitle mb-[56px] max-w-2xl mx-auto text-center leading-[1.7]">
            The tools and technologies I wield to build exceptional digital experiences.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[24px] lg:gap-[32px]"
        >
          {TECH_CATEGORIES.map((cat, i) => (
            <TechCard
              key={cat.key}
              category={cat}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
