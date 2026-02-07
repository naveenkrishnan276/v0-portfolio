'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Zap, Code, Users, Rocket, Clock, Shield } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

/*
 * ============================================
 * UPDATE YOUR REASONS DATA HERE
 * ============================================
 */
const reasons = [
  {
    id: 1,
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code that stands the test of time.',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Efficient development process without compromising on quality or attention to detail.',
  },
  {
    id: 3,
    icon: Users,
    title: 'Team Player',
    description: 'Excellent communication and collaboration skills to work effectively with any team.',
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Innovation',
    description: 'Always exploring new technologies and approaches to solve complex problems.',
  },
  {
    id: 5,
    icon: Clock,
    title: 'Reliable',
    description: 'Consistent delivery of high-quality work within agreed timelines.',
  },
  {
    id: 6,
    icon: Shield,
    title: 'Best Practices',
    description: 'Designing reliable, data-driven systems with performance and scalability in mind.',
  },
]

function ReasonCard({ 
  reason, 
  index 
}: { 
  reason: typeof reasons[0]
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80 + index * 20, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  const Icon = reason.icon

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group"
    >
      <div className="glass-effect rounded-2xl p-6 h-full border border-transparent hover:border-muted-foreground/20 transition-all duration-500">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center mb-5 group-hover:bg-foreground transition-all duration-300">
          <Icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors duration-300" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {reason.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {reason.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function WhyHireMe() {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <ParallaxSection 
      className="py-32 px-4" 
      bgSpeed={0.2}
    >
      <section ref={ref} className="max-w-6xl mx-auto">
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
            WHY HIRE ME
          </motion.h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.id} reason={reason} index={index} />
          ))}
        </div>
      </section>
    </ParallaxSection>
  )
}
