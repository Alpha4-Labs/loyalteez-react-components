'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { ConfettiExplosionProps, ConfettiParticle } from './types';
import { DEFAULT_COLORS } from './types';

/**
 * A canvas-based confetti explosion component for celebrations.
 *
 * @example
 * // Basic usage
 * <ConfettiExplosion active={showConfetti} />
 *
 * @example
 * // Custom configuration
 * <ConfettiExplosion
 *   active={showConfetti}
 *   particleCount={150}
 *   colors={['#FF0000', '#00FF00', '#0000FF']}
 *   origin={{ x: 0.5, y: 0.3 }}
 *   onComplete={() => setShowConfetti(false)}
 * />
 *
 * @example
 * // Triggered from a button
 * const [active, setActive] = useState(false);
 * <button onClick={() => setActive(true)}>Celebrate!</button>
 * <ConfettiExplosion
 *   active={active}
 *   onComplete={() => setActive(false)}
 * />
 */
export function ConfettiExplosion({
  active,
  particleCount = 100,
  origin = { x: 0.5, y: 0.5 },
  colors = DEFAULT_COLORS,
  duration = 3000,
  spread = 360,
  velocity = 25,
  gravity = 0.5,
  sizeRange = [5, 15],
  zIndex = 9999,
  onComplete,
}: ConfettiExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Create a single particle
  const createParticle = useCallback(
    (canvasWidth: number, canvasHeight: number): ConfettiParticle => {
      const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180);
      const speed = velocity * (0.5 + Math.random() * 0.5);

      const shapes: Array<'square' | 'circle' | 'ribbon'> = ['square', 'circle', 'ribbon'];

      const colorIndex = Math.floor(Math.random() * colors.length);
      const shapeIndex = Math.floor(Math.random() * shapes.length);

      return {
        x: canvasWidth * origin.x,
        y: canvasHeight * origin.y,
        vx: Math.cos(angle - Math.PI / 2) * speed,
        vy: Math.sin(angle - Math.PI / 2) * speed,
        color: colors[colorIndex] ?? '#00E0FF',
        size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: shapes[shapeIndex] ?? 'square',
        opacity: 1,
        gravity: gravity * (0.8 + Math.random() * 0.4),
      };
    },
    [colors, gravity, origin, sizeRange, spread, velocity]
  );

  // Draw a particle
  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: ConfettiParticle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;

    switch (particle.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'ribbon':
        ctx.fillRect(-particle.size / 4, -particle.size, particle.size / 2, particle.size * 2);
        break;
      case 'square':
      default:
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        break;
    }

    ctx.restore();
  }, []);

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update physics
        particle.vy += particle.gravity;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.vx *= 0.99; // Air resistance
        particle.opacity = 1 - progress * progress; // Fade out

        // Draw
        if (particle.opacity > 0.01 && particle.y < canvas.height + 50) {
          drawParticle(ctx, particle);
          return true;
        }
        return false;
      });

      // Continue animation
      if (progress < 1 && particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Cleanup
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }
    },
    [duration, drawParticle, onComplete]
  );

  // Start explosion
  const startExplosion = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas.width, canvas.height)
    );

    // Start animation
    startTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [particleCount, createParticle, animate]);

  // Handle active state changes
  useEffect(() => {
    if (active) {
      startExplosion();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, startExplosion]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && active) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex }}
      aria-hidden="true"
    />
  );
}
