export const profile = {
  name: "Pawan Kumar",
  roles: ["Full Stack Developer", "AI Engineer in progress"],
  bio: "I build full-stack products powered by AI — from Bloomberg-grade financial dashboards to RAG-powered support desks. Currently going deep on LangChain, LangGraph & FastAPI.",
  taglines: [
    "Building the web. Teaching it to think.",
    "Full Stack Dev — AI Engineer in progress",
    "I ship products, not excuses.",
  ],
  github: "https://github.com/pawan646435",
  linkedin: "https://www.linkedin.com/in/pawan646435/",
  email: "pawankumar646435@gmail.com",
};

export const rooms = ["Identity", "Story", "Works", "Arsenal", "Dialogue"] as const;

export type Project = {
  id: string;
  name: string;
  tagline: string;
  status: string;
  live: boolean;
  gradient: string;
  bannerGradient: string;
  description: string;
  longDescription: string;
  stack: string[];
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "alphamatrix",
    name: "AlphaMatrix",
    tagline: "Bloomberg-grade AI financial intelligence",
    status: "● Live",
    live: true,
    bannerGradient: "linear-gradient(180deg, #1A1200, transparent)",
    longDescription:
      "A Bloomberg-inspired financial intelligence platform for Indian stocks & mutual funds. Deterministic scoring engines rank equities on fundamentals, momentum and risk; a real-time news aggregation layer feeds Groq Llama 3.3 summarisation; backtesting and async QStash pipelines keep the data fresh without blocking the UI.",
    gradient: "linear-gradient(135deg, #1A1200, #3D2B00)",
    description:
      "Bloomberg-inspired AI financial intelligence platform for Indian stocks & mutual funds. Deterministic scoring engines, real-time news aggregation, backtesting & async data pipelines.",
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Groq Llama 3.3",
      "QStash",
      "Vercel",
    ],
    github: "https://github.com/pawan646435/Alphamatrix",
    demo: "https://alphamatrix-alpha.vercel.app",
  },
  {
    id: "skillpilot",
    name: "SkillPilot",
    tagline: "AI interview panels & code battles",
    status: "● Live",
    live: true,
    bannerGradient: "linear-gradient(180deg, #0D0B00, transparent)",
    longDescription:
      "A full-stack AI engineering platform: React/Vite frontend, FastAPI backend on Cloud Run, Firebase. Its AI Interview Panel layers RAG retrieval, multi-agent interviewer personas, SSE streaming, and a golden-set eval harness — alongside sandboxed multi-language Code Clash battles and recruiter assessments.",
    gradient: "linear-gradient(135deg, #0D0D0D, #2A1F00)",
    description:
      "Full-stack AI engineering platform: RAG-driven interview panels with multi-agent orchestration & real-time streaming, live 1v1 code battles across 4 languages, and recruiter-grade assessments.",
    stack: ["React", "Vite", "FastAPI", "Firebase", "Google Cloud Run", "RAG", "Monaco Editor"],
    github: "https://github.com/pawan646435/SkillPilot",
    demo: "https://skill-pilot-coral.vercel.app",
  },
  {
    id: "flowdesk",
    name: "FlowDesk AI",
    tagline: "Multi-tenant WhatsApp support platform",
    status: "● Live",
    live: true,
    bannerGradient: "linear-gradient(180deg, #120A00, transparent)",
    longDescription:
      "A production-grade, multi-tenant SaaS support platform where companies manage customer tickets via a web dashboard while their own customers interact entirely through WhatsApp — no account required on the customer side. A RAG-grounded AI agent (Gemini + pgvector) answers customer questions from a company's own knowledge base and auto-classifies every ticket's category, priority, and sentiment. An SLA tracking system does atomic breach-detection with a compare-and-swap pattern, multi-tenant data isolation is enforced with role-based access and two org-joining flows, session-staleness handling enables immediate access revocation, and notifications are decoupled through n8n so they never block the core customer-facing flow. A measured optimization pass cut bundle size, fixed N+1 queries, batched embeddings, and roughly doubled dashboard load speed.",
    gradient: "linear-gradient(135deg, #1A1200, #C9A84C22)",
    description:
      "Production-grade multi-tenant SaaS support platform with a RAG-grounded WhatsApp AI agent, automatic ticket classification, an SLA breach-detection engine, and a measured ~2x dashboard load optimization.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL (Neon + pgvector)",
      "Prisma",
      "Auth.js",
      "Google Gemini",
      "WhatsApp Business Cloud API",
      "n8n",
      "Vercel",
    ],
    github: "https://github.com/pawan646435/FlowDesk-AI",
    demo: "https://flow-desk-ai-rose.vercel.app",
  },
];

export type SkillTag = "Core" | "Daily" | "Learning" | "AI";

export type SkillCategory = {
  category: string;
  icon: string;
  skills: { name: string; tag: SkillTag; learning?: boolean }[];
};

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "Code2",
    skills: [
      { name: "React", tag: "Core" },
      { name: "Next.js", tag: "Core" },
      { name: "TypeScript", tag: "Daily" },
      { name: "Tailwind CSS", tag: "Daily" },
      { name: "Framer Motion", tag: "Core" },
      { name: "Vite", tag: "Core" },
    ],
  },
  {
    category: "Backend & DB",
    icon: "Database",
    skills: [
      { name: "Node.js", tag: "Core" },
      { name: "Express", tag: "Core" },
      { name: "FastAPI", tag: "Core" },
      { name: "PostgreSQL", tag: "Daily" },
      { name: "MongoDB", tag: "Core" },
      { name: "Redis", tag: "Core" },
      { name: "Prisma", tag: "Daily" },
      { name: "Neon DB", tag: "Core" },
    ],
  },
  {
    category: "AI & Emerging",
    icon: "Cpu",
    skills: [
      { name: "Groq API", tag: "Core" },
      { name: "Google Gemini", tag: "Core" },
      { name: "OpenAI API", tag: "Core" },
      { name: "RAG Pipelines", tag: "Core" },
      { name: "pgvector", tag: "Core" },
      { name: "LangChain", tag: "Learning", learning: true },
      { name: "LangGraph", tag: "Learning", learning: true },
      { name: "FastAPI (AI)", tag: "AI" },
    ],
  },
];

export const funFacts = [
  "☕ Coffee-fuelled",
  "🤖 AI Obsessed",
  "🚀 Shipped 3 Products",
  "🇮🇳 India",
];
