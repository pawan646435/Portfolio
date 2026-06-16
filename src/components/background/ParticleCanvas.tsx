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
  const scrollYRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<GeometricShape[]>([]);
  const prefersReduced = useReducedMotion();
  
  // OPTIMIZATION: Throttle mouse events to 60Hz max (16.67ms)
  const lastMouseUpdateRef = useRef(0);
  const frameCountRef = useRef(0);
  const avgFrameTimeRef = useRef(16.67);

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

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // OPTIMIZATION: Throttle mouse events to prevent excessive calculations
    const handleMouse = (e: MouseEvent) => {
      const now = performance.now();
      // Only update if 16.67ms has passed (60Hz throttle)
      if (now - lastMouseUpdateRef.current > 16.67) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdateRef.current = now;
      }
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const maxConnectionDist = 120;
    const maxConnectionDistSq = maxConnectionDist * maxConnectionDist;
    const mouseInfluenceRadius = 150;

    const renderFrame = () => {
      const now = performance.now();
      frameCountRef.current++;
      
      // OPTIMIZATION: Monitor frame performance
      if (frameCountRef.current > 0 && frameCountRef.current % 10 === 0) {
        const elapsed = (now - lastMouseUpdateRef.current) / 10;
        avgFrameTimeRef.current = avgFrameTimeRef.current * 0.8 + elapsed * 0.2;
      }
      
      const isSlowFrame = avgFrameTimeRef.current > 18; // > 55fps

      const w = window.innerWidth;
      const h = window.innerHeight;
      const isLowerPage = scrollYRef.current > h * 1.5;

      // Skip all rendering when scrolled past hero area
      if (isLowerPage) {
        animationRef.current = requestAnimationFrame(renderFrame);
        return;
      }

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

        // Mouse repulsion - optimized division/multiplication
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const mouseDistSq = dmx * dmx + dmy * dmy;
        if (mouseDistSq < mouseInfluenceRadius * mouseInfluenceRadius && mouseDistSq > 0) {
          const mouseDist = Math.sqrt(mouseDistSq);
          const force = (mouseInfluenceRadius - mouseDist) / mouseInfluenceRadius;
          const factor = (force * 0.02) / mouseDist;
          p.vx += dmx * factor;
          p.vy += dmy * factor;
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
      }

      // OPTIMIZATION: Batch connection drawing (only when frame rates are stable)
      if (!isSlowFrame) {
        const lowConn: [number, number, number, number][] = [];
        const medConn: [number, number, number, number][] = [];
        const highConn: [number, number, number, number][] = [];

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          let connectionsDrawn = 0;
          
          for (let j = i + 1; j < particles.length && connectionsDrawn < 4; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxConnectionDistSq) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / maxConnectionDist) * 0.12;
              
              if (alpha > 0.08) {
                highConn.push([p.x, p.y, p2.x, p2.y]);
              } else if (alpha > 0.04) {
                medConn.push([p.x, p.y, p2.x, p2.y]);
              } else if (alpha > 0) {
                lowConn.push([p.x, p.y, p2.x, p2.y]);
              }
              connectionsDrawn++;
            }
          }
        }

        // Draw low connections batched
        if (lowConn.length > 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(79, 140, 255, 0.02)';
          ctx.lineWidth = 0.5;
          for (let k = 0; k < lowConn.length; k++) {
            ctx.moveTo(lowConn[k][0], lowConn[k][1]);
            ctx.lineTo(lowConn[k][2], lowConn[k][3]);
          }
          ctx.stroke();
        }

        // Draw medium connections batched
        if (medConn.length > 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(79, 140, 255, 0.05)';
          ctx.lineWidth = 0.5;
          for (let k = 0; k < medConn.length; k++) {
            ctx.moveTo(medConn[k][0], medConn[k][1]);
            ctx.lineTo(medConn[k][2], medConn[k][3]);
          }
          ctx.stroke();
        }

        // Draw high connections batched
        if (highConn.length > 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(79, 140, 255, 0.1)';
          ctx.lineWidth = 0.5;
          for (let k = 0; k < highConn.length; k++) {
            ctx.moveTo(highConn[k][0], highConn[k][1]);
            ctx.lineTo(highConn[k][2], highConn[k][3]);
          }
          ctx.stroke();
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

    // OPTIMIZATION: Pause animation when document is hidden / tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      } else {
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(renderFrame);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
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
