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
      fpsLimit: isMobile ? 20 : 30,
      particles: {
        number: { value: isMobile ? 15 : 25 },
        color: { value: "#C9A84C" },
        opacity: { value: isMobile ? 0.15 : 0.2 },
        size: { value: isMobile ? 0.8 : 1.0 },
        links: { enable: false },
        move: {
          enable: !reducedMotion,
          speed: 0.2,
          direction: "top",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
      detectRetina: false,
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
