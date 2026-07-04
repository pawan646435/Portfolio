"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/context/AppContext";
import { useReducedMotion } from "@/lib/hooks";

const GoldenSpiralMini = dynamic(() => import("@/components/3d/GoldenSpiralMini"), {
  ssr: false,
});

const GOLD = "#C9A84C";

export default function EntryGate() {
  const { hasEntered, setHasEntered, audioEnabled, setAudioEnabled } = useApp();
  const reducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  // Fake loading progress, 0 -> 100 over 1.2s
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), reducedMotion ? 0 : 1400);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  const enter = () => {
    if (exiting) return;
    setExiting(true);
    // content fade (0.6s) + curtain line (0.4s) before the gate lifts
    setTimeout(() => setHasEntered(true), reducedMotion ? 0 : 1000);
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden"
          style={{ background: "#080808" }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Candlelight blobs */}
          <div className="candlelight-blob candlelight-blob-main" aria-hidden="true" />
          <div className="candlelight-blob candlelight-blob-fill" aria-hidden="true" />

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="flex flex-col items-center gap-4"
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
              >
                <span
                  className="font-classical text-[2rem]"
                  style={{ color: GOLD }}
                >
                  PK
                </span>
                <div className="w-40 h-px overflow-hidden" style={{ background: "rgba(201,168,76,0.15)" }}>
                  <motion.div
                    className="h-full"
                    style={{ background: GOLD }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="gate"
                className="flex flex-col items-center text-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: exiting ? 0 : 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Ornamental seal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <GoldenSpiralMini className="w-50 h-50" />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="mt-6"
                >
                  <p
                    className="font-classical uppercase"
                    style={{
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      letterSpacing: "0.4em",
                      color: "#6B6355",
                    }}
                  >
                    The Codex
                  </p>
                  <p
                    className="font-classical italic mt-2"
                    style={{ fontWeight: 300, fontSize: "1.1rem", color: GOLD }}
                  >
                    of Pawan Kumar
                  </p>
                </motion.div>

                {/* Ornamental divider */}
                <motion.svg
                  viewBox="0 0 240 16"
                  className="w-60 h-4 mt-6"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  aria-hidden="true"
                >
                  <line x1="0" y1="8" x2="104" y2="8" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
                  <line x1="136" y1="8" x2="240" y2="8" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
                  <circle cx="120" cy="8" r="5" stroke={GOLD} strokeWidth="0.6" opacity="0.5" />
                  <circle cx="120" cy="8" r="1.8" fill={GOLD} opacity="0.4" />
                </motion.svg>

                {/* Enter button */}
                <motion.button
                  onClick={enter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2 }}
                  className="entry-button font-classical italic mt-10"
                >
                  Enter the Codex
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio choice */}
          {!loading && (
            <motion.button
              onClick={() => setAudioEnabled(!audioEnabled)}
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-jetbrains-mono text-[0.7rem]"
              style={{ color: audioEnabled ? GOLD : "#6B6355" }}
              aria-pressed={audioEnabled}
            >
              {audioEnabled ? "♪ with sound" : "♪ in silence"}
            </motion.button>
          )}

          {/* Curtain line on exit */}
          {exiting && !reducedMotion && (
            <motion.div
              className="absolute top-1/2 left-1/2 h-px -translate-x-1/2 -translate-y-1/2"
              style={{ background: GOLD, boxShadow: `0 0 20px ${GOLD}` }}
              initial={{ width: 0, opacity: 1 }}
              animate={{ width: "100vw", opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
