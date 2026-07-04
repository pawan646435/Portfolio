"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { useApp } from "@/lib/context/AppContext";
import { useMediaQuery } from "@/lib/hooks";

function ProjectPanel({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const tilt = hovered ? (index === 0 ? 2 : index === 2 ? -2 : 0) : 0;

  return (
    <button
      className="relative flex-1 h-full text-left overflow-hidden"
      style={{
        background: "#080808",
        border: "none",
        borderLeft: hovered
          ? "2px solid rgba(201,168,76,0.4)"
          : "2px solid transparent",
        transform: `perspective(800px) rotateY(${tilt}deg)`,
        transition: "transform 0.5s ease, border-color 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      data-cursor="view"
      aria-label={`Open ${project.name} details`}
    >
      <div
        className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10"
        data-reveal
        data-reveal-base="0.08"
        data-reveal-radius="300"
      >
        {/* Top: banner gradient + number + status */}
        <div className="relative -m-8 lg:-m-10 p-8 lg:p-10 h-[35%]" style={{ background: project.bannerGradient }}>
          <span className="font-jetbrains-mono text-[0.65rem] text-accent-gold">
            {project.live ? "● LIVE" : "◐ DEV"}
          </span>
          <span
            className="absolute top-2 right-6 font-classical font-light select-none"
            style={{ fontSize: "6rem", opacity: 0.08 }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Middle */}
        <div className="mt-4">
          <h3
            className="font-classical italic font-light"
            style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.5rem)" }}
          >
            <span className="drop-cap">{project.name[0]}</span>
            {project.name.slice(1)}
          </h3>
          <p className="font-inter italic text-[0.85rem] text-accent-gold mt-2">
            {project.tagline}
          </p>
          <p className="font-inter text-[0.8rem] leading-[1.8] max-w-65 mt-4 text-text-muted">
            {project.description}
          </p>
        </div>

        {/* Bottom: stack + links */}
        <div>
          <div className="flex flex-wrap gap-1.5 max-w-75">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-jetbrains-mono text-[0.7rem] rounded-[3px] px-2.5 py-1"
                style={{
                  background: "rgba(201,168,76,0.05)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-6 mt-5 font-jetbrains-mono text-[0.75rem] text-accent-gold">
            <span className="hover:text-accent-gold-pure transition-colors">GitHub ↗</span>
            {project.demo && (
              <span className="hover:text-accent-gold-pure transition-colors">Live ↗</span>
            )}
          </div>
        </div>
      </div>

      {/* Shimmer falling from above on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-x-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(201,168,76,0.05), transparent)",
          }}
          initial={{ top: "-30%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

function ProjectOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[800] flex items-center justify-center p-6"
      style={{ background: "rgba(8,8,8,0.97)" }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.35 } }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
      onClick={onClose}
    >
      {/* Top bar — unmissable close affordances */}
      <div
        className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-6 md:px-10 z-[900]"
        style={{
          background: "rgba(8,8,8,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="story-back-btn font-jetbrains-mono text-[0.75rem] tracking-[0.1em] text-accent-gold/60 hover:text-accent-gold transition-all duration-250 bg-transparent border-none p-3 min-h-11"
          style={{ cursor: "none" }}
        >
          ← Back to Works
        </button>
        <span
          className="hidden md:block font-jetbrains-mono text-[0.7rem] tracking-[0.2em] uppercase"
          style={{ color: "rgba(201,168,76,0.4)" }}
        >
          {project.name}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-accent-gold/50 hover:text-accent-gold text-2xl leading-none transition-transform duration-300 hover:rotate-90 bg-transparent border-none flex items-center justify-center min-w-11 min-h-11"
          style={{ cursor: "none" }}
        >
          ✕
        </button>
      </div>

      <div
        className="max-w-150 w-full max-h-full overflow-y-auto text-center py-10 mt-14"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-jetbrains-mono text-[0.65rem] text-accent-gold">
          {project.live ? "● LIVE" : "◐ IN DEVELOPMENT"}
        </span>
        <h2
          className="font-classical italic font-light mt-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          {project.name}
        </h2>
        <p className="font-inter italic text-accent-gold mt-2">{project.tagline}</p>

        {/* Renaissance divider */}
        <svg viewBox="0 0 240 16" className="w-60 h-4 mx-auto my-8" fill="none" aria-hidden="true">
          <line x1="0" y1="8" x2="104" y2="8" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
          <line x1="136" y1="8" x2="240" y2="8" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
          <circle cx="120" cy="8" r="5" stroke="#C9A84C" strokeWidth="0.6" opacity="0.5" />
          <circle cx="120" cy="8" r="1.8" fill="#C9A84C" opacity="0.4" />
        </svg>

        <p className="font-inter text-[0.9rem] leading-[1.9] text-text-muted">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-jetbrains-mono text-[0.7rem] rounded-[3px] px-2.5 py-1"
              style={{
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-8 mt-10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="codex-cta"
          >
            GitHub ↗
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="codex-cta"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function RoomWorks() {
  const { setOverlayOpen } = useApp();
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const open = (p: Project) => {
    setOpenProject(p);
    setOverlayOpen(true);
  };
  const close = () => {
    setOpenProject(null);
    setOverlayOpen(false);
  };

  return (
    <div className="relative w-full h-full">
      <span className="room-label">Codex III — Works</span>

      {/* Museum wall texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(201,168,76,0.015) 0 1px, transparent 1px 64px)",
        }}
        aria-hidden="true"
      />

      <div
        className={
          isMobile
            ? "flex flex-col h-full overflow-y-auto pt-16 pb-20"
            : "flex h-full pt-14 pb-16"
        }
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={isMobile ? "min-h-[85vh] flex" : "flex flex-1"}
            style={
              i > 0 && !isMobile
                ? { borderLeft: "1px solid rgba(201,168,76,0.12)" }
                : undefined
            }
          >
            <ProjectPanel project={project} index={i} onOpen={() => open(project)} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openProject && <ProjectOverlay project={openProject} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
