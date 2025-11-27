'use client';

import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { HTMLAttributes, ReactNode, ReactElement } from 'react';

export type StaggerDirection = 'up' | 'down' | 'left' | 'right' | 'none';
export type AnimationPreset = 'fade' | 'slide' | 'scale' | 'spring' | 'bounce';

export interface AnimatedListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children to animate
   */
  children: ReactNode;

  /**
   * Animation preset
   * @default 'fade'
   */
  preset?: AnimationPreset;

  /**
   * Direction for slide animations
   * @default 'up'
   */
  direction?: StaggerDirection;

  /**
   * Stagger delay between items (seconds)
   * @default 0.05
   */
  staggerDelay?: number;

  /**
   * Initial delay before animation starts (seconds)
   * @default 0
   */
  initialDelay?: number;

  /**
   * Duration for each item animation (seconds)
   * @default 0.3
   */
  duration?: number;

  /**
   * Custom variants (overrides preset)
   */
  variants?: Variants;

  /**
   * Custom transition
   */
  transition?: Transition;

  /**
   * Enable exit animations
   * @default true
   */
  exitAnimation?: boolean;

  /**
   * Animate on every render or only initial mount
   * @default 'mount'
   */
  animateOn?: 'mount' | 'render';

  /**
   * Wrapper element
   * @default 'div'
   */
  as?: 'div' | 'ul' | 'ol' | 'section' | 'nav';
}

// Preset animations
const presetVariants: Record<AnimationPreset, (direction: StaggerDirection) => Variants> = {
  fade: () => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }),
  slide: (direction) => {
    const offsetMap = {
      up: { y: 20 },
      down: { y: -20 },
      left: { x: 20 },
      right: { x: -20 },
      none: {},
    };
    const offset = offsetMap[direction];
    return {
      hidden: { opacity: 0, ...offset },
      visible: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...offset },
    };
  },
  scale: () => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  }),
  spring: (direction) => {
    const offsetMap = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
      none: {},
    };
    const offset = offsetMap[direction];
    return {
      hidden: { opacity: 0, scale: 0.5, ...offset },
      visible: { opacity: 1, scale: 1, x: 0, y: 0 },
      exit: { opacity: 0, scale: 0.5, ...offset },
    };
  },
  bounce: () => ({
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 180 },
  }),
};

// Preset transitions
const presetTransitions: Record<AnimationPreset, Transition> = {
  fade: { duration: 0.3, ease: 'easeOut' },
  slide: { duration: 0.3, ease: 'easeOut' },
  scale: { duration: 0.3, ease: 'easeOut' },
  spring: { type: 'spring', stiffness: 300, damping: 25 },
  bounce: { type: 'spring', stiffness: 400, damping: 15 },
};

/**
 * A generic animated list wrapper that stagger-animates children.
 * Perfect for animating grids, lists, and collections.
 *
 * @example
 * // Basic usage
 * <AnimatedList preset="slide" direction="up">
 *   {items.map(item => <Card key={item.id} />)}
 * </AnimatedList>
 *
 * @example
 * // With stagger delay
 * <AnimatedList preset="spring" staggerDelay={0.1}>
 *   {products.map(p => <ProductCard key={p.id} product={p} />)}
 * </AnimatedList>
 *
 * @example
 * // As a list
 * <AnimatedList as="ul" preset="fade">
 *   {items.map(item => <li key={item.id}>{item.name}</li>)}
 * </AnimatedList>
 */
export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  (
    {
      children,
      preset = 'fade',
      direction = 'up',
      staggerDelay = 0.05,
      initialDelay = 0,
      duration = 0.3,
      variants: customVariants,
      transition: customTransition,
      exitAnimation = true,
      animateOn = 'mount',
      as: Component = 'div',
      className,
      // Destructure event handlers that conflict with framer-motion
      onDrag: _onDrag,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onAnimationStart: _onAnimationStart,
      ...props
    },
    ref
  ) => {
    const variants = customVariants || presetVariants[preset](direction);
    const baseTransition = customTransition || presetTransitions[preset];

    // Container variants for stagger orchestration
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: initialDelay,
        },
      },
      exit: {
        transition: {
          staggerChildren: staggerDelay / 2,
          staggerDirection: -1,
        },
      },
    };

    // Wrap each child with motion
    const animatedChildren = Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;

      const childElement = child as ReactElement;
      const key = childElement.key || index;

      return (
        <motion.div
          key={key}
          variants={variants}
          transition={{
            ...baseTransition,
            duration: typeof baseTransition === 'object' && 'duration' in baseTransition
              ? baseTransition.duration
              : duration,
          }}
        >
          {cloneElement(childElement)}
        </motion.div>
      );
    });

    const MotionComponent = motion[Component] as typeof motion.div;

    return (
      <AnimatePresence mode={exitAnimation ? 'popLayout' : 'sync'}>
        <MotionComponent
          ref={ref}
          className={cn(className)}
          variants={containerVariants}
          initial={animateOn === 'mount' ? 'hidden' : false}
          animate="visible"
          exit={exitAnimation ? 'exit' : undefined}
          {...props}
        >
          {animatedChildren}
        </MotionComponent>
      </AnimatePresence>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';

/**
 * A single animated item - useful when you need individual control.
 */
export interface AnimatedItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  preset?: AnimationPreset;
  direction?: StaggerDirection;
  delay?: number;
  duration?: number;
}

export const AnimatedItem = forwardRef<HTMLDivElement, AnimatedItemProps>(
  (
    {
      children,
      preset = 'fade',
      direction = 'up',
      delay = 0,
      duration = 0.3,
      className,
      // Destructure event handlers that conflict with framer-motion
      onDrag: _onDrag,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onAnimationStart: _onAnimationStart,
      ...props
    },
    ref
  ) => {
    const variants = presetVariants[preset](direction);
    const transition = { ...presetTransitions[preset], delay, duration };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedItem.displayName = 'AnimatedItem';

