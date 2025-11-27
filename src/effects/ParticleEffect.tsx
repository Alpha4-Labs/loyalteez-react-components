'use client';

import { useRef, useEffect, useCallback, forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import type { ParticleEffectProps, Particle, ParticleMotion } from './types';
import { PARTICLE_COLORS } from './types';

// Default configuration
const DEFAULT_COLORS = PARTICLE_COLORS.neon;
const DEFAULT_SIZE_RANGE: [number, number] = [4, 12];

// Physics configuration per motion type
const MOTION_CONFIG: Record<
  ParticleMotion,
  {
    velocityRange: [number, number];
    angleRange: [number, number]; // degrees
    gravity: number;
    friction: number;
    rotationSpeed: number;
  }
> = {
  rise: {
    velocityRange: [2, 5],
    angleRange: [250, 290], // Mostly upward
    gravity: -0.02, // Slight upward drift
    friction: 0.99,
    rotationSpeed: 3,
  },
  fall: {
    velocityRange: [1, 3],
    angleRange: [70, 110], // Downward
    gravity: 0.15,
    friction: 0.995,
    rotationSpeed: 2,
  },
  burst: {
    velocityRange: [5, 15],
    angleRange: [0, 360], // All directions
    gravity: 0.1,
    friction: 0.97,
    rotationSpeed: 8,
  },
  orbit: {
    velocityRange: [2, 4],
    angleRange: [0, 360],
    gravity: 0,
    friction: 1,
    rotationSpeed: 1,
  },
  swirl: {
    velocityRange: [3, 6],
    angleRange: [0, 360],
    gravity: -0.01,
    friction: 0.99,
    rotationSpeed: 5,
  },
  drift: {
    velocityRange: [0.5, 2],
    angleRange: [0, 360],
    gravity: 0,
    friction: 0.998,
    rotationSpeed: 1,
  },
  fountain: {
    velocityRange: [8, 15],
    angleRange: [250, 290], // Upward
    gravity: 0.25,
    friction: 0.99,
    rotationSpeed: 4,
  },
  attract: {
    velocityRange: [3, 8],
    angleRange: [0, 360],
    gravity: 0,
    friction: 0.95,
    rotationSpeed: 2,
  },
};

// Shape renderers
function renderShape(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate((particle.rotation * Math.PI) / 180);
  ctx.globalAlpha = particle.opacity;
  ctx.fillStyle = particle.color;

  const size = particle.size;
  const halfSize = size / 2;

  switch (particle.shape) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'square':
      ctx.fillRect(-halfSize, -halfSize, size, size);
      break;

    case 'star':
      drawStar(ctx, 0, 0, 5, halfSize, halfSize / 2);
      break;

    case 'coin':
      // Gold coin with highlight
      ctx.beginPath();
      ctx.ellipse(0, 0, halfSize, halfSize * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
      ctx.beginPath();
      ctx.ellipse(
        -halfSize * 0.3,
        -halfSize * 0.3,
        halfSize * 0.3,
        halfSize * 0.2,
        0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
      break;

    case 'heart':
      drawHeart(ctx, 0, 0, size);
      break;

    case 'spark':
      // Four-pointed spark
      ctx.beginPath();
      ctx.moveTo(0, -halfSize);
      ctx.lineTo(halfSize * 0.2, -halfSize * 0.2);
      ctx.lineTo(halfSize, 0);
      ctx.lineTo(halfSize * 0.2, halfSize * 0.2);
      ctx.lineTo(0, halfSize);
      ctx.lineTo(-halfSize * 0.2, halfSize * 0.2);
      ctx.lineTo(-halfSize, 0);
      ctx.lineTo(-halfSize * 0.2, -halfSize * 0.2);
      ctx.closePath();
      ctx.fill();
      break;

    case 'ember': {
      // Glowing ember
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(0.5, particle.color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'snow':
      // Snowflake
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -halfSize);
        ctx.moveTo(0, -halfSize * 0.5);
        ctx.lineTo(-halfSize * 0.3, -halfSize * 0.7);
        ctx.moveTo(0, -halfSize * 0.5);
        ctx.lineTo(halfSize * 0.3, -halfSize * 0.7);
        ctx.stroke();
        ctx.restore();
      }
      break;

    case 'confetti':
      // Rectangular confetti
      ctx.fillRect(-halfSize, -halfSize * 0.4, size, size * 0.4);
      break;

    default:
      ctx.beginPath();
      ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
      ctx.fill();
  }

  ctx.restore();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
    rot += step;
  }

  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const topCurveHeight = size * 0.3;
  ctx.beginPath();
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - size / 2, y + size * 0.55, x, y + size * 0.75, x, y + size);
  ctx.bezierCurveTo(
    x,
    y + size * 0.75,
    x + size / 2,
    y + size * 0.55,
    x + size / 2,
    y + topCurveHeight
  );
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.fill();
}

