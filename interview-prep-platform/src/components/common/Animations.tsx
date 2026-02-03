"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

// Scale up animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

// Stagger container for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// Hover scale animation
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
}

// Tap animation
export const tapScale = {
  scale: 0.98,
}

// Motion div with fade in animation
interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
  ...props
}: FadeInProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Motion div that animates when in view
interface AnimateInViewProps extends HTMLMotionProps<"div"> {
  delay?: number
  once?: boolean
}

export function AnimateInView({
  children,
  delay = 0,
  once = true,
  className,
  ...props
}: AnimateInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger children container
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Stagger item
export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Hover card animation wrapper
interface HoverCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: "lift" | "scale" | "glow"
}

export function HoverCard({
  children,
  hoverEffect = "lift",
  className,
  ...props
}: HoverCardProps) {
  const effects = {
    lift: { y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)" },
    scale: { scale: 1.02 },
    glow: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
  }

  return (
    <motion.div
      whileHover={effects[hoverEffect]}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Pulse animation (for loading or attention)
export function Pulse({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Slide in from side animation
interface SlideInProps extends HTMLMotionProps<"div"> {
  direction?: "left" | "right"
  delay?: number
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className,
  ...props
}: SlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Counter animation for stats
interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  )
}

// Page transition wrapper
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Smooth gradient background animation
export function GradientBackground({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  )
}

// Subtle float animation for cards
export function FloatingElement({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// Shimmer loading effect
export function ShimmerEffect({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent",
        className
      )}
      animate={{ translateX: ["100%", "-100%"] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  )
}

// Success checkmark animation
export function SuccessCheck({ className }: { className?: string }) {
  return (
    <motion.svg
      className={cn("w-16 h-16 text-green-500", className)}
      viewBox="0 0 50 50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.circle
        cx="25"
        cy="25"
        r="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M14 27l7 7 16-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
    </motion.svg>
  )
}

// Typewriter text effect
export function TypewriterText({
  text,
  className,
  speed = 50,
}: {
  text: string
  className?: string
  speed?: number
}) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * (speed / 1000) }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Button with ripple effect
export function RippleButton({
  children,
  className,
  onClick,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
      className={cn("relative overflow-hidden", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Card with 3D tilt effect on hover
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={cn("transform-gpu", className)}
      whileHover={{
        rotateX: 2,
        rotateY: 2,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}

// Animated badge/tag
export function AnimatedBadge({
  children,
  className,
  color = "blue",
}: {
  children: React.ReactNode
  className?: string
  color?: "blue" | "green" | "yellow" | "red"
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <motion.span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colors[color],
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.span>
  )
}

// Skeleton loading with shimmer
export function SkeletonLoader({
  className,
  lines = 3,
}: {
  className?: string
  lines?: number
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-muted rounded relative overflow-hidden"
          style={{ width: `${100 - i * 15}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <ShimmerEffect />
        </motion.div>
      ))}
    </div>
  )
}
