"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

const CONFIG_LINES: { key: string; value: string; isArray?: boolean; items?: string[] }[] = [
  { key: "name", value: "Pawan Kumar" },
  { key: "role", value: "Full Stack + AI Engineer" },
  { key: "status", value: "Building in public 🚀" },
  { key: "learning", value: "", isArray: true, items: ["LangChain", "LangGraph", "FastAPI"] },
  { key: "openTo", value: "", isArray: true, items: ["Freelance", "Internships", "Collabs"] },
  { key: "location", value: "India 🇮🇳" },
];

function buildFullText() {
  const lines = ["{"];
  CONFIG_LINES.forEach((line, i) => {
    const comma = i < CONFIG_LINES.length - 1 ? "," : "";
    if (line.isArray) {
      lines.push(`  "${line.key}": [${line.items!.map((it) => `"${it}"`).join(", ")}]${comma}`);
    } else {
      lines.push(`  "${line.key}": "${line.value}"${comma}`);
    }
  });
  lines.push("}");
  return lines.join("\n");
}

function highlight(text: string) {
  return text.split("\n").map((line, i) => {
    const match = line.match(/^(\s*)"([^"]+)":\s*(.*)$/);
    if (!match) {
      return (
        <div key={i} className="text-text-muted">
          {line || " "}
        </div>
      );
    }
    const [, indent, key, rest] = match;
    return (
      <div key={i}>
        {indent}
        <span className="text-accent-gold">&quot;{key}&quot;</span>
        <span className="text-text-muted">: </span>
        <span className="text-accent-gold-bright">{rest}</span>
      </div>
    );
  });
}

export default function TerminalCard() {
  const fullText = buildFullText();
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      const raf = requestAnimationFrame(() => {
        setTyped(fullText);
        setDone(true);
      });
      return () => cancelAnimationFrame(raf);
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 15);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? undefined : { opacity: 0, y: 40 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl border border-border p-5"
      style={{ background: "#0A0900" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <span className="font-jetbrains-mono text-xs text-text-muted ml-2">
          pawan.config.json
        </span>
      </div>
      <pre className="font-jetbrains-mono text-[0.85rem] whitespace-pre-wrap leading-relaxed">
        {highlight(typed)}
        {!done && <span className="animate-blink text-accent-gold">|</span>}
      </pre>
    </motion.div>
  );
}
