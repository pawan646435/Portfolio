"use client";

import { funFacts } from "@/lib/data";
import TerminalCard from "@/components/ui/TerminalCard";
import AnatomicalSketch from "@/components/ui/AnatomicalSketch";

const PARAGRAPHS = [
  "A self-taught builder who ships real products while still a student. No bootcamp certificates on the wall — just deployed URLs, commit histories, and users.",
  "Full-stack first, AI always: AlphaMatrix ranks Indian equities with deterministic scoring engines, SkillPilot runs live 1v1 code battles with AI voice interviews, and FlowDesk AI answers support tickets grounded in a pgvector RAG pipeline.",
  "Currently going deep on LangChain, LangGraph and FastAPI — teaching the web to think, one agent at a time.",
];

export default function RoomStory() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span className="room-label">Codex II — Story</span>

      {/* Candlelight from a desk lamp in the artist's studio */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "10%",
          top: "30%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Renaissance soul of the room — barely-there background sketch */}
      <div
        className="hidden md:block absolute pointer-events-none"
        style={{
          top: "50%",
          left: "70%",
          transform: "translate(-50%, -50%)",
          width: 320,
          height: 320,
          opacity: 0.04,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <AnatomicalSketch />
      </div>

      {/* Single column content */}
      <div className="relative z-10 w-full max-w-180 px-[7%] max-h-full overflow-y-auto py-20 mx-auto">
        <h2
          className="font-classical italic font-light"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.2 }}
          data-reveal
        >
          <span className="drop-cap">W</span>ho&rsquo;s behind
          <br />
          the keyboard?
        </h2>

        <div className="mt-8 space-y-5">
          {PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              className="font-inter text-[0.88rem] leading-[1.9] text-text-muted"
              data-reveal
              data-reveal-base="0.15"
              data-reveal-max="0.75"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Fun fact chips */}
        <div className="flex flex-wrap gap-3 mt-8" data-reveal data-reveal-base="0.2">
          {funFacts.map((fact) => (
            <span
              key={fact}
              className="font-jetbrains-mono text-xs rounded-full px-4 py-1.5 transition-colors duration-300"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
              }}
            >
              {fact}
            </span>
          ))}
        </div>

        <div className="mt-8 max-w-110" data-reveal data-reveal-base="0.25">
          <TerminalCard />
        </div>
      </div>
    </div>
  );
}
