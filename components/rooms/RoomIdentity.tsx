"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/data";
import { useApp } from "@/lib/context/AppContext";
import { spotlight } from "@/lib/spotlight";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";
import Typewriter from "@/components/ui/Typewriter";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

const GoldenSpiral = dynamic(() => import("@/components/3d/GoldenSpiral"), {
  ssr: false,
});

const LETTER_RADIUS = 120;

/** "PAWAN KUMAR" — each letter lit individually by the passing torch. */
function IlluminatedName() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const letters = Array.from(
      container.querySelectorAll<HTMLSpanElement>("[data-letter]")
    );

    if (reducedMotion || isMobile || !window.matchMedia("(pointer: fine)").matches) {
      letters.forEach((el) => {
        el.style.color = "#F5F0E8";
        el.style.textShadow = "0 0 40px rgba(201,168,76,0.4)";
      });
      return;
    }

    let raf: number;
    const tick = () => {
      for (const el of letters) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(spotlight.x - cx, spotlight.y - cy);
        if (spotlight.active && dist < LETTER_RADIUS) {
          el.style.color = "#F5F0E8";
          el.style.textShadow = "0 0 40px rgba(201,168,76,0.6)";
        } else {
          el.style.color = "rgba(245,240,232,0.08)";
          el.style.textShadow = "none";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, isMobile]);

  return (
    <h1
      ref={containerRef}
      className="font-space-grotesk font-bold"
      style={{
        fontSize: "clamp(2.8rem, 7vw, 7rem)",
        letterSpacing: "0.08em",
        lineHeight: 1.05,
      }}
      aria-label={profile.name}
    >
      {profile.name.toUpperCase().split(" ").map((word, w) => (
        <span key={w} className="block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <span
              key={i}
              data-letter
              aria-hidden="true"
              style={{
                color: "rgba(245,240,232,0.08)",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function RoomIdentity() {
  const { setCurrentRoom, hasEntered } = useApp();
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    if (!hasEntered) return;
    const t = setTimeout(() => setShowTagline(true), 2000);
    return () => clearTimeout(t);
  }, [hasEntered]);

  return (
    <div className="relative w-full h-full flex items-center">
      <ParticlesBackground />

      {/* Light pooling at the gallery floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-50 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(201,168,76,0.03), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <span
        className="absolute font-jetbrains-mono"
        style={{
          top: "15%",
          left: "8%",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          color: "rgba(201,168,76,0.4)",
        }}
        data-reveal
        data-reveal-base="0.2"
      >
        &lt; Codex I &gt;
      </span>

      {/* Left zone — text */}
      <div className="w-full md:w-[55%] px-[8%] z-10">
        <IlluminatedName />

        <div className="mt-6 min-h-10">
          {showTagline && (
            <Typewriter
              words={profile.taglines}
              className="font-classical italic font-light text-accent-gold"
            />
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showTagline ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-inter text-[0.9rem] leading-[1.8] max-w-105 mt-6 text-text-muted"
        >
          {profile.bio}
        </motion.p>

        <div className="flex flex-wrap items-center gap-8 mt-10" data-reveal data-reveal-base="0.25">
          <button className="codex-cta" onClick={() => setCurrentRoom(2)}>
            View My Work
          </button>
          <a
            className="codex-cta"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>

        {/* Socials */}
        <div className="absolute bottom-[10%] left-[8%] flex items-center gap-5">
          {[
            { href: profile.github, icon: <FiGithub />, label: "GitHub" },
            { href: profile.linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, icon: <FiMail />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-accent-gold opacity-25 hover:opacity-100 hover:scale-110 transition-all duration-300 text-xl"
              style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.4))" }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Right zone — sacred globe, emerging from darkness */}
      <div
        className="hidden md:block w-[45%] h-full"
        data-reveal
        data-reveal-base="0.3"
        data-reveal-radius="450"
      >
        <GoldenSpiral className="w-full h-full" />
      </div>
    </div>
  );
}