/**
 * A canvas-based particle effect system.
 * Supports various shapes and motion patterns for game-like effects.
 *
 * @example
 * // Coin collect effect
 * <ParticleEffect
 *   active={showParticles}
 *   shape="coin"
 *   motion="rise"
 *   colors={['#FFD700', '#FFA500']}
 *   count={20}
 * />
 *
 * @example
 * // Explosion burst
 * <ParticleEffect
 *   active={explode}
 *   shape="star"
 *   motion="burst"
 *   count={50}
 *   intensity="intense"
 * />
 *
 * @example
 * // Continuous ember particles
 * <ParticleEffect
 *   active
 *   shape="ember"
 *   motion="rise"
 *   continuous
 *   emitRate={10}
 *   colors={['#FF4500', '#FF6B35', '#FFD700']}
 * />
 */
export const ParticleEffect = forwardRef<HTMLDivElement, ParticleEffectProps>(
  (
    {
      active = false,
      shape = 'circle',
      motion = 'burst',
      count = 30,
      colors = DEFAULT_COLORS,
      sizeRange = DEFAULT_SIZE_RANGE,
      lifetime = 2000,
      origin = { x: 0.5, y: 0.5 },
      intensity = 'normal',
      speed = 'normal',
      continuous = false,
      emitRate = 5,
      renderParticle: _renderParticle,
      onComplete,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const lastEmitTimeRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Intensity multiplier
    const intensityMultiplier = useMemo(() => {
      switch (intensity) {
        case 'subtle':
          return 0.5;
        case 'normal':
          return 1;
        case 'intense':
          return 1.5;
        case 'extreme':
          return 2;
        default:
          return 1;
      }
    }, [intensity]);

    // Speed multiplier
    const speedMultiplier = useMemo(() => {
      switch (speed) {
        case 'slow':
          return 0.5;
        case 'normal':
          return 1;
        case 'fast':
          return 1.5;
        case 'instant':
          return 2;
        default:
          return 1;
      }
    }, [speed]);

    // Get motion config
    const motionConfig = MOTION_CONFIG[motion];

    // Create a particle
    const createParticle = useCallback(
      (canvasWidth: number, canvasHeight: number): Particle => {
        const angle =
          (motionConfig.angleRange[0] +
            Math.random() * (motionConfig.angleRange[1] - motionConfig.angleRange[0])) *
          (Math.PI / 180);

        const velocity =
          (motionConfig.velocityRange[0] +
            Math.random() * (motionConfig.velocityRange[1] - motionConfig.velocityRange[0])) *
          intensityMultiplier *
          speedMultiplier;

        const colorIndex = Math.floor(Math.random() * colors.length);
        return {
          id: Math.random(),
          x: canvasWidth * origin.x,
          y: canvasHeight * origin.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
          color: colors[colorIndex] ?? '#00E0FF',
          opacity: 1,
          rotation: Math.random() * 360,
          shape,
          life: 0,
          maxLife: lifetime * (0.8 + Math.random() * 0.4),
          gravity: motionConfig.gravity * intensityMultiplier,
        };
      },
      [
        colors,
        lifetime,
        motionConfig,
        origin,
        shape,
        sizeRange,
        speedMultiplier,
        intensityMultiplier,
      ]
    );

    // Animation loop
    const animate = useCallback(
      (timestamp: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Emit new particles in continuous mode
        if (continuous && particlesRef.current.length < count) {
          const timeSinceLastEmit = timestamp - lastEmitTimeRef.current;
          const emitInterval = 1000 / emitRate;

          if (timeSinceLastEmit >= emitInterval) {
            particlesRef.current.push(createParticle(canvas.width, canvas.height));
            lastEmitTimeRef.current = timestamp;
          }
        }

        // Update and draw particles
        particlesRef.current = particlesRef.current.filter((particle) => {
          // Update life
          particle.life += 16.67; // ~60fps

          // Calculate life ratio
          const lifeRatio = particle.life / particle.maxLife;

          // Apply physics based on motion type
          if (motion === 'orbit') {
            const centerX = canvas.width * origin.x;
            const centerY = canvas.height * origin.y;
            const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
            const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
            const orbitSpeed = 0.02 * speedMultiplier;
            particle.x = centerX + Math.cos(angle + orbitSpeed) * distance;
            particle.y = centerY + Math.sin(angle + orbitSpeed) * distance;
          } else if (motion === 'attract') {
            const centerX = canvas.width * origin.x;
            const centerY = canvas.height * origin.y;
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 10) {
              particle.vx += (dx / distance) * 0.2;
              particle.vy += (dy / distance) * 0.2;
            }
          } else if (motion === 'swirl') {
            const centerX = canvas.width * origin.x;
            const centerY = canvas.height * origin.y;
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            particle.vx += -dy * 0.001 * speedMultiplier;
            particle.vy += dx * 0.001 * speedMultiplier;
          }

          // Apply gravity and friction
          particle.vy += particle.gravity;
          particle.vx *= motionConfig.friction;
          particle.vy *= motionConfig.friction;

          // Update position
          particle.x += particle.vx * speedMultiplier;
          particle.y += particle.vy * speedMultiplier;

          // Update rotation
          particle.rotation += motionConfig.rotationSpeed * speedMultiplier;

          // Fade out
          particle.opacity = 1 - lifeRatio;

          // Draw
          if (particle.opacity > 0.01) {
            renderShape(ctx, particle);
            return true;
          }
          return false;
        });

        // Continue animation
        if (particlesRef.current.length > 0 || continuous) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          onComplete?.();
        }
      },
      [
        continuous,
        count,
        createParticle,
        emitRate,
        motion,
        motionConfig,
        onComplete,
        origin,
        speedMultiplier,
      ]
    );

    // Start effect
    const startEffect = useCallback(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      // Size canvas to container
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Create initial particles (for non-continuous)
      if (!continuous) {
        particlesRef.current = Array.from({ length: count }, () =>
          createParticle(canvas.width, canvas.height)
        );
      }

      // Start animation
      lastEmitTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }, [animate, continuous, count, createParticle]);

    // Handle active state
    useEffect(() => {
      if (active) {
        startEffect();
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        particlesRef.current = [];
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx && canvasRef.current) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [active, startEffect]);

    // Handle resize
    useEffect(() => {
      const handleResize = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (canvas && container && active) {
          const rect = container.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [active]);

    // Combine refs
    const setRefs = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    return (
      <div ref={setRefs} className={cn('relative', className)} style={style} {...props}>
        {children}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
      </div>
    );
  }
);

ParticleEffect.displayName = 'ParticleEffect';

// ============================================
// Convenience Components
// ============================================

export const CoinBurst = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect ref={ref} shape="coin" motion="rise" colors={PARTICLE_COLORS.gold} {...props} />
));
CoinBurst.displayName = 'CoinBurst';

