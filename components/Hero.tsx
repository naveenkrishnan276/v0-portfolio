'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.03] bg-white" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.02] bg-white" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, scale }}
      >
       

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-normal uppercase tracking-wider leading-none"
        >
          <span className="text-muted-foreground">{"HI, I'M"}</span>
          <br />
          <span className="text-foreground">
            {/* UPDATE: Change "YOUR NAME" to your actual name */}
            NAVEEN
          </span>
        </motion.h1>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {/* UPDATE: Change your description */}
          Building exceptional digital experiences with modern technologies and creative solutions.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all"
          >
            EXPLORE
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
