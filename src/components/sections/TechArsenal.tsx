'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SkillCategory } from '@/types';

interface TechItem {
  name: string;
  since?: string;
  projects?: number;
}

interface CategoryData {
  name: string;
  key: SkillCategory;
  description: string;
  color: string;
  techs: TechItem[];
}

const CATEGORIES: CategoryData[] = [
  {
    name: 'Frontend',
    key: 'frontend',
    description: 'Crafting pixel-perfect interfaces',
    color: '#61DAFB',
    techs: [
      { name: 'React', since: '2022', projects: 12 },
      { name: 'Next.js', since: '2023', projects: 8 },
      { name: 'TypeScript', since: '2022', projects: 15 },
      { name: 'Tailwind CSS', since: '2023', projects: 10 },
      { name: 'Framer Motion', since: '2023', projects: 6 },
      { name: 'Vite', since: '2024', projects: 5 },
    ],
  },
  {
    name: 'Backend',
    key: 'backend',
    description: 'Building scalable architectures',
    color: '#68A063',
    techs: [
      { name: 'Node.js', since: '2022', projects: 10 },
      { name: 'Python', since: '2023', projects: 8 },
      { name: 'Express', since: '2022', projects: 7 },
      { name: 'FastAPI', since: '2024', projects: 4 },
      { name: 'REST APIs', since: '2022', projects: 15 },
      { name: 'Firebase', since: '2023', projects: 5 },
    ],
  },
  {
    name: 'AI & ML',
    key: 'ai',
    description: 'Intelligent systems & models',
    color: '#FF6B6B',
    techs: [
      { name: 'LangChain', since: '2024', projects: 5 },
      { name: 'OpenAI', since: '2023', projects: 7 },
      { name: 'Groq', since: '2024', projects: 3 },
      { name: 'Hugging Face', since: '2024', projects: 4 },
      { name: 'RAG', since: '2024', projects: 5 },
      { name: 'Vector DBs', since: '2024', projects: 4 },
    ],
  },
  {
    name: 'Databases',
    key: 'databases',
    description: 'Designing data solutions',
    color: '#336791',
    techs: [
      { name: 'PostgreSQL', since: '2022', projects: 8 },
      { name: 'MongoDB', since: '2023', projects: 6 },
      { name: 'Redis', since: '2023', projects: 4 },
      { name: 'Supabase', since: '2024', projects: 3 },
      { name: 'Firestore', since: '2023', projects: 5 },
    ],
  },
  {
    name: 'Automation',
    key: 'automation',
    description: 'Streamlining complex workflows',
    color: '#FFB347',
    techs: [
      { name: 'n8n', since: '2024', projects: 4 },
      { name: 'Custom Agents', since: '2024', projects: 5 },
      { name: 'CI/CD Pipelines', since: '2023', projects: 8 },
      { name: 'Workflow Engines', since: '2024', projects: 3 },
      { name: 'GitHub Actions', since: '2023', projects: 7 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    key: 'devops',
    description: 'Shipping with confidence',
    color: '#4F8CFF',
    techs: [
      { name: 'Docker', since: '2023', projects: 6 },
      { name: 'AWS', since: '2023', projects: 5 },
      { name: 'Vercel', since: '2023', projects: 10 },
      { name: 'Git', since: '2021', projects: 20 },
      { name: 'Firebase', since: '2023', projects: 5 },
    ],
  },
];

function CategoryIcon({ category, color }: { category: SkillCategory; color: string }) {
  const s = { stroke: color, strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (category) {
    case 'frontend':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'backend':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
          <rect x="2" y="3" width="20" height="6" rx="2" />
          <rect x="2" y="15" width="20" height="6" rx="2" />
          <circle cx="6" cy="6" r="1" fill={color} />
          <circle cx="6" cy="18" r="1" fill={color} />
        </svg>
      );
    case 'databases':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'ai':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
          <path d="M12 2a4 4 0 014 4c0 1.1-.9 2-2 2h-4a2 2 0 01-2-2 4 4 0 014-4z" />
          <path d="M8 8v2a4 4 0 008 0V8" />
          <path d="M12 14v4M8 22h8M10 18h4" />
          <circle cx="10" cy="5" r="0.5" fill={color} />
          <circle cx="14" cy="5" r="0.5" fill={color} />
        </svg>
      );
    case 'automation':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'devops':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
          <path d="M4 14a1 1 0 01-.78-1.63l9.9-10.2a.5.5 0 01.86.46l-1.92 6.02A1 1 0 0013 10h7a1 1 0 01.78 1.63l-9.9 10.2a.5.5 0 01-.86-.46l1.92-6.02A1 1 0 0011 14H4z" />
        </svg>
      );
  }
}

function TechBadge({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono rounded-lg border transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        backgroundColor: 'rgba(255,255,255,0.02)',
        color: '#a0a0a0',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {name}
    </span>
  );
}

function BentoCard({
  category,
  index,
  isVisible,
}: {
  category: CategoryData;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border h-full"
        style={{
          backgroundColor: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderColor: 'rgba(255,255,255,0.05)',
        }}
        whileHover={{
          y: -4,
          borderColor: `${category.color}30`,
          boxShadow: `0 12px 48px ${category.color}12, 0 0 80px ${category.color}05`,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
          }}
        />

        {/* Spotlight on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(500px circle at 50% 0%, ${category.color}08, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full min-h-[176px] flex-col gap-4 p-5 md:min-h-[180px] md:p-6">
          {/* Header */}
          <div className="flex items-start gap-3">
            <motion.div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${category.color}10` }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <CategoryIcon category={category.key} color={category.color} />
            </motion.div>
            <div>
              <h3 className="text-base font-semibold text-white leading-tight">
                {category.name}
              </h3>
              <p className="mt-2 text-[11px] font-mono text-[#606060]">
                {category.description}
              </p>
            </div>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {category.techs.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} color={category.color} />
            ))}
          </div>

          {/* Footer stats */}
          <div className="mt-auto flex items-center gap-4 border-t border-white/[0.04] pt-4 text-[10px] font-mono text-[#606060]">
            <span>
              <span style={{ color: category.color }}>{category.techs.length}</span> technologies
            </span>
            <span className="w-px h-4 bg-white/[0.06]" />
            <span>
              <span style={{ color: category.color }}>
                {category.techs.reduce((a, t) => a + (t.projects || 0), 0)}
              </span>{' '}
              projects
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechArsenal() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative -mt-4 w-full overflow-hidden md:-mt-8 lg:-mt-12"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #4F8CFF 0%, transparent 70%)' }}
        />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.div
          className="section-header max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="section-eyebrow text-[11px] font-mono text-[#4F8CFF] tracking-[0.2em] uppercase">
            <span className="mr-2 inline-block h-px w-5 bg-accent align-middle" />
            {'// Tools & Technologies'}
            <span className="ml-2 inline-block h-px w-5 bg-accent align-middle" />
          </p>
          <h2
            data-cursor-text="Arsenal"
            data-cursor-color="white"
            className="section-heading text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-white leading-[1.05]"
          >
            Tech Arsenal
          </h2>
          <p className="section-description text-sm leading-relaxed text-[#808080]">
            The stack I reach for most often when building fast, polished products and reliable AI systems.
          </p>
        </motion.div>

        {/* Bento Grid — 2 columns on desktop */}
        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6">
          {CATEGORIES.map((cat, i) => (
            <BentoCard key={cat.key} category={cat} index={i} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
