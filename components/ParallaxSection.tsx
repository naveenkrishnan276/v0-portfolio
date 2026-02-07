'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  bgSpeed?: number
  showOrbs?: boolean
}

export default function ParallaxSection({
  children,
  className = '',
  bgSpeed = 0.3,
  showOrbs = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${bgSpeed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`} style={{ position: 'relative' }}>
      {/* Parallax background elements - subtle grey gradients */}
      {showOrbs && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y }}
        >
          <div 
            className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] opacity-[0.03] bg-white"
          />
          <div 
            className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-[0.02] bg-white"
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.02] bg-white"
          />
        </motion.div>
      )}
      
      {/* Content with fade */}
      <motion.div style={{ opacity }} className="relative z-10">
        {children}
      </motion.div>
    </section>
  )
}

// Scroll reveal animation component
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: 80, x: 0 }
      case 'down': return { y: -80, x: 0 }
      case 'left': return { y: 0, x: -80 }
      case 'right': return { y: 0, x: 80 }
    }
  }

  const initial = getInitialTransform()
  const x = useTransform(scrollYProgress, [0, 1], [initial.x, 0])
  const yVal = useTransform(scrollYProgress, [0, 1], [initial.y, 0])
  const opacityVal = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <motion.div
      ref={ref}
      style={{ x, y: yVal, opacity: opacityVal, position: 'relative' }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animation
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
