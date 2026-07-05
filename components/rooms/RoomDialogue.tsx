"use client";

import { profile } from "@/lib/data";
import RenaissanceDivider from "@/components/ui/RenaissanceDivider";
import DialogueSeal from "@/components/ui/DialogueSeal";

const CONTACTS = [
  { prefix: "✉", label: profile.email, href: `mailto:${profile.email}` },
  {
    prefix: "⌥",
    label: profile.github.replace("https://", ""),
    href: profile.github,
  },
  {
    prefix: "in",
    label: profile.linkedin.replace("https://www.", "").replace(/\/$/, ""),
    href: profile.linkedin,
  },
];

export default function RoomDialogue() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span className="room-label">Codex V — Dialogue</span>

      {/* Gold ink wash — the same candle burning lower at the end of night */}
      <div className="gold-ink-wash-dialogue z-0" />
      <div className="gold-vignette-dialogue z-0" />

      {/* Moonlight through a high window */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 400px at 50% 45%, rgba(201,168,76,0.04), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-120 px-6 max-h-full overflow-y-auto py-16">
        {/* Wax seal */}
        <div data-reveal data-reveal-base="0.25" data-reveal-radius="350">
          <DialogueSeal />
        </div>

        {/* Latin heading */}
        <p
          className="font-classical italic uppercase mt-6"
          style={{
            fontWeight: 300,
            fontSize: "0.75rem",
            letterSpacing: "0.4em",
            color: "rgba(201,168,76,0.4)",
          }}
          data-reveal
          data-reveal-base="0.2"
        >
          Incipit Dialogus
        </p>
        <p
          className="font-jetbrains-mono italic mt-1"
          style={{ fontSize: "0.65rem", color: "rgba(201,168,76,0.25)" }}
          data-reveal
          data-reveal-base="0.2"
        >
          (Let the dialogue begin)
        </p>

        {/* Main heading */}
        <h2
          className="font-classical italic font-light mt-6"
          style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.15 }}
          data-reveal
        >
          <span className="drop-cap">L</span>et&rsquo;s Build
          <br />
          Something.
        </h2>

        <p
          className="font-inter text-[0.88rem] leading-[1.8] text-text-muted mt-5"
          data-reveal
          data-reveal-base="0.08"
          data-reveal-max="0.65"
        >
          Open to freelance projects, internships, and interesting collabs. If
          you have an idea — let&rsquo;s talk.
        </p>

        <div className="w-full my-8" data-reveal data-reveal-base="0.3">
          <RenaissanceDivider />
        </div>

        {/* Contact options */}
        <div className="flex flex-col items-center gap-5" data-reveal data-reveal-base="0.15">
          {CONTACTS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link font-jetbrains-mono text-[0.85rem]"
            >
              <span className="mr-2">{c.prefix}</span>
              {c.label}
            </a>
          ))}
        </div>

        {/* Closing signature */}
        <div className="mt-12 flex flex-col items-center" data-reveal data-reveal-base="0.2">
          <span className="w-10 h-px" style={{ background: "#C9A84C" }} aria-hidden="true" />
          <p
            className="font-classical italic mt-3"
            style={{ fontSize: "0.75rem", color: "rgba(201,168,76,0.3)" }}
          >
            Arte et Marte
          </p>
          <p
            className="font-jetbrains-mono mt-1"
            style={{ fontSize: "0.6rem", color: "rgba(201,168,76,0.2)" }}
          >
            By Art and Skill
          </p>
        </div>
      </div>
    </div>
  );
}
