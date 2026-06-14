'use client';

import { useState, useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import GlassCard from '@/components/ui/GlassCard';
import type { Repo } from '@/types';

function getFallbackDescription(repoName: string, index: number): string {
  const fallbacks = [
    'Development and experimentation project',
    'Open-source learning project',
    'Technical exploration repository',
    'Personal project repository'
  ];
  const nameLower = repoName.toLowerCase();
  if (nameLower.includes('api') || nameLower.includes('backend') || nameLower.includes('server')) {
    return 'Backend service and API integration exploration';
  }
  if (nameLower.includes('ui') || nameLower.includes('frontend') || nameLower.includes('portfolio') || nameLower.includes('css')) {
    return 'Interactive frontend design and UI experimentation';
  }
  if (nameLower.includes('ai') || nameLower.includes('ml') || nameLower.includes('agent') || nameLower.includes('bot')) {
    return 'Intelligent systems development and AI model orchestration';
  }
  if (nameLower.includes('resume') || nameLower.includes('cv') || nameLower.includes('bio')) {
    return 'Curated developer experience profile and credentials';
  }
  return fallbacks[index % fallbacks.length];
}

interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  archDiagram: ArchNode[];
}

interface ArchNode {
  label: string;
  x: number;
  y: number;
  connections: number[];
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'skillpilot',
    title: 'SkillPilot',
    tagline: 'AI-Powered Skill Assessment Platform',
    problem:
      'Traditional skill assessments fail to capture real-world problem-solving abilities and provide no actionable learning paths.',
    solution:
      'Built an AI-driven platform that adaptively evaluates skills through real-world scenarios, generating personalized learning roadmaps using LLM-powered analysis.',
    impact:
      'Comprehensive skill mapping with AI-generated insights, adaptive difficulty scaling, and personalized improvement recommendations.',
    techStack: ['Next.js', 'TypeScript', 'Python', 'LangChain', 'OpenAI', 'PostgreSQL'],
    githubUrl: 'https://github.com/pawan646435',
    accentColor: '#4F8CFF',
    archDiagram: [
      { label: 'User', x: 50, y: 50, connections: [1] },
      { label: 'Next.js Frontend', x: 200, y: 50, connections: [2, 3] },
      { label: 'API Layer', x: 350, y: 30, connections: [4] },
      { label: 'Auth', x: 350, y: 80, connections: [4] },
      { label: 'AI Engine', x: 500, y: 50, connections: [5] },
      { label: 'LLM Pipeline', x: 650, y: 50, connections: [] },
    ],
  },
  {
    id: 'flowdesk',
    title: 'FlowDesk AI',
    tagline: 'AI-Powered Workflow & Automation Platform',
    problem:
      'Teams struggle with repetitive workflows, manual ticket routing, and disconnected toolchains that drain engineering time.',
    solution:
      'Designed a multi-agent AI platform that orchestrates workflows, handles intelligent ticket routing, and automates complex multi-step processes through an intuitive builder.',
    impact:
      'Streamlined workflow orchestration with intelligent routing, automated multi-step processes, and AI-driven decision making across team operations.',
    techStack: [
      'React',
      'Node.js',
      'Python',
      'LangChain',
      'Redis',
      'PostgreSQL',
      'Docker',
    ],
    githubUrl: 'https://github.com/pawan646435',
    accentColor: '#8B5CF6',
    archDiagram: [
      { label: 'Trigger', x: 50, y: 50, connections: [1] },
      { label: 'Orchestrator', x: 200, y: 50, connections: [2, 3, 4] },
      { label: 'Agent 1', x: 350, y: 15, connections: [5] },
      { label: 'Agent 2', x: 350, y: 50, connections: [5] },
      { label: 'Router', x: 350, y: 85, connections: [5] },
      { label: 'Output', x: 500, y: 50, connections: [] },
    ],
  },
];

