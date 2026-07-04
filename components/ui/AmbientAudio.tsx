"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { RiMusic2Line, RiVolumeMuteLine } from "react-icons/ri";
import { useApp } from "@/lib/context/AppContext";

const AMBIENT_VOLUME = 0.15;
const TRANSITION_DIP = 0.08;

/**
 * Subtle synthesized "page turn" — a short filtered noise whoosh via
 * Web Audio, so room transitions have sound without a bundled asset.
 */
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
    gain.gain.value = 0.06;
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start();
    source.onended = () => ctx.close();
  } catch {
    // Audio is atmosphere, never an error
  }
}

export default function AmbientAudio() {
  const { hasEntered, audioEnabled, setAudioEnabled, currentRoom } = useApp();
  const howlRef = useRef<Howl | null>(null);
  const [volume, setVolume] = useState(AMBIENT_VOLUME);
  const [showSlider, setShowSlider] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const prevRoom = useRef(currentRoom);

  // Lazy-create the ambient loop the first time audio is wanted
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

  // Play / pause with fades
  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;
    if (audioEnabled && hasEntered) {
      if (!howl.playing()) howl.play();
      howl.fade(howl.volume(), volume, 3000);
    } else if (howl.playing()) {
      howl.fade(howl.volume(), 0, 1500);
      setTimeout(() => {
        if (!audioEnabled) howl.pause();
      }, 1500);
    }
  }, [audioEnabled, hasEntered, volume]);

  // Room transitions: page-turn + ambient volume dip
  useEffect(() => {
    if (prevRoom.current === currentRoom) return;
    prevRoom.current = currentRoom;
    if (!audioEnabled) return;
    playPageTurn();
    const howl = howlRef.current;
    if (howl?.playing()) {
      howl.fade(volume, TRANSITION_DIP, 300);
      setTimeout(() => howl.fade(TRANSITION_DIP, volume, 600), 700);
    }
  }, [currentRoom, audioEnabled, volume]);

  // "M" toggles music
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "m" || e.key === "M") setAudioEnabled(!audioEnabled);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [audioEnabled, setAudioEnabled]);

  useEffect(() => {
    return () => {
      howlRef.current?.unload();
      howlRef.current = null;
    };
  }, []);

  if (!hasEntered) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-[600] flex flex-col items-center"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {showSlider && audioEnabled && (
        <input
          type="range"
          min={0}
          max={0.4}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="audio-volume-slider mb-3"
          aria-label="Ambient volume"
        />
      )}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        aria-label={audioEnabled ? "Mute ambient music" : "Play ambient music"}
        aria-pressed={audioEnabled}
        className="text-[1.1rem] transition-colors duration-300"
        style={{ color: audioEnabled ? "rgba(201,168,76,0.7)" : "rgba(201,168,76,0.3)" }}
      >
        {audioEnabled ? <RiMusic2Line /> : <RiVolumeMuteLine />}
      </button>
    </div>
  );
}
