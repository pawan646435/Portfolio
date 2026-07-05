"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/data";
import { useApp } from "@/lib/context/AppContext";
import { useReducedMotion } from "@/lib/hooks";
import Typewriter from "@/components/ui/Typewriter";
import { MOBILE_NAV_EVENT } from "@/components/mobile/MobileLayout";

const SOCIALS = [
  { href: profile.github, icon: <FiGithub />, label: "GitHub profile" },
  { href: profile.linkedin, icon: <FiLinkedin />, label: "LinkedIn profile" },
  { href: `mailto:${profile.email}`, icon: <FiMail />, label: "Email" },
];

export default function MobileRoomIdentity() {
  const { currentRoom } = useApp();
  const reducedMotion = useReducedMotion();
  const [showTagline, setShowTagline] = useState(false);

  // Scroll hint disappears for good once the reader leaves the first page
  const [scrolled, setScrolled] = useState(false);
  if (currentRoom > 0 && !scrolled) setScrolled(true);

  useEffect(() => {
    const t = setTimeout(() => setShowTagline(true), reducedMotion ? 0 : 1300);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  const words = profile.name.toUpperCase().split(" ");
  let letterIndex = 0;

  return (
    <div className="relative h-full">
      {/* Gold ink wash — a single breathing candle behind the inscription */}
      <div className="gold-ink-wash z-1" />
      <div className="gold-vignette z-2" />

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center h-full"
        style={{ padding: "0 24px" }}
      >
        {/* Glow behind the name */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 35%, rgba(201,168,76,0.05), transparent 65%)",
          }}
          aria-hidden="true"
        />

        <motion.p
          className="font-jetbrains-mono"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(201,168,76,0.35)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &lt; Codex I — Identity &gt;
        </motion.p>

        {/* Staggered letters */}
        <h1
          className="font-space-grotesk font-bold mt-4"
          style={{
            fontSize: "clamp(2.6rem, 9vw, 4rem)",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
          aria-label={profile.name}
        >
          {words.map((word, w) => (
            <span key={w} className="block whitespace-nowrap" aria-hidden="true">
              {word.split("").map((ch, i) => {
                const delay = 0.5 + letterIndex++ * 0.05;
                return (
                  <motion.span
                    key={i}
                    className="mobile-name-letter"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay, ease: "easeOut" }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-4 min-h-8">
          {showTagline && <Typewriter words={profile.taglines} />}
        </div>

        <motion.p
          className="font-inter mt-4"
          style={{
            fontSize: "0.82rem",
            lineHeight: 1.85,
            color: "#6B6355",
            maxWidth: 300,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={showTagline ? { opacity: 0.75, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {profile.bio}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-2.5 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <button
            className="mobile-cta"
            onClick={() =>
              window.dispatchEvent(new CustomEvent(MOBILE_NAV_EVENT, { detail: 2 }))
            }
          >
            View My Work
          </button>
          <a
            className="mobile-cta"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>

          <div className="flex items-center justify-center gap-6 mt-3">
            {SOCIALS.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center active:scale-115 transition-transform"
                style={{
                  fontSize: 20,
                  color: "rgba(201,168,76,0.4)",
                  minWidth: 44,
                  minHeight: 44,
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {!scrolled && (
            <span
              className="mobile-scroll-hint font-jetbrains-mono mt-1"
              style={{ fontSize: "0.6rem", color: "rgba(201,168,76,0.2)" }}
              aria-hidden="true"
            >
              scroll ↓
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
}
