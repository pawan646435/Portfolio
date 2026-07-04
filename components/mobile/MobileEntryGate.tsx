"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/context/AppContext";
import { useReducedMotion } from "@/lib/hooks";
import CodexSeal from "@/components/mobile/CodexSeal";

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
    // seal scale-up (0.5s) + content fade (0.4s) + fade to black (0.3s)
    setTimeout(() => setHasEntered(true), 1200);
  };

  return (
    <AnimatePresence>
      {!hasEntered && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden"
          style={{ background: "#080808" }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 0.3, delay: exiting ? 0.9 : 0 }}
        >
          {/* Static candlelight blobs */}
          <div className="mobile-candle-blob" style={{ top: "-80px", left: "-80px" }} aria-hidden="true" />
          <div className="mobile-candle-blob" style={{ bottom: "-80px", right: "-80px" }} aria-hidden="true" />

          <div className="flex flex-col items-center text-center gap-5 px-8">
            <motion.div
              animate={exiting ? { scale: 1.8, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CodexSeal size={100} />
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-5"
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.4 }}
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
                className="font-classical italic"
                style={{ fontSize: "1rem", color: GOLD }}
              >
                of Pawan Kumar
              </p>

              <span
                aria-hidden="true"
                style={{
                  width: 100,
                  height: 1,
                  background: "rgba(201,168,76,0.3)",
                }}
              />

              <button
                onClick={enter}
                className="font-classical italic flex items-center justify-center"
                style={{
                  fontSize: "1.15rem",
                  color: "#F5F0E8",
                  minHeight: 56,
                  padding: "0 24px",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(201,168,76,0.4)",
                }}
              >
                Enter the Codex
              </button>

              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="font-jetbrains-mono flex items-center justify-center"
                style={{
                  fontSize: "0.65rem",
                  color: audioEnabled ? GOLD : "#6B6355",
                  minHeight: 44,
                  padding: "0 16px",
                  background: "none",
                  border: "none",
                }}
                aria-pressed={audioEnabled}
              >
                {audioEnabled ? "♪ with sound" : "♪ in silence"}
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
