"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SHORTCUTS = [
  { keys: "← →", action: "Navigate rooms" },
  { keys: "ESC", action: "Close overlay" },
  { keys: "M", action: "Toggle music" },
  { keys: "?", action: "Show / hide shortcuts" },
];

export default function ShortcutsOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "?") setOpen((v) => !v);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-16 right-6 z-[700] rounded-lg p-5 backdrop-blur-md"
          style={{
            background: "rgba(8,8,8,0.85)",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
          role="dialog"
          aria-label="Keyboard shortcuts"
        >
          <p className="font-classical italic text-accent-gold text-sm mb-3">
            Shortcuts
          </p>
          <ul className="space-y-2">
            {SHORTCUTS.map((s) => (
              <li key={s.keys} className="flex items-center gap-4 font-jetbrains-mono text-xs">
                <span className="text-accent-gold w-12">{s.keys}</span>
                <span className="text-text-muted">{s.action}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
