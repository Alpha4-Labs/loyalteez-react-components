'use client';

import { useRef, useEffect, useCallback, forwardRef, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import type { ParticleEffectProps, Particle, ParticleMotion } from './types';
import { PARTICLE_COLORS } from './types';

// Canvas expansion factor - how much larger the canvas should be than the container
// This allows particles to escape the original bounds
const CANVAS_EXPANSION = 3; // 3x the container size in each direction

// Default configuration
const DEFAULT_COLORS = PARTICLE_COLORS.neon;
const DEFAULT_SIZE_RANGE: [number, number] = [6, 16];

// Physics configuration per motion type - ENHANCED for dramatic effects
const MOTION_CONFIG: Record<
  ParticleMotion,
  {
    velocityRange: [number, number];
    angleRange: [number, number]; // degrees
    gravity: number;
    friction: number;
    rotationSpeed: number;
    spread?: number; // Additional random spread
    scaleOverLife?: boolean; // Shrink over lifetime
    wobble?: number; // Side-to-side wobble
  }
> = {
  rise: {
    velocityRange: [4, 10],
    angleRange: [230, 310], // Wider spread upward
    gravity: -0.08, // Stronger upward drift
    friction: 0.985,
    rotationSpeed: 5,
    spread: 2,
    scaleOverLife: true,
  },
  fall: {
    velocityRange: [2, 5],
    angleRange: [60, 120], // Downward with spread
    gravity: 0.2,
    friction: 0.99,
    rotationSpeed: 3,
    wobble: 0.5,
  },
  burst: {
    velocityRange: [8, 20],
    angleRange: [0, 360], // All directions
    gravity: 0.15,
    friction: 0.96,
    rotationSpeed: 12,
    spread: 3,
    scaleOverLife: true,
  },
  orbit: {
    velocityRange: [3, 6],
    angleRange: [0, 360],
    gravity: 0,
    friction: 1,
    rotationSpeed: 2,
  },
  swirl: {
    velocityRange: [5, 10],
    angleRange: [0, 360],
    gravity: -0.02,
    friction: 0.985,
    rotationSpeed: 8,
    spread: 1.5,
  },
  drift: {
    velocityRange: [1, 3],
    angleRange: [0, 360],
    gravity: 0,
    friction: 0.995,
    rotationSpeed: 2,
    wobble: 1,
  },
  fountain: {
    velocityRange: [12, 22],
    angleRange: [240, 300], // Wider fountain spread
    gravity: 0.35,
    friction: 0.985,
    rotationSpeed: 6,
    spread: 4,
    scaleOverLife: true,
  },
  attract: {
    velocityRange: [5, 12],
    angleRange: [0, 360],
    gravity: 0,
    friction: 0.92,
    rotationSpeed: 4,
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

    case 'star': {
      // Glowing star with gradient
      const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
      starGradient.addColorStop(0, '#FFFFFF');
      starGradient.addColorStop(0.3, particle.color);
      starGradient.addColorStop(1, particle.color);
      ctx.fillStyle = starGradient;
      
      // Add glow effect
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = halfSize * 0.5;
      
      drawStar(ctx, 0, 0, 5, halfSize, halfSize / 2.5);
      ctx.shadowBlur = 0;
      break;
    }

    case 'coin': {
      // Beautiful 3D gold coin with shine and depth
      const coinGradient = ctx.createRadialGradient(
        -halfSize * 0.3, -halfSize * 0.3, 0,
        0, 0, halfSize
      );
      coinGradient.addColorStop(0, '#FFEC8B');
      coinGradient.addColorStop(0.3, '#FFD700');
      coinGradient.addColorStop(0.6, '#DAA520');
      coinGradient.addColorStop(1, '#B8860B');
      
      // Main coin body
      ctx.fillStyle = coinGradient;
      ctx.beginPath();
      ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner ring
      ctx.strokeStyle = '#8B7500';
      ctx.lineWidth = halfSize * 0.15;
      ctx.beginPath();
      ctx.arc(0, 0, halfSize * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      
      // Shine highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(
        -halfSize * 0.35,
        -halfSize * 0.35,
        halfSize * 0.25,
        halfSize * 0.15,
        -0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Dollar sign or star symbol
      ctx.fillStyle = '#8B7500';
      ctx.font = `bold ${halfSize * 0.8}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, halfSize * 0.05);
      break;
    }

    case 'heart':
      drawHeart(ctx, 0, 0, size);
      break;

    case 'spark': {
      // Brilliant four-pointed spark with glow
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = halfSize;
      
      // Outer glow
      const sparkGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
      sparkGradient.addColorStop(0, '#FFFFFF');
      sparkGradient.addColorStop(0.2, particle.color);
      sparkGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = sparkGradient;
      ctx.beginPath();
      ctx.arc(0, 0, halfSize * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner spark shape
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, -halfSize);
      ctx.lineTo(halfSize * 0.12, -halfSize * 0.12);
      ctx.lineTo(halfSize, 0);
      ctx.lineTo(halfSize * 0.12, halfSize * 0.12);
      ctx.lineTo(0, halfSize);
      ctx.lineTo(-halfSize * 0.12, halfSize * 0.12);
      ctx.lineTo(-halfSize, 0);
      ctx.lineTo(-halfSize * 0.12, -halfSize * 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      break;
    }

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
    const isRunningRef = useRef<boolean>(false);
    const effectIdRef = useRef<number>(0);

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

    // Create a particle with enhanced properties
    const createParticle = useCallback(
      (canvasWidth: number, canvasHeight: number): Particle => {
        // Add spread to the angle for more natural distribution
        const spread = motionConfig.spread || 0;
        const baseAngle =
          motionConfig.angleRange[0] +
          Math.random() * (motionConfig.angleRange[1] - motionConfig.angleRange[0]);
        const angle = (baseAngle + (Math.random() - 0.5) * spread * 20) * (Math.PI / 180);

        // Vary velocity more dramatically
        const velocityVariance = 1 + (Math.random() - 0.5) * 0.6;
        const velocity =
          (motionConfig.velocityRange[0] +
            Math.random() * (motionConfig.velocityRange[1] - motionConfig.velocityRange[0])) *
          intensityMultiplier *
          speedMultiplier *
          velocityVariance;

        const colorIndex = Math.floor(Math.random() * colors.length);
        const baseSize = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        
        return {
          id: Math.random(),
          x: canvasWidth * origin.x,
          y: canvasHeight * origin.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: baseSize,
          color: colors[colorIndex] ?? '#00E0FF',
          opacity: 1,
          rotation: Math.random() * 360,
          shape,
          life: 0,
          maxLife: lifetime * (0.7 + Math.random() * 0.6),
          gravity: motionConfig.gravity * intensityMultiplier,
          // Enhanced properties
          initialSize: baseSize,
          wobbleOffset: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.1 + Math.random() * 0.1,
          scaleOverLife: motionConfig.scaleOverLife || false,
          wobble: motionConfig.wobble || 0,
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

    // Animation loop with enhanced effects
    const animate = useCallback(
      (timestamp: number, currentEffectId: number) => {
        // Prevent running if this effect has been superseded
        if (currentEffectId !== effectIdRef.current) return;
        
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

          // Calculate life ratio (eased for smoother fade)
          const lifeRatio = particle.life / particle.maxLife;
          const easedLife = lifeRatio * lifeRatio; // Quadratic ease

          // Apply physics based on motion type
          if (motion === 'orbit') {
            const centerX = canvas.width * origin.x;
            const centerY = canvas.height * origin.y;
            const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
            const distance = Math.hypot(particle.x - centerX, particle.y - centerY);
            const orbitSpeed = 0.03 * speedMultiplier;
            particle.x = centerX + Math.cos(angle + orbitSpeed) * distance;
            particle.y = centerY + Math.sin(angle + orbitSpeed) * distance;
          } else if (motion === 'attract') {
            const centerX = canvas.width * origin.x;
            const centerY = canvas.height * origin.y;
            const dx = centerX - particle.x;
            const dy = centerY - particle.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 10) {
              particle.vx += (dx / distance) * 0.3;
              particle.vy += (dy / distance) * 0.3;
            }
          } else if (motion === 'swirl') {
            const centerX = canvas.width * origin.x;
            const centerY = canvas.height * origin.y;
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            particle.vx += -dy * 0.002 * speedMultiplier;
            particle.vy += dx * 0.002 * speedMultiplier;
          }

          // Apply gravity and friction
          particle.vy += particle.gravity;
          particle.vx *= motionConfig.friction;
          particle.vy *= motionConfig.friction;

          // Apply wobble effect for natural movement
          const wobbleAmount = (particle as any).wobble || 0;
          if (wobbleAmount > 0) {
            const wobbleOffset = (particle as any).wobbleOffset || 0;
            const wobbleSpeed = (particle as any).wobbleSpeed || 0.1;
            particle.x += Math.sin(particle.life * wobbleSpeed + wobbleOffset) * wobbleAmount;
          }

          // Update position
          particle.x += particle.vx * speedMultiplier;
          particle.y += particle.vy * speedMultiplier;

          // Update rotation (faster when moving fast)
          const speed = Math.hypot(particle.vx, particle.vy);
          particle.rotation += motionConfig.rotationSpeed * speedMultiplier * (0.5 + speed * 0.1);

          // Scale over life if enabled
          const scaleOverLife = (particle as any).scaleOverLife;
          const initialSize = (particle as any).initialSize || particle.size;
          if (scaleOverLife) {
            particle.size = initialSize * (1 - easedLife * 0.7);
          }

          // Smooth fade out with easing
          particle.opacity = Math.max(0, 1 - easedLife);

          // Draw particle with trail effect for fast-moving particles
          if (particle.opacity > 0.01) {
            // Draw trail for fast particles
            if (speed > 5 && (shape === 'coin' || shape === 'star' || shape === 'spark')) {
              const trailCount = Math.min(3, Math.floor(speed / 5));
              for (let i = trailCount; i > 0; i--) {
                const trailParticle = {
                  ...particle,
                  x: particle.x - particle.vx * i * 0.3,
                  y: particle.y - particle.vy * i * 0.3,
                  opacity: particle.opacity * (0.3 / i),
                  size: particle.size * (1 - i * 0.15),
                };
                renderShape(ctx, trailParticle);
              }
            }
            
            renderShape(ctx, particle);
            return true;
          }
          return false;
        });

        // Continue animation
        if (particlesRef.current.length > 0 || continuous) {
          animationFrameRef.current = requestAnimationFrame((ts) => animate(ts, currentEffectId));
        } else {
          isRunningRef.current = false;
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
        shape,
        speedMultiplier,
      ]
    );

    // Start effect with proper guards
    const startEffect = useCallback(() => {
      // Prevent multiple simultaneous effects
      if (isRunningRef.current && !continuous) {
        return;
      }
      
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      // Cancel any existing animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Increment effect ID to invalidate any running animations
      effectIdRef.current += 1;
      const currentEffectId = effectIdRef.current;
      isRunningRef.current = true;

      // Get container position and size
      const rect = container.getBoundingClientRect();
      
      // Make canvas larger to allow particles to escape bounds
      const expandedWidth = Math.max(rect.width * CANVAS_EXPANSION, 300);
      const expandedHeight = Math.max(rect.height * CANVAS_EXPANSION, 300);
      
      canvas.width = expandedWidth;
      canvas.height = expandedHeight;
      
      // Store the offset for particle origin calculation
      const offsetX = (expandedWidth - rect.width) / 2;
      const offsetY = (expandedHeight - rect.height) / 2;
      
      // Update origin to account for expanded canvas
      const adjustedOriginX = offsetX + rect.width * origin.x;
      const adjustedOriginY = offsetY + rect.height * origin.y;

      // Clear existing particles
      particlesRef.current = [];

      // Create initial particles (for non-continuous)
      if (!continuous) {
        particlesRef.current = Array.from({ length: count }, () => {
          const particle = createParticle(expandedWidth, expandedHeight);
          // Adjust particle starting position to center of original container
          particle.x = adjustedOriginX;
          particle.y = adjustedOriginY;
          return particle;
        });
      }

      // Start animation with the current effect ID
      lastEmitTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame((ts) => animate(ts, currentEffectId));
    }, [animate, continuous, count, createParticle, origin]);

    // Handle active state with proper cleanup to prevent double-firing
    useEffect(() => {
      if (active) {
        // Use a small delay to ensure the container is fully rendered
        const timeoutId = setTimeout(() => {
          startEffect();
        }, 10);
        
        return () => {
          clearTimeout(timeoutId);
          isRunningRef.current = false;
          effectIdRef.current += 1;
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        };
      } else {
        // Stop any running effect
        isRunningRef.current = false;
        effectIdRef.current += 1;
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
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
          animationFrameRef.current = null;
        }
      };
    }, [active, startEffect]);

    // Track container position for portal
    const [canvasPosition, setCanvasPosition] = useState<{
      top: number;
      left: number;
      width: number;
      height: number;
    } | null>(null);

    // Update canvas position when active
    useEffect(() => {
      if (!active || !containerRef.current) {
        setCanvasPosition(null);
        return;
      }

      const updatePosition = () => {
        const container = containerRef.current;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const expandedWidth = rect.width * CANVAS_EXPANSION;
        const expandedHeight = rect.height * CANVAS_EXPANSION;
        const offsetX = (expandedWidth - rect.width) / 2;
        const offsetY = (expandedHeight - rect.height) / 2;
        
        setCanvasPosition({
          top: rect.top + window.scrollY - offsetY,
          left: rect.left + window.scrollX - offsetX,
          width: expandedWidth,
          height: expandedHeight,
        });
      };

      updatePosition();
      
      // Update position on scroll/resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [active]);

    // Check if we can use portal (client-side only)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    // Combine refs
    const setRefs = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Render canvas via portal to escape overflow:hidden containers
    const canvasElement = active && mounted && canvasPosition && (
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: canvasPosition.top - window.scrollY,
          left: canvasPosition.left - window.scrollX,
          width: canvasPosition.width,
          height: canvasPosition.height,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        aria-hidden="true"
      />
    );

    return (
      <div ref={setRefs} className={cn('relative', className)} style={style} {...props}>
        {children}
        {mounted && canvasElement && createPortal(canvasElement, document.body)}
      </div>
    );
  }
);

ParticleEffect.displayName = 'ParticleEffect';

// ============================================
// Convenience Components
// ============================================

// ============================================
// Enhanced Convenience Components
// ============================================

export const CoinBurst = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="coin"
    motion="fountain"
    colors={PARTICLE_COLORS.gold}
    count={25}
    intensity="intense"
    sizeRange={[12, 24]}
    lifetime={1800}
    {...props}
  />
));
CoinBurst.displayName = 'CoinBurst';

export const CoinRain = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="coin"
    motion="fall"
    colors={PARTICLE_COLORS.gold}
    count={30}
    intensity="normal"
    sizeRange={[10, 20]}
    lifetime={2500}
    origin={{ x: 0.5, y: 0.1 }}
    {...props}
  />
));
CoinRain.displayName = 'CoinRain';

export const StarBurst = forwardRef<HTMLDivElement, Omit<ParticleEffectProps, 'shape' | 'motion'>>(
  (props, ref) => (
    <ParticleEffect
      ref={ref}
      shape="star"
      motion="burst"
      colors={['#FFD700', '#00FFFF', '#FF69B4', '#FFFFFF', '#7B68EE']}
      count={40}
      intensity="intense"
      sizeRange={[8, 18]}
      lifetime={1500}
      {...props}
    />
  )
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
    emitRate={8}
    sizeRange={[4, 12]}
    {...props}
  />
));
EmberEffect.displayName = 'EmberEffect';

export const SparkleEffect = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="spark"
    motion="drift"
    continuous
    emitRate={6}
    colors={['#FFFFFF', '#FFD700', '#00FFFF', '#FF69B4']}
    sizeRange={[6, 14]}
    {...props}
  />
));
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
    count={60}
    intensity="intense"
    sizeRange={[8, 16]}
    lifetime={2500}
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
    emitRate={10}
    sizeRange={[6, 14]}
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
    count={35}
    intensity="intense"
    sizeRange={[10, 20]}
    lifetime={2000}
    {...props}
  />
));
HeartBurst.displayName = 'HeartBurst';

// New celebration effect
export const CelebrationBurst = forwardRef<
  HTMLDivElement,
  Omit<ParticleEffectProps, 'shape' | 'motion' | 'colors'>
>((props, ref) => (
  <ParticleEffect
    ref={ref}
    shape="star"
    motion="burst"
    colors={['#FFD700', '#FF6B6B', '#00FF88', '#00BFFF', '#FF69B4', '#FFFFFF']}
    count={50}
    intensity="extreme"
    sizeRange={[10, 22]}
    lifetime={2000}
    {...props}
  />
));
CelebrationBurst.displayName = 'CelebrationBurst';
