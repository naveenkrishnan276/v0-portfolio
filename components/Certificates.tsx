'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

/*
 * ============================================
 * UPDATE YOUR CERTIFICATES DATA HERE
 * ============================================
 * 
 * Each certificate needs:
 * - id: unique number
 * - title: certificate name
 * - issuer: organization that issued it
 * - date: when you earned it
 * - link: URL to verify (optional, use '#' if none)
 */
const certificates = [
  {
    id: 1,
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    link: '#',
  },
  {
    id: 2,
    title: 'Professional Scrum Master',
    issuer: 'Scrum.org',
    date: '2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Meta Frontend Developer',
    issuer: 'Meta',
    date: '2023',
    link: '#',
  },
  {
    id: 4,
    title: 'Google Cloud Engineer',
    issuer: 'Google',
    date: '2023',
    link: '#',
  },
]

function CertificateCard({ 
  cert, 
  index 
}: { 
  cert: typeof certificates[0]
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group relative"
    >
      <div className="glass-effect rounded-2xl p-6 h-full border border-transparent hover:border-primary/30 transition-all duration-500 card-glow">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(270,100%,65%,0.1)] to-[hsl(330,100%,65%,0.1)]" />
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(270,100%,65%)] to-[hsl(330,100%,65%)] flex items-center justify-center mb-4 group-hover:glow-purple transition-shadow duration-500">
            <Award className="w-6 h-6 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:gradient-text transition-all">
            {cert.title}
          </h3>

          {/* Issuer */}
          <p className="text-muted-foreground mb-4">{cert.issuer}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">{cert.date}</span>
            {cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label={`View ${cert.title} certificate`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certificates() {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <ParallaxSection 
      className="py-32 px-4" 
      bgSpeed={0.15}
      orbColors={['hsl(330, 100%, 65%)', 'hsl(270, 100%, 65%)', 'hsl(200, 100%, 60%)']}
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
            className="section-heading gradient-text"
          >
            CERTIFICATES
          </motion.h2>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </section>
    </ParallaxSection>
  )
}
