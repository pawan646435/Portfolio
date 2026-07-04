"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

export default function Typewriter({
  words,
  className = "font-space-grotesk text-lg md:text-xl text-accent-gold-bright",
}: {
  words: string[];
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    if (reducedMotion) {
      const raf = requestAnimationFrame(() => setText(words[0]));
      return () => cancelAnimationFrame(raf);
    }

    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 2000);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 30);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, reducedMotion]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-0.5 h-[1.1em] bg-accent-gold ml-1 align-middle animate-blink" />
    </span>
  );
}