const FLOWDESK_STEPS = [
  {
    title: 'Trigger',
    desc: 'Incoming support ticket or API payload via Webhook',
    status: '✓ Received payload (200 OK)',
    code: '{\n  "source": "api_gateway",\n  "type": "support_ticket",\n  "body": "Unable to connect database"\n}',
  },
  {
    title: 'Classify',
    desc: 'LLM classifies ticket category and intent analysis',
    status: '✓ Intent: database_connection (confidence: 97.4%)',
    code: '{\n  "intent": "db_connection_fail",\n  "sentiment": "frustrated",\n  "confidence": 0.974\n}',
  },
  {
    title: 'Priority',
    desc: 'SLA urgency calculated based on customer tier & sentiment',
    status: '✓ SLA priority: P0 (Critical - 4h response)',
    code: '{\n  "tier": "enterprise",\n  "sla": "P0_CRITICAL",\n  "urgency_score": 9.5\n}',
  },
  {
    title: 'Routing',
    desc: 'Routes task to DB Engineer Agent with specialized tools',
    status: '✓ Assigned agent: DB_Recovery_Agent',
    code: '{\n  "agent_id": "db_recovery",\n  "tools_allocated": ["sql_inspector", "k8s_restart"]\n}',
  },
  {
    title: 'Engine',
    desc: 'Executes automated checks & pool restarts',
    status: '✓ Diagnostic: connection timeout in pool-3',
    code: '{\n  "status": "executing",\n  "subtasks": [\n    {"name": "check_status", "result": "down"},\n    {"name": "restart_pool", "result": "success"}\n  ]\n}',
  },
  {
    title: 'Response',
    desc: 'Generates user email update & team Slack message',
    status: '✓ Sent update via Email & Slack webhook',
    code: '{\n  "email_sent": true,\n  "slack_notified": true,\n  "body": "Database pool restarted. Connection active."\n}',
  },
];

const SKILLPILOT_STEPS = [
  {
    title: 'Student',
    desc: 'Goals, current tech stack, and experience level',
    status: '✓ Loaded student: Pawan Kumar (CSE Senior)',
    code: '{\n  "student": "Pawan Kumar",\n  "focus": "AI_Engineering",\n  "target_roles": ["AI_Research_Scientist"]\n}',
  },
  {
    title: 'Assess',
    desc: 'AI adaptively presents programming scenarios & questions',
    status: '✓ Generated assessment: Adaptive-3',
    code: '{\n  "test_id": "adaptive-3",\n  "topics": ["Transformers", "RAG_Architectures"],\n  "difficulty": "Advanced"\n}',
  },
  {
    title: 'Analysis',
    desc: 'Evaluates code submissions, logic, and complexity',
    status: '✓ Analysis: Strong RAG knowledge; weak in fine-tuning',
    code: '{\n  "scores": {\n    "rag": 92,\n    "llm_ops": 78,\n    "fine_tuning": 45\n  }\n}',
  },
  {
    title: 'Gaps',
    desc: 'Maps delta between student capabilities and target roles',
    status: '✓ Skill Gaps: Quantization, PEFT, LoRA',
    code: '{\n  "missing_skills": ["PEFT", "LoRA", "BitsAndBytes"],\n  "priority": "High"\n}',
  },
  {
    title: 'Roadmap',
    desc: 'Tailors personal curriculum, project path, and tasks',
    status: '✓ Created: 6-week custom training curriculum',
    code: '{\n  "curriculum_weeks": 6,\n  "flagship_project": "Quantized-Agent-Deployer",\n  "milestones": 4\n}',
  },
  {
    title: 'Guidance',
    desc: 'Connects skills to active vacancies & resume suggestions',
    status: '✓ Matched: 3 roles (Google, OpenAI, Anthropic)',
    code: '{\n  "job_matches": ["AI_Solutions_Engineer", "ML_Platform_Dev"],\n  "resume_score": 9.2\n}',
  },
];

