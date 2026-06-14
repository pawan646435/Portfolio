'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
}

interface GeometricShape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  type: 'triangle' | 'hexagon' | 'circle';
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<GeometricShape[]>([]);
  const prefersReduced = useReducedMotion();

  const initParticles = useCallback(
    (width: number, height: number) => {
      const isMobile = width < 768;
      const count = prefersReduced ? 15 : isMobile ? 35 : 70;

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        baseOpacity: Math.random() * 0.4 + 0.1,
      }));

      const shapeCount = prefersReduced ? 3 : isMobile ? 4 : 8;
      const types: GeometricShape['type'][] = ['triangle', 'hexagon', 'circle'];

      shapesRef.current = Array.from({ length: shapeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        size: Math.random() * 30 + 15,
        opacity: Math.random() * 0.04 + 0.01,
        type: types[Math.floor(Math.random() * types.length)],
      }));
    },
    [prefersReduced]
  );

  const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    opacity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.866, size * 0.5);
    ctx.lineTo(-size * 0.866, size * 0.5);
    ctx.closePath();
    ctx.strokeStyle = `rgba(79, 140, 255, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  };

  const drawHexagon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    opacity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const px = size * Math.cos(angle);
      const py = size * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(79, 140, 255, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  };

  const drawCircleShape = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    opacity: number
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(79, 140, 255, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      initParticles(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const maxConnectionDist = 120;
    const mouseInfluenceRadius = 150;

    const renderFrame = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw mouse light effect
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
        gradient.addColorStop(0, 'rgba(79, 140, 255, 0.03)');
        gradient.addColorStop(1, 'rgba(79, 140, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      const particles = particlesRef.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const mouseDistSq = dmx * dmx + dmy * dmy;
        if (mouseDistSq < mouseInfluenceRadius * mouseInfluenceRadius && mouseDistSq > 0) {
          const mouseDist = Math.sqrt(mouseDistSq);
          const force = (mouseInfluenceRadius - mouseDist) / mouseInfluenceRadius;
          p.vx += (dmx / mouseDist) * force * 0.02;
          p.vy += (dmy / mouseDist) * force * 0.02;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Draw connections (only check forward to avoid duplicates)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectionDist * maxConnectionDist) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxConnectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 140, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update and draw geometric shapes
      for (const shape of shapesRef.current) {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        // Wrap around
        if (shape.x < -50) shape.x = w + 50;
        if (shape.x > w + 50) shape.x = -50;
        if (shape.y < -50) shape.y = h + 50;
        if (shape.y > h + 50) shape.y = -50;

        switch (shape.type) {
          case 'triangle':
            drawTriangle(ctx, shape.x, shape.y, shape.size, shape.rotation, shape.opacity);
            break;
          case 'hexagon':
            drawHexagon(ctx, shape.x, shape.y, shape.size, shape.rotation, shape.opacity);
            break;
          case 'circle':
            drawCircleShape(ctx, shape.x, shape.y, shape.size, shape.opacity);
            break;
        }
      }

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    animationRef.current = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
}
