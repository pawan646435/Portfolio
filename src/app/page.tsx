"use client";

import dynamic from "next/dynamic";

// Dynamic imports with no SSR for canvas/animation-heavy components
const ParticleCanvas = dynamic(
  () => import("@/components/background/ParticleCanvas"),
  { ssr: false }
);

const HeroExperience = dynamic(
  () => import("@/components/hero/HeroExperience"),
  { ssr: false }
);

const WhoIAm = dynamic(
  () => import("@/components/sections/WhoIAm"),
  { ssr: false }
);

const CoreExpertise = dynamic(
  () => import("@/components/sections/CoreExpertise"),
  { ssr: false }
);

const ProjectShowcase = dynamic(
  () => import("@/components/sections/ProjectShowcase"),
  { ssr: false }
);

const EngineeringJourney = dynamic(
  () => import("@/components/sections/EngineeringJourney"),
  { ssr: false }
);

const TechArsenal = dynamic(
  () => import("@/components/sections/TechArsenal"),
  { ssr: false }
);

const ContactExperience = dynamic(
  () => import("@/components/sections/ContactExperience"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative" style={{ background: "#050505" }}>
      {/* Living background */}
      <ParticleCanvas />

      {/* Hero / Landing Experience */}
      <HeroExperience />

      {/* Content sections */}
      <div className="relative z-10">
        <EngineeringJourney />
        <WhoIAm />
        <CoreExpertise />
        <ProjectShowcase />
        <TechArsenal />
        <ContactExperience />
      </div>
    </main>
  );
}
