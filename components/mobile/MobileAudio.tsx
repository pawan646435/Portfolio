"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { useApp } from "@/lib/context/AppContext";

const AMBIENT_VOLUME = 0.12; // slightly lower than desktop
const TRANSITION_DIP = 0.06;

/** Short synthesized page-turn whoosh — same trick as the desktop codex. */
function playPageTurn() {
  try {
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const duration = 0.3;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) * 0.5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + duration);
    filter.Q.value = 1.5;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
    source.onended = () => ctx.close();
  } catch {
    // Audio is atmosphere, never an error
  }
}

/**
 * Headless mobile audio: the toggle lives in the top navbar (MobileLayout),
 * this component just drives Howler off context state. Howler's autoUnlock
 * satisfies iOS's user-gesture policy — the entry-gate / navbar tap unlocks it.
 */
export default function MobileAudio() {
  const { hasEntered, audioEnabled, currentRoom } = useApp();
  const howlRef = useRef<Howl | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const prevRoom = useRef(currentRoom);

  useEffect(() => {
    if (!hasEntered || !audioEnabled || howlRef.current || loadFailed) return;
    howlRef.current = new Howl({
      src: ["/audio/ambient.mp3"],
      loop: true,
      volume: 0,
      html5: true,
      onloaderror: () => setLoadFailed(true),
    });
  }, [hasEntered, audioEnabled, loadFailed]);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (audioEnabled && hasEntered) {
      if (!howl.playing()) howl.play();
      howl.fade(howl.volume(), AMBIENT_VOLUME, 3000);
    } else if (howl.playing()) {
      howl.fade(howl.volume(), 0, 1500);
      setTimeout(() => {
        if (!audioEnabled) howl.pause();
      }, 1500);
    }
  }, [audioEnabled, hasEntered]);

  // Page-turn + ambient dip when the reader reaches a new room
  useEffect(() => {
    if (prevRoom.current === currentRoom) return;
    prevRoom.current = currentRoom;
    if (!audioEnabled || !hasEntered) return;
    playPageTurn();
    const howl = howlRef.current;
    if (howl?.playing()) {
      howl.fade(AMBIENT_VOLUME, TRANSITION_DIP, 300);
      setTimeout(() => howl.fade(TRANSITION_DIP, AMBIENT_VOLUME, 600), 700);
    }
  }, [currentRoom, audioEnabled, hasEntered]);

  useEffect(() => {
    return () => {
      howlRef.current?.unload();
      howlRef.current = null;
    };
  }, []);

  return null;
}
