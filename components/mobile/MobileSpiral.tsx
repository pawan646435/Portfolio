"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { Vector3, type Group } from "three";
import { useReducedMotion } from "@/lib/hooks";
import CodexSeal from "@/components/mobile/CodexSeal";

const PHI = 1.618033988749;
const B = Math.log(PHI) / (Math.PI / 2);
const TOTAL_TURNS = 3;
const STEPS = 300;

function Spiral({ animate, baseScale }: { animate: boolean; baseScale: number }) {
  const groupRef = useRef<Group>(null);

  const points = useMemo(() => {
    const totalT = TOTAL_TURNS * Math.PI * 2;
    const pts: Vector3[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * totalT;
      const r = 0.15 * Math.pow(Math.E, B * t);
      pts.push(new Vector3(r * Math.cos(t), r * Math.sin(t), (t / totalT) * 0.4 - 0.2));
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    if (animate) {
      group.rotation.z += 0.002;
      const breathe = Math.sin(clock.getElapsedTime() * 0.4);
      group.scale.setScalar(baseScale + breathe * 0.04);
    } else {
      group.scale.setScalar(baseScale);
    }
  });

  return (
    <group ref={groupRef}>
      <Line points={points} color="#C9A84C" transparent opacity={0.55} lineWidth={1.5} />
    </group>
  );
}

/**
 * Mobile-budget golden spiral: 1x DPR, low-power GL, no supporting
 * elements. Falls back to the SVG compass seal if WebGL fails.
 *
 * `fill` renders as a full-bleed background layer (used behind the
 * identity room's centered content) instead of the default fixed-size
 * inline badge.
 */
export default function MobileSpiral({
  size = 200,
  fill = false,
}: {
  size?: number;
  fill?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [glFailed, setGlFailed] = useState(false);
  const baseScale = fill ? 1.6 : 0.8;

  if (glFailed) {
    return (
      <div
        className={fill ? "absolute inset-0 flex items-center justify-center" : "mx-auto"}
        style={fill ? undefined : { width: size, height: size }}
      >
        <CodexSeal size={size} className="opacity-55" />
      </div>
    );
  }

  return (
    <div
      className={fill ? "absolute inset-0" : "mx-auto"}
      style={{
        ...(fill ? {} : { width: size, height: size }),
        touchAction: "pan-y",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, fill ? 6 : 4.5], fov: fill ? 55 : 45 }}
        dpr={[1, 1]}
        performance={{ min: 0.3 }}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          powerPreference: "low-power",
          antialias: false,
          precision: "lowp",
          alpha: true,
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", () => setGlFailed(true));
        }}
      >
        <ambientLight color="#C9A84C" intensity={0.4} />
        <Spiral animate={!reducedMotion} baseScale={baseScale} />
      </Canvas>
    </div>
  );
}
