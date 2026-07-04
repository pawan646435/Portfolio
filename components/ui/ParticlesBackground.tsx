"use client";

import { useMemo } from "react";
import Particles, { useParticlesProvider } from "@tsparticles/react";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const { loaded } = useParticlesProvider();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reducedMotion = useReducedMotion();

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: isMobile ? 12 : 20 },
        color: { value: "#C9A84C" },
        opacity: { value: 0.2 },
        size: { value: 1.5 },
        links: { enable: false },
        move: {
          enable: !reducedMotion,
          speed: 0.21,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      detectRetina: true,
    }),
    [isMobile, reducedMotion]
  );

  if (!loaded) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}
