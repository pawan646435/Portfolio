"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/hooks";

const PHI = 1.618033988749;
const B = Math.log(PHI) / (Math.PI / 2);
const TOTAL_TURNS = 3;
const STEPS = 400;

function MiniSpiral() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

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
    if (!reducedMotion) {
      group.rotation.z += 0.002;
      const breathe = Math.sin(clock.getElapsedTime() * 0.4);
      group.scale.setScalar(0.8 + breathe * 0.04);
    } else {
      group.scale.setScalar(0.8);
    }
  });

  return (
    <group ref={groupRef}>
      <Line points={points} color="#C9A84C" transparent opacity={0.6} lineWidth={1.5} />
    </group>
  );
}

export default function GoldenSpiralMini({ className = "w-50 h-50" }: { className?: string }) {
  return (
    <div className={className} style={{ touchAction: "pan-y" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1]}
        performance={{ min: 0.5 }}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <pointLight color="#FFD700" intensity={0.8} position={[2, 2, 2]} />
        <ambientLight color="#3D2B00" intensity={0.3} />
        <MiniSpiral />
      </Canvas>
    </div>
  );
}
