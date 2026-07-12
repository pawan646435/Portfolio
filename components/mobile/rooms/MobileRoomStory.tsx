"use client";

import { motion } from "framer-motion";
import { funFacts } from "@/lib/data";
import TerminalCard from "@/components/ui/TerminalCard";
import AnatomicalSketch from "@/components/ui/AnatomicalSketch";
import RenaissanceDivider from "@/components/ui/RenaissanceDivider";

const PARAGRAPHS = [
  "A self-taught builder who ships real products while still a student. No bootcamp certificates on the wall — just deployed URLs, commit histories, and users.",
  "Full-stack first, AI always: AlphaMatrix ranks Indian equities with deterministic scoring engines, SkillPilot runs live 1v1 code battles and a RAG-driven, multi-agent AI interview panel, and FlowDesk AI answers support tickets grounded in a pgvector RAG pipeline.",
  "Currently going deep on LangChain, LangGraph and FastAPI — teaching the web to think, one agent at a time.",
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function MobileRoomStory() {
  return (
    <div className="relative z-10" style={{ padding: "28px 28px 40px" }}>
      <p
        className="font-jetbrains-mono text-center"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(201,168,76,0.3)",
          marginBottom: 28,
        }}
      >
        Codex II — Story
      </p>

      <motion.h2
        className="font-classical italic font-light"
        style={{ fontSize: "clamp(1.7rem, 5.5vw, 2.2rem)", lineHeight: 1.25 }}
        {...inView()}
      >
        <span className="drop-cap">W</span>ho&rsquo;s behind the keyboard?
      </motion.h2>

      <div className="mt-6">
        {/* Da Vinci sketch — text wraps around it */}
        <motion.div
          className="float-right pointer-events-none"
          style={{ width: 110, height: 110, margin: "0 0 12px 16px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          aria-hidden="true"
        >
          <AnatomicalSketch />
        </motion.div>

        {PARAGRAPHS.map((p, i) => (
          <motion.p
            key={i}
            className="font-inter"
            style={{
              fontSize: "0.83rem",
              lineHeight: 1.9,
              color: "#6B6355",
              marginBottom: 16,
            }}
            {...inView(i * 0.15)}
          >
            {p}
          </motion.p>
        ))}
      </div>

      <div className="clear-both my-6">
        <RenaissanceDivider />
      </div>

      <div className="flex flex-wrap gap-2">
        {funFacts.map((fact, i) => (
          <motion.span
            key={fact}
            className="font-inter"
            style={{
              fontSize: "0.78rem",
              color: "#F5F0E8",
              background: "rgba(201,168,76,0.05)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 999,
              padding: "6px 14px",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {fact}
          </motion.span>
        ))}
      </div>

      <div className="my-6">
        <RenaissanceDivider />
      </div>

      <div className="mobile-terminal">
        <TerminalCard />
      </div>
    </div>
  );
}
