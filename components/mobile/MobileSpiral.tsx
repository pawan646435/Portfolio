"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks";
import CodexSeal from "@/components/mobile/CodexSeal";

const PHI = 1.618033988749;
const B = Math.log(PHI) / (Math.PI / 2);
const TOTAL_TURNS = 3;
const STEPS = 300;

function Spiral({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const totalT = TOTAL_TURNS * Math.PI * 2;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * totalT;
      const r = 0.15 * Math.pow(Math.E, B * t);
      pts.push(new THREE.Vector3(r * Math.cos(t), r * Math.sin(t), (t / totalT) * 0.4 - 0.2));
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    if (animate) {
      group.rotation.z += 0.002;
      const breathe = Math.sin(clock.getElapsedTime() * 0.4);
      group.scale.setScalar(0.8 + breathe * 0.04);
    } else {
      group.scale.setScalar(0.8);
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
 */
export default function MobileSpiral({ size = 200 }: { size?: number }) {
  const reducedMotion = useReducedMotion();
  const [glFailed, setGlFailed] = useState(false);

  if (glFailed) {
    return (
      <div className="mx-auto" style={{ width: size, height: size }}>
        <CodexSeal size={size} className="opacity-55" />
      </div>
    );
  }

  return (
    <div className="mx-auto" style={{ width: size, height: size, touchAction: "pan-y" }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
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
        <Spiral animate={!reducedMotion} />
      </Canvas>
    </div>
  );
}
