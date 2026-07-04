"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiMusic2Line, RiVolumeMuteLine } from "react-icons/ri";
import { rooms } from "@/lib/data";
import { useApp } from "@/lib/context/AppContext";

const ROOM_ICONS = ["◎", "☰", "⬡", "✦", "✉"];

/** Rooms 1 & 5 fit one screen; 2–4 scroll within their snap area. */
const ROOM_FITS = [true, false, false, false, true];

/**
 * Dispatch from anywhere in the mobile tree to smooth-scroll to a room
 * (e.g. the Identity CTA "View My Work" → room 2).
 */
export const MOBILE_NAV_EVENT = "mobile-nav";

export default function MobileLayout({ children }: { children: ReactNode[] }) {
  const { hasEntered, currentRoom, setCurrentRoom, audioEnabled, setAudioEnabled } =
    useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);

  // The codex scrolls vertically — undo the desktop body lock while mounted
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevOverflowX = document.body.style.overflowX;
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overflowX = prevOverflowX;
    };
  }, []);

  // Scroll progress for the left-edge rail
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Active-room tracking: fires when a room crosses the viewport's center band
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (idx >= 0) setCurrentRoom(idx);
        }
      },
      { root: el, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [setCurrentRoom]);

  const scrollToRoom = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Let rooms request navigation (Identity CTA → Works)
  useEffect(() => {
    const onNav = (e: Event) => scrollToRoom((e as CustomEvent<number>).detail);
    window.addEventListener(MOBILE_NAV_EVENT, onNav);
    return () => window.removeEventListener(MOBILE_NAV_EVENT, onNav);
  }, [scrollToRoom]);

  return (
    <>
      {/* Top navbar */}
      <header className="mobile-navbar">
        <span className="mobile-navbar-logo">PK</span>
        <div className="flex items-center gap-4">
          <button
            className="mobile-navbar-btn"
            data-active={audioEnabled}
            onClick={() => setAudioEnabled(!audioEnabled)}
            aria-label="Toggle ambient audio"
            aria-pressed={audioEnabled}
            style={{ fontSize: 20 }}
          >
            {audioEnabled ? <RiMusic2Line /> : <RiVolumeMuteLine />}
          </button>
          <button
            className="mobile-navbar-btn font-jetbrains-mono"
            onClick={() => setHelpOpen(true)}
            aria-label="Show help"
            style={{ fontSize: "0.75rem", color: "rgba(201,168,76,0.3)" }}
          >
            ?
          </button>
        </div>
      </header>

      {/* Scrolling codex */}
      <div ref={containerRef} className="mobile-scroll-container">
        {children.map((child, i) => (
          <section
            key={rooms[i]}
            ref={(node) => {
              sectionRefs.current[i] = node;
            }}
            id={`room-${i}`}
            className="mobile-room"
            data-fit={ROOM_FITS[i]}
            aria-label={rooms[i]}
          >
            {hasEntered ? child : null}
          </section>
        ))}
      </div>

      {/* Scroll progress rail */}
      <div className="mobile-progress-track" aria-hidden="true">
        <div
          className="mobile-progress-fill"
          style={{ height: `${progress * 100}%` }}
        >
          <span className="mobile-progress-diamond" />
        </div>
      </div>

      {/* Candlelight vignette */}
      <div className="mobile-vignette" aria-hidden="true" />

      {/* Bottom nav */}
      <nav className="mobile-bottomnav" role="navigation" aria-label="Room navigation">
        {rooms.map((name, i) => (
          <button
            key={name}
            className="mobile-bottomnav-item"
            data-active={currentRoom === i}
            aria-label={`Navigate to ${name}`}
            aria-current={currentRoom === i ? "true" : undefined}
            onClick={() => scrollToRoom(i)}
          >
            <span className="mobile-bottomnav-icon" aria-hidden="true">
              {ROOM_ICONS[i]}
            </span>
            <span className="mobile-bottomnav-label">{name.toUpperCase()}</span>
          </button>
        ))}
      </nav>

      {/* Help sheet */}
      <AnimatePresence>
        {helpOpen && (
          <motion.div
            className="fixed inset-0 z-[900] flex items-center justify-center px-8"
            style={{ background: "rgba(8,8,8,0.94)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Help"
            onClick={() => setHelpOpen(false)}
          >
            <div className="text-center">
              <p
                className="font-classical italic"
                style={{ fontSize: "1.2rem", color: "#C9A84C" }}
              >
                Reading the Codex
              </p>
              <ul
                className="font-jetbrains-mono mt-6 space-y-3"
                style={{ fontSize: "0.72rem", color: "#6B6355", listStyle: "none" }}
              >
                <li>Scroll ↓ to turn the pages</li>
                <li>Tap the bottom nav to jump to a room</li>
                <li>♪ toggles the ambient sound</li>
              </ul>
              <p
                className="font-jetbrains-mono mt-8"
                style={{ fontSize: "0.62rem", color: "rgba(201,168,76,0.35)" }}
              >
                tap anywhere to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
