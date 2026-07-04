"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import RenaissanceDivider from "@/components/ui/RenaissanceDivider";
import CodexSeal from "@/components/mobile/CodexSeal";

const GoldenSpiralMini = dynamic(() => import("@/components/3d/GoldenSpiralMini"), {
  ssr: false,
  loading: () => null,
});

const CONTACTS = [
  { prefix: "✉", label: "Send an Email", href: `mailto:${profile.email}` },
  { prefix: "⌥", label: "GitHub", href: profile.github },
  { prefix: "in", label: "LinkedIn", href: profile.linkedin },
];

export default function MobileRoomDialogue() {
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center text-center h-full"
      style={{ padding: "40px 28px 28px" }}
    >
      {/* Golden spiral — full background, dim ghost of Room I's spiral */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.35 }}>
        <GoldenSpiralMini
          className="w-full h-full"
          scale={1.8}
          rotationSpeed={{ x: 0.0002, y: 0, z: 0.0008 }}
          breatheAmplitude={0.03}
          opacity={0.3}
          cameraPosition={[0, 0, 6]}
          fov={50}
          dpr={[1, 1]}
          pointLightIntensity={0.5}
          ambientLightIntensity={0.1}
          ambientColor="#C9A84C"
          gl={{ powerPreference: "low-power", antialias: false, alpha: true }}
        />
      </div>

      {/* Warm glow rising from the floor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.05), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <p
        className="font-jetbrains-mono"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(201,168,76,0.3)",
          marginBottom: 24,
        }}
      >
        Codex V — Dialogue
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.55, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CodexSeal size={64} />
      </motion.div>

      <p
        className="font-classical italic uppercase mt-5"
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.35em",
          color: "rgba(201,168,76,0.4)",
        }}
      >
        Incipit Dialogus
      </p>
      <p
        className="font-jetbrains-mono"
        style={{
          fontSize: "0.6rem",
          color: "rgba(201,168,76,0.22)",
          marginTop: 10,
        }}
      >
        (Let the dialogue begin)
      </p>

      <motion.h2
        className="font-classical italic font-light mt-5"
        style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)", lineHeight: 1.2 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="drop-cap">L</span>et&rsquo;s Build Something.
      </motion.h2>

      <motion.p
        className="font-inter mt-4"
        style={{
          fontSize: "0.82rem",
          lineHeight: 1.85,
          color: "#6B6355",
          maxWidth: 290,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Open to freelance projects, internships, and interesting collabs. If
        you have an idea — let&rsquo;s talk.
      </motion.p>

      <div className="w-full my-6">
        <RenaissanceDivider />
      </div>

      <div className="w-full">
        {CONTACTS.map((c) => (
          <a
            key={c.href}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-contact-item"
          >
            <span aria-hidden="true">{c.prefix}</span>
            {c.label}
          </a>
        ))}
      </div>

      <div className="text-center" style={{ marginTop: 32 }}>
        <p
          className="font-classical italic"
          style={{ fontSize: "0.75rem", color: "rgba(201,168,76,0.25)" }}
        >
          Arte et Marte
        </p>
        <p
          className="font-space-grotesk mt-1"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "rgba(201,168,76,0.2)",
          }}
        >
          MMXXV
        </p>
      </div>
    </div>
  );
}
