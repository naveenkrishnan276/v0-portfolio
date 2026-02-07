'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import ParallaxSection from './ParallaxSection'

/*
 * ============================================
 * UPDATE YOUR SKILLS DATA HERE
 * ============================================
 */
const skills = [
  { name: 'JAVA', level: 90 },
  { name: 'React / Next.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'CSS', level: 95 },
  { name: 'PostgreSQL', level: 75 },
  { name: 'DSA', level: 80 },
  { name: 'Docker', level: 70 },
]

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-foreground group-hover:text-muted-foreground transition-colors">
          {name}
        </span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-foreground"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
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
          className="text-center mb-20"
          style={{ y }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-foreground"
          >
            SKILLS
          </motion.h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              index={index}
            />
          ))}
        </div>
      </section>
    </ParallaxSection>
  )
}
