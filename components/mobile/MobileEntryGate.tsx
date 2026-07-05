"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/context/AppContext";
import { useReducedMotion } from "@/lib/hooks";

const GOLD = "#C9A84C";

export default function MobileEntryGate() {
  const { hasEntered, setHasEntered, audioEnabled, setAudioEnabled } = useApp();
  const reducedMotion = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  const enter = () => {
    if (exiting) return;
    if (reducedMotion) {
      setHasEntered(true);
      return;
    }
    setExiting(true);
    setTimeout(() => setHasEntered(true), 900);
  };

  const t = (duration: number, delay = 0) =>
    reducedMotion ? { duration: 0 } : { duration, delay };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-9000 flex items-center justify-center overflow-hidden"
          style={{ background: "#080808" }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Gold ink wash — consistent atmosphere with the rooms beyond */}
          <motion.div
            className="gate-ink-wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(1.5)}
          />
          <div className="parchment-overlay" style={{ position: "absolute" }} aria-hidden="true" />

          <motion.div
            className="flex flex-col items-center text-center px-6"
            style={{ maxWidth: 300, margin: "0 auto" }}
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={t(0.5, 0.2)}
          >
            {/* Top hairline */}
            <motion.div
              style={{ height: 1, background: "rgba(201,168,76,0.3)" }}
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={t(1.2, 0.3)}
            />

            {/* Monogram */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: exiting ? 1.1 : 1,
                filter: exiting ? "brightness(1.3)" : "brightness(1)",
              }}
              transition={exiting ? { duration: 0.2 } : t(1, 0.6)}
            >
              <span
                className="font-classical"
                style={{
                  fontWeight: 300,
                  fontSize: "3rem",
                  letterSpacing: "0.25em",
                  color: "rgba(201,168,76,0.7)",
                }}
              >
                PK
              </span>
              <div className="gate-monogram-dot" aria-hidden="true" />
            </motion.div>

            {/* Title block */}
            <motion.div
              className="mt-7"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.8, 0.9)}
            >
              <p
                className="font-jetbrains-mono uppercase"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.45em",
                  color: "#6B6355",
                }}
              >
                The Codex
              </p>
              <p
                className="font-classical italic mt-1.5"
                style={{ fontWeight: 300, fontSize: "1rem", color: GOLD, letterSpacing: "0.02em" }}
              >
                of Pawan Kumar
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="my-6"
              style={{ color: "rgba(201,168,76,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={t(0.8, 1.2)}
              aria-hidden="true"
            >
              <span>—</span>
              <span style={{ color: GOLD, margin: "0 12px", fontSize: "6px" }}>◆</span>
              <span>—</span>
            </motion.div>

            {/* Enter button */}
            <motion.button
              onClick={enter}
              className="gate-enter-btn font-classical italic flex flex-col items-center justify-center"
              style={{ fontSize: "1.2rem", letterSpacing: "0.04em", minHeight: 48 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.8, 1.4)}
            >
              Enter the Codex
              <span className="gate-enter-line" aria-hidden="true" />
            </motion.button>
          </motion.div>

          {/* Audio choice */}
          <motion.button
            onClick={() => setAudioEnabled(!audioEnabled)}
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 0.6 }}
            transition={t(1, 1.8)}
            className="fixed left-1/2 -translate-x-1/2 font-jetbrains-mono text-[0.65rem] flex items-center justify-center"
            style={{
              bottom: "calc(24px + env(safe-area-inset-bottom))",
              color: audioEnabled ? GOLD : "rgba(201,168,76,0.3)",
              letterSpacing: "0.1em",
              minHeight: 48,
              padding: "0 16px",
            }}
            aria-pressed={audioEnabled}
          >
            {audioEnabled ? "♪ with sound" : "♪ in silence"}
          </motion.button>

          {/* Bottom hairline grounds the layout */}
          <div className="gate-bottom-hairline" aria-hidden="true" />

          {/* Gold sweep line on exit */}
          {exiting && !reducedMotion && (
            <motion.div
              className="absolute top-1/2 left-1/2 h-px -translate-x-1/2 -translate-y-1/2"
              style={{ background: "rgba(201,168,76,0.4)", boxShadow: `0 0 20px ${GOLD}` }}
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
            />
          )}

          {/* Fade to black before Room I appears */}
          {exiting && (
            <motion.div
              className="absolute inset-0"
              style={{ background: "#080808", pointerEvents: "none" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.7 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
