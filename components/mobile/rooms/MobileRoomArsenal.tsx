"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cpu, type LucideIcon } from "lucide-react";
import { skills } from "@/lib/data";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Code2,
  Database,
  Cpu,
};

function SkillRow({
  name,
  tag,
  learning,
}: {
  name: string;
  tag: string;
  learning?: boolean;
}) {
  const [flash, setFlash] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onTap = () => {
    setFlash(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(false), 400);
  };

  return (
    <div className="mobile-skill-row" data-flash={flash} onPointerDown={onTap}>
      <span
        className="mobile-skill-name font-classical shrink-0"
        style={{
          fontSize: "1rem",
          fontWeight: 500,
          color: learning ? "#F0C060" : "#F5F0E8",
        }}
      >
        {name}
      </span>
      <span
        className="grow h-px self-center"
        style={{
          background: learning ? "rgba(240,192,96,0.12)" : "rgba(201,168,76,0.08)",
        }}
        aria-hidden="true"
      />
      <span
        className="font-jetbrains-mono shrink-0 flex items-center gap-1"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
          color: learning ? "#F0C060" : "rgba(201,168,76,0.35)",
        }}
      >
        {learning && <span className="micro-pulse">🔬</span>}
        {tag}
      </span>
    </div>
  );
}

export default function MobileRoomArsenal() {
  return (
    <div className="relative z-10" style={{ padding: "28px 24px 48px" }}>
      <p
        className="font-jetbrains-mono text-center"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(201,168,76,0.3)",
          marginBottom: 28,
        }}
      >
        Codex IV — Arsenal
      </p>

      <h2
        className="font-classical italic font-light"
        style={{ fontSize: "clamp(1.6rem, 5vw, 2rem)", marginBottom: 28 }}
      >
        <span className="drop-cap">M</span>y Arsenal
      </h2>

      {skills.map((category, i) => {
        const Icon = CATEGORY_ICONS[category.icon] ?? Code2;
        return (
          <motion.section
            key={category.category}
            style={{ marginBottom: 32 }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            aria-label={category.category}
          >
            <div
              className="flex items-center gap-2"
              style={{
                borderBottom: "1px solid rgba(201,168,76,0.15)",
                paddingBottom: 10,
                marginBottom: 14,
              }}
            >
              <Icon size={14} color="#C9A84C" aria-hidden="true" />
              <span
                className="font-display font-semibold"
                style={{ fontSize: "0.85rem", color: "#C9A84C" }}
              >
                {category.category}
              </span>
            </div>

            {category.skills.map((skill) => (
              <SkillRow
                key={skill.name}
                name={skill.name}
                tag={skill.tag}
                learning={skill.learning}
              />
            ))}
          </motion.section>
        );
      })}

      <div className="text-center" style={{ marginTop: 24 }}>
        <p
          className="font-classical italic"
          style={{
            fontSize: "0.72rem",
            color: "rgba(201,168,76,0.2)",
            marginBottom: 6,
          }}
        >
          Omnia in mensura et numero et pondere
        </p>
        <p
          className="font-jetbrains-mono"
          style={{ fontSize: "0.65rem", color: "rgba(201,168,76,0.18)" }}
        >
          φ = 1.618
        </p>
      </div>
    </div>
  );
}
