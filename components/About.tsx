'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParallaxSection from './ParallaxSection'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <ParallaxSection 
      className="py-32 px-4" 
      bgSpeed={0.2}
    >
      <section ref={ref} className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ y }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading gradient-text"
          >
            ABOUT ME
          </motion.h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-effect rounded-3xl p-8 md:p-12"
        >
          <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
            {/* UPDATE: Change your about description */}
            I am a passionate developer with expertise in building modern web applications. 
            With a strong foundation in both frontend and backend technologies, I create 
            seamless digital experiences that combine elegant design with robust functionality.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {/* UPDATE: Add more about yourself */}
            When I am not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or sharing knowledge with the developer community.
          </p>
        </motion.div>
      </section>
    </ParallaxSection>
  )
}