function StepIcon({ index, color, projectId }: { index: number; color: string; projectId: string }) {
  const isFlowDesk = projectId === 'flowdesk';

  if (isFlowDesk) {
    switch (index) {
      case 0: // Lightning
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 1: // Sparkles
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          </svg>
        );
      case 2: // Alert
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 3: // Branching
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4h-1" />
            <path d="M6 8H5a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4h1" />
            <line x1="12" y1="2" x2="12" y2="22" />
            <polyline points="9 5 12 2 15 5" />
            <polyline points="9 19 12 22 15 19" />
          </svg>
        );
      case 4: // Cog
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      default: // Message bubble
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
    }
  } else {
    // SkillPilot
    switch (index) {
      case 0: // User
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 1: // Checklist
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case 2: // Brain
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
          </svg>
        );
      case 3: // Crosshair
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="1" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
          </svg>
        );
      case 4: // Map
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" y1="3" x2="9" y2="18" />
            <line x1="15" y1="6" x2="15" y2="21" />
          </svg>
        );
      default: // Briefcase
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
    }
  }
}

function WorkflowVisualization({ projectId, accentColor }: { projectId: string; accentColor: string }) {
  const steps = projectId === 'flowdesk' ? FLOWDESK_STEPS : SKILLPILOT_STEPS;
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-play steps
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  // Anime.js trigger on step change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pulse active node
    const activeNode = container.querySelector(`.step-node-${activeStep}`);
    if (activeNode) {
      animate(activeNode, {
        scale: [1, 1.05, 1],
        duration: 400,
        ease: 'easeOutQuad',
      });
    }

    // Fade/slide logs terminal
    const term = terminalRef.current;
    if (term) {
      animate(term, {
        opacity: [0.4, 1],
        translateY: [6, 0],
        duration: 500,
        ease: 'easeOutExpo',
      });
    }
  }, [activeStep]);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setIsPlaying(false);
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Steps Track */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-white/[0.01] border border-white/[0.04]">
        {/* Connection line background */}
        <div className="absolute left-[28px] top-4 bottom-4 w-px bg-white/[0.06] md:left-8 md:right-8 md:top-1/2 md:bottom-auto md:h-px -z-10" />
        
        {/* Connector fill line */}
        <div 
          className="absolute left-[28px] top-4 w-px bg-gradient-to-b from-transparent to-accent md:left-8 md:top-1/2 md:h-px -z-10 transition-all duration-500 ease-in-out hidden md:block" 
          style={{
            backgroundColor: accentColor,
            width: `${(activeStep / 5) * 88}%`,
          }}
        />

        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          return (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={`
                step-node-${idx}
                flex md:flex-col items-center gap-3 md:gap-2 w-full md:w-auto p-2 rounded-xl transition-all duration-300
                ${isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                  ${isActive 
                    ? 'border-2' 
                    : isCompleted 
                    ? 'bg-accent/10 border' 
                    : 'bg-white/[0.02] border border-white/[0.06]'}
                `}
                style={{
                  borderColor: isActive ? accentColor : isCompleted ? `${accentColor}40` : undefined,
                  boxShadow: isActive ? `0 0 15px ${accentColor}25` : undefined
                }}
              >
                <StepIcon index={idx} color={isActive ? accentColor : isCompleted ? accentColor : '#606060'} projectId={projectId} />
              </div>
              <div className="text-left md:text-center">
                <p 
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#808080]'
                  }`}
                  style={isActive ? { color: accentColor } : undefined}
                >
                  {step.title}
                </p>
                <p className="text-[10px] text-[#606060] hidden md:block max-w-[90px] truncate">
                  {step.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Track info & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Stage details */}
        <div className="lg:col-span-2 space-y-6 p-6 md:p-8 rounded-xl border border-white/[0.04] bg-white/[0.01] flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#606060]">Active Stage</span>
              <h4 className="text-xl font-bold tracking-tight text-white mt-2">
                {steps[activeStep].title}
              </h4>
              <p className="text-sm text-[#a0a0a0] leading-[1.7] mt-3">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.04]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#606060]">Execution Output</span>
              <p className="font-mono text-xs text-emerald-400 mt-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {steps[activeStep].status}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border border-white/[0.08] hover:border-white/20 transition-all text-[#a0a0a0] bg-white/[0.01]"
            >
              {isPlaying ? '⏸ Pause Pipeline' : '▶ Resume Auto-Play'}
            </button>
          </div>
        </div>

        {/* Code Console */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-[#0c0c0c] overflow-hidden flex flex-col h-[280px]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[10px] font-mono text-[#606060]">payload_data.json</span>
            <div className="w-10" />
          </div>
          <div ref={terminalRef} className="p-[20px] font-mono text-xs overflow-y-auto flex-1 text-[#86C2FF]">
            <pre className="whitespace-pre-wrap leading-[1.8] select-none">
              <code>
                {steps[activeStep].code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project }: { project: FeaturedProject }) {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current) return;
    const items = detailRef.current.querySelectorAll('.detail-item');
    animate(items, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      ease: 'easeOutExpo',
      delay: stagger(100),
    });
  }, []);

  return (
    <div ref={detailRef} className="space-y-[36px]">
      {/* Problem / Solution / Impact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Problem', content: project.problem, icon: '⚡' },
          { label: 'Solution', content: project.solution, icon: '🔧' },
          { label: 'Impact', content: project.impact, icon: '📈' },
        ].map((item, i) => (
          <div
            key={i}
            className="detail-item opacity-0 bg-white/[0.02] border border-white/[0.06] rounded-xl p-[28px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{item.icon}</span>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#a0a0a0]">
                {item.label}
              </h4>
            </div>
            <p className="text-sm md:text-base text-[#a0a0a0] leading-[1.7]">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Live Pipeline Visualization */}
      <div className="detail-item opacity-0 bg-white/[0.02] border border-white/[0.06] rounded-xl p-[28px] md:p-[32px]">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-[#a0a0a0] mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Pipeline Execution
        </h4>
        <WorkflowVisualization
          projectId={project.id}
          accentColor={project.accentColor}
        />
      </div>

      {/* Tech Stack */}
      <div className="detail-item opacity-0 flex flex-wrap gap-3">
        {project.techStack.map((tech, i) => (
          <span
            key={i}
            className="px-4 py-2 text-sm font-mono rounded-full border border-white/[0.08] bg-white/[0.03] text-[#a0a0a0]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.githubUrl && (
        <div className="detail-item opacity-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#4F8CFF] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [githubRepos, setGithubRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // Fetch GitHub repos
  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        const reposList = Array.isArray(data) ? data : (data.repos || []);
        setGithubRepos(reposList.slice(0, 6)); // Show top 6
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Entrance animation
  useEffect(() => {
    if (hasAnimated.current || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const cards = sectionRef.current?.querySelectorAll('.project-card');
          if (cards) {
            animate(cards, {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              ease: 'easeOutExpo',
              delay: stagger(150),
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="section-container max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="w-full max-w-5xl flex flex-col items-center text-center">
          <p className="text-sm font-mono text-[#4F8CFF] tracking-widest uppercase mb-4">
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
            Featured Work
            <span className="mx-2 inline-block h-px w-6 bg-accent align-middle" />
          </p>
          <h2 className="section-title mb-[20px]">Project Showcase</h2>
          <p className="section-subtitle mb-[56px] max-w-2xl mx-auto leading-[1.7] text-center">
            Engineering solutions that push the boundaries of AI, automation, and modern web development.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-8 md:gap-12 w-full">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.id} className="project-card opacity-0">
              <div
                className="glass-card p-8 md:p-12 lg:p-16 cursor-pointer transition-all duration-500"
                onClick={() =>
                  setSelectedProject(
                    selectedProject === project.id ? null : project.id
                  )
                }
                style={{
                  borderColor:
                    selectedProject === project.id
                      ? `${project.accentColor}33`
                      : undefined,
                  boxShadow:
                    selectedProject === project.id
                      ? `0 0 60px ${project.accentColor}10`
                      : undefined,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: project.accentColor }}
                        />
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-none">
                          {project.title}
                        </h3>
                      </div>
                      <div className="mt-1.5 sm:mt-0">
                        <span 
                          className="text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded border inline-block"
                          style={{
                            color: project.accentColor,
                            backgroundColor: `${project.accentColor}10`,
                            borderColor: `${project.accentColor}20`
                          }}
                        >
                          Flagship Case Study
                        </span>
                      </div>
                    </div>
                    <p className="text-[#a0a0a0] text-lg md:text-xl font-light mt-2 leading-relaxed max-w-2xl">{project.tagline}</p>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`text-[#a0a0a0] transition-transform duration-300 flex-shrink-0 mt-2 ${
                      selectedProject === project.id ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Expanded Details */}
                {selectedProject === project.id && (
                  <div className="mt-8 pt-8 border-t border-white/[0.06]">
                    <ProjectDetail project={project} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Open Source & Experiments */}
        <div className="mt-[80px] border-t border-white/[0.08] pt-[80px] w-full flex flex-col items-center">
          <div className="mb-[48px] w-full max-w-5xl flex flex-col items-center text-center">
            <p className="text-xs font-mono text-[#4F8CFF] tracking-widest uppercase mb-2">
              <span className="mx-2 inline-block h-px w-4 bg-accent align-middle" />
              Playground
              <span className="mx-2 inline-block h-px w-4 bg-accent align-middle" />
            </p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-[12px]">
              Open Source & Experiments
            </h3>
            <p className="text-sm text-[#A0A0A0] leading-relaxed max-w-xl mx-auto mb-6 text-center">
              Experiments, learning projects, open-source work, and technical explorations.
            </p>
            <a
              href="https://github.com/pawan646435"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-sm text-[#4F8CFF] hover:text-white transition-colors duration-300 flex items-center justify-center gap-1.5"
            >
              Browse All Repositories
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {loading ? (
            <div className="grid w-full grid-cols-1 items-start gap-[24px] md:grid-cols-2 2xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex min-h-[140px] flex-col justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] p-[28px] animate-pulse"
                >
                  <div className="mb-3 h-4 w-3/4 rounded bg-white/[0.05]" />
                  <div className="mb-3 h-3 w-full rounded bg-white/[0.03]" />
                  <div className="h-3 bg-white/[0.03] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 items-start gap-[24px] md:grid-cols-2 2xl:grid-cols-3">
              {githubRepos.map((repo, index) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group block opacity-0"
                >
                  <GlassCard
                    padding="none"
                    className="flex min-h-[140px] flex-col items-start justify-center p-[28px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:scale-[1.01] hover:border-[#4F8CFF]/25 hover:shadow-[0_8px_24px_rgba(79,140,255,0.05)]"
                  >
                    <h4 className="mb-[12px] w-full truncate text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[#4F8CFF]">
                      {repo.name}
                    </h4>
                    <p className="mb-[12px] line-clamp-2 text-left text-sm leading-[1.65] text-[#a0a0a0]">
                      {repo.description || getFallbackDescription(repo.name, index)}
                    </p>
                    <div className="mt-auto flex w-full items-center gap-4 text-xs text-[#777]">
                      {repo.language && (
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor:
                                repo.language === 'TypeScript'
                                  ? '#3178C6'
                                  : repo.language === 'JavaScript'
                                  ? '#F7DF1E'
                                  : repo.language === 'Python'
                                  ? '#3776AB'
                                  : '#4F8CFF',
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          ⭐ {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