export const StarBurst = forwardRef<HTMLDivElement, Omit<ParticleEffectProps, 'shape' | 'motion'>>(
  (props, ref) => <ParticleEffect ref={ref} shape="star" motion="burst" {...props} />
);
StarBurst.displayName = 'StarBurst';

export const EmberEffect = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="ember"
    motion="rise"
    colors={PARTICLE_COLORS.fire}
    continuous
    {...props}
  />
));
EmberEffect.displayName = 'EmberEffect';

export const SparkleEffect = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion'>
>((props, ref) => <ParticleEffect ref={ref} shape="spark" motion="drift" continuous {...props} />);
SparkleEffect.displayName = 'SparkleEffect';

export const ConfettiBurst = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="confetti"
    motion="fountain"
    colors={PARTICLE_COLORS.confetti}
    count={50}
    {...props}
  />
));
ConfettiBurst.displayName = 'ConfettiBurst';

export const SnowEffect = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="snow"
    motion="fall"
    colors={['#FFFFFF', '#E0FFFF', '#B0E0E6']}
    continuous
    {...props}
  />
));
SnowEffect.displayName = 'SnowEffect';

export const HeartBurst = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="heart"
    motion="fountain"
    colors={['#FF69B4', '#FF1493', '#DB7093', '#FF6B6B']}
    {...props}
  />
));
HeartBurst.displayName = 'HeartBurst';
