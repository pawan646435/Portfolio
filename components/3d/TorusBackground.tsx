"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";

function Torus({ opacity }: { opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || reducedMotion) return;
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[3, 0.8, 16, 100]} />
      <meshStandardMaterial color="#C9A84C" wireframe transparent opacity={opacity} />
    </mesh>
  );
}

export default function TorusBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        performance={{ min: 0.5 }}
      >
        <pointLight color="#FFD700" intensity={0.5} position={[2, 2, 4]} />
        <Torus opacity={isMobile ? 0.035 : 0.07} />
      </Canvas>
    </div>
  );
}
