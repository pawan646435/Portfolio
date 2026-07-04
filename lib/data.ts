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
    tagline: "AI-powered interview prep & code battles",
    status: "● Live",
    live: true,
    bannerGradient: "linear-gradient(180deg, #0D0B00, transparent)",
    longDescription:
      "An AI-powered interview preparation and competitive coding platform. Real-time 1v1 code battles run over Firebase with live synchronisation; AI voice interviews are conducted via Groq; a Monaco Editor powers the coding surface and a full recruiter dashboard closes the loop between candidates and hiring teams.",
    gradient: "linear-gradient(135deg, #0D0D0D, #2A1F00)",
    description:
      "AI-powered interview prep & competitive coding platform. Real-time 1v1 code battles, AI voice interviews via Groq, Monaco Editor & a full recruiter dashboard.",
    stack: ["React", "Vite", "Firebase", "Groq", "Monaco Editor", "Framer Motion"],
    github: "https://github.com/pawan646435/SkillPilot",
    demo: "https://skill-pilot-coral.vercel.app",
  },
  {
    id: "flowdesk",
    name: "FlowDesk AI",
    tagline: "Enterprise RAG support desk",
    status: "● Live",
    live: true,
    bannerGradient: "linear-gradient(180deg, #120A00, transparent)",
    longDescription:
      "An enterprise omnichannel RAG support desk. WhatsApp conversations flow through the Meta Cloud API into Gemini-powered ticket triage; a pgvector RAG pipeline grounds every answer in the customer's own knowledge base; an SLA breach engine and n8n automations keep response times honest.",
    gradient: "linear-gradient(135deg, #1A1200, #C9A84C22)",
    description:
      "Enterprise omnichannel RAG support desk with WhatsApp integration, Gemini-powered ticket triage, pgvector RAG pipeline, SLA breach engine & n8n automation.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Prisma",
      "Neon DB",
      "Google Gemini",
      "Meta Cloud API",
      "n8n",
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
