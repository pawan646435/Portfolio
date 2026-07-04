"use client";

import { Code2, Database, Cpu, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { skills, type SkillCategory } from "@/lib/data";
import { useMediaQuery } from "@/lib/hooks";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Code2,
  Database,
  Cpu,
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.5 + i * 0.04 },
  }),
};

function SkillRow({
  name,
  tag,
  learning,
  index,
  number,
}: {
  name: string;
  tag: string;
  learning?: boolean;
  index: number;
  number: number;
}) {
  return (
    <motion.div
      className="skill-row flex items-center py-2 px-2 -mx-2 rounded-sm transition-colors duration-250"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={rowVariants}
    >
      <span
        className="font-jetbrains-mono text-[0.65rem] w-6 shrink-0"
        style={{ color: "rgba(201,168,76,0.2)" }}
      >
        {String(number).padStart(2, "0")}
      </span>
      <span
        className="font-classical text-[1.05rem]"
        style={{
          fontWeight: 500,
          color: learning ? "#F0C060" : "#F5F0E8",
        }}
      >
        {name}
      </span>
      <span
        className="skill-line grow h-px mx-3"
        style={{
          background: learning ? "rgba(240,192,96,0.2)" : "rgba(201,168,76,0.1)",
        }}
      />
      <span
        className="font-jetbrains-mono text-[0.6rem] tracking-[0.08em] shrink-0 flex items-center gap-1"
        style={{ color: learning ? "#F0C060" : "rgba(201,168,76,0.35)" }}
      >
        {learning && <span className="micro-pulse">🔬</span>}
        {tag}
      </span>
    </motion.div>
  );
}

function Column({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = CATEGORY_ICONS[category.icon] ?? Code2;

  return (
    <div
      className="arsenal-column relative py-8 px-6 md:px-10"
      data-reveal
      data-reveal-base="0.12"
      data-reveal-max="1"
      data-reveal-radius="320"
    >
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
      >
        <Icon size={16} color="#C9A84C" aria-hidden="true" />
        <span className="font-display font-semibold text-[0.9rem]" style={{ color: "#C9A84C" }}>
          {category.category}
        </span>
      </motion.div>

      <div
        className="h-px my-3 mb-6"
        style={{ background: "rgba(201,168,76,0.2)" }}
      />

      <div>
        {category.skills.map((skill, i) => (
          <SkillRow
            key={skill.name}
            name={skill.name}
            tag={skill.tag}
            learning={skill.learning}
            index={i}
            number={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

/** Mobile: single stacked column, all skills visible, tap-to-highlight. */
function MobileArsenal() {
  return (
    <div className="w-full h-full overflow-y-auto px-6 pt-20 pb-24">
      {skills.map((category) => {
        const Icon = CATEGORY_ICONS[category.icon] ?? Code2;
        return (
          <div key={category.category} className="mb-10">
            <div className="flex items-center gap-2">
              <Icon size={16} color="#C9A84C" aria-hidden="true" />
              <span
                className="font-display font-semibold text-[0.85rem]"
                style={{ color: "#C9A84C" }}
              >
                {category.category}
              </span>
            </div>
            <div
              className="h-px my-3 mb-4"
              style={{ background: "rgba(201,168,76,0.2)" }}
            />
            <div>
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-row-mobile flex items-center py-2.5 active:bg-[rgba(201,168,76,0.08)] transition-colors duration-500"
                >
                  <span
                    className="font-classical text-[1rem]"
                    style={{
                      fontWeight: 500,
                      color: skill.learning ? "#F0C060" : "#F5F0E8",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="grow h-px mx-3"
                    style={{
                      background: skill.learning
                        ? "rgba(240,192,96,0.2)"
                        : "rgba(201,168,76,0.1)",
                    }}
                  />
                  <span
                    className="font-jetbrains-mono text-[0.65rem] tracking-[0.08em] shrink-0 flex items-center gap-1"
                    style={{
                      color: skill.learning ? "#F0C060" : "rgba(201,168,76,0.35)",
                    }}
                  >
                    {skill.learning && <span className="micro-pulse">🔬</span>}
                    {skill.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const TOTAL_SKILLS = skills.reduce((sum, c) => sum + c.skills.length, 0);
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function toRoman(n: number) {
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return "X".repeat(tens) + (ROMAN[ones - 1] ?? "");
}

export default function RoomArsenal() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative w-full h-full" style={{ background: "#080808" }}>
      <span className="room-label">Codex IV — Arsenal</span>

      {/* Codex measuring grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,168,76,0.04) 0.5px, transparent 0.5px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {isMobile ? (
        <MobileArsenal />
      ) : (
        <div className="relative w-full h-full flex flex-col">
          {/* Watermark */}
          <span
            className="hidden lg:block absolute top-5 right-10 font-classical font-light select-none pointer-events-none"
            style={{ fontSize: "4rem", color: "rgba(201,168,76,0.04)" }}
            aria-hidden="true"
          >
            {toRoman(TOTAL_SKILLS)}
          </span>

          <motion.div
            className="text-center pt-16 pb-6 shrink-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-classical italic font-light"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F5F0E8" }}
            >
              <span className="drop-cap">M</span>y Arsenal
            </h2>
          </motion.div>

          <div
            className="grid grow px-[60px] pb-4"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1px",
              background: "rgba(201,168,76,0.12)",
            }}
          >
            {skills.map((category, i) => (
              <div key={category.category} style={{ background: "#080808" }}>
                <Column category={category} index={i} />
              </div>
            ))}
          </div>

          {/* Signature strip */}
          <div
            className="shrink-0 h-10 flex items-center justify-between px-10"
            style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
          >
            <svg viewBox="0 0 20 16" className="w-5 h-4" fill="none" aria-hidden="true">
              <circle cx="10" cy="8" r="5" stroke="#C9A84C" strokeWidth="0.6" opacity="0.5" />
              <circle cx="10" cy="8" r="1.8" fill="#C9A84C" opacity="0.4" />
            </svg>
            <span
              className="font-classical italic"
              style={{ fontSize: "0.7rem", color: "rgba(201,168,76,0.18)" }}
            >
              Omnia in mensura et numero et pondere
            </span>
            <span
              className="font-jetbrains-mono"
              style={{ fontSize: "0.65rem", color: "rgba(201,168,76,0.18)" }}
            >
              φ = 1.618
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
