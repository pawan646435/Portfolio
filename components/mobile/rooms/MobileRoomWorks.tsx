"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="mobile-project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      {/* Banner */}
      <div className="relative" style={{ height: 80, background: project.bannerGradient }}>
        <span
          className="absolute font-jetbrains-mono"
          style={{
            top: 12,
            left: 14,
            fontSize: "0.6rem",
            color: "#C9A84C",
            background: "rgba(201,168,76,0.08)",
            padding: "3px 8px",
            borderRadius: 3,
          }}
        >
          {project.live ? "● LIVE" : "◐ DEV"}
        </span>
        <span
          className="absolute font-classical font-light select-none"
          style={{ top: 0, right: 16, fontSize: "3.5rem", opacity: 0.07 }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div style={{ padding: 16 }}>
        <h3
          className="font-classical"
          style={{ fontSize: "1.3rem", fontWeight: 500, color: "#F5F0E8", marginBottom: 4 }}
        >
          {project.name}
        </h3>
        <p className="font-inter italic" style={{ fontSize: "0.78rem", color: "#C9A84C" }}>
          {project.tagline}
        </p>

        {/* Collapsed description with inline expansion */}
        <p
          className="font-inter mt-3"
          style={{
            fontSize: "0.8rem",
            lineHeight: 1.8,
            color: "#6B6355",
            display: expanded ? undefined : "-webkit-box",
            WebkitLineClamp: expanded ? undefined : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.p
              className="font-inter overflow-hidden"
              style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "#6B6355" }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 8 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {project.longDescription}
            </motion.p>
          )}
        </AnimatePresence>
        <button
          className="mobile-readmore"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Read less ↑" : "Read more ↓"}
        </button>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-jetbrains-mono"
              style={{
                fontSize: "0.68rem",
                color: "#F5F0E8",
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 3,
                padding: "4px 8px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4" style={{ marginTop: 14 }}>
          <a
            className="mobile-project-link"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
          {project.demo && (
            <a
              className="mobile-project-link"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function MobileRoomWorks() {
  return (
    <div className="relative z-10" style={{ padding: "28px 20px 40px" }}>
      <p
        className="font-jetbrains-mono text-center"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(201,168,76,0.3)",
          marginBottom: 28,
        }}
      >
        Codex III — Works
      </p>

      <h2
        className="font-classical italic font-light"
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2rem)",
          lineHeight: 1.25,
          marginBottom: 24,
        }}
      >
        <span className="drop-cap">T</span>hings I&rsquo;ve Actually Shipped
      </h2>

      {projects.map((project, i) => (
        <div key={project.id}>
          {i > 0 && (
            <div
              className="mx-auto my-4"
              style={{ height: 1, maxWidth: 400, background: "rgba(201,168,76,0.08)" }}
              aria-hidden="true"
            />
          )}
          <ProjectCard project={project} index={i} />
        </div>
      ))}
    </div>
  );
}
