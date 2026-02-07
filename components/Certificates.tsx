'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

// API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Certificate type from API
interface CertificateFromAPI {
  id: number
  title: string
  issuer: string
  date_obtained: string | null
  credential_url: string | null
}

// Display certificate type
interface DisplayCertificate {
  id: number
  title: string
  issuer: string
  date: string
  link: string
}

/*
 * ============================================
 * FALLBACK CERTIFICATES DATA (if API unavailable)
 * ============================================
 */
const fallbackCertificates: DisplayCertificate[] = [
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
  cert: DisplayCertificate
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
      <div className="glass-effect rounded-2xl p-6 h-full border border-transparent hover:border-muted-foreground/20 transition-all duration-500">
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
            <Award className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-2">
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
                className="text-muted-foreground hover:text-foreground transition-colors"
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
  const [certificates, setCertificates] = useState<DisplayCertificate[]>(fallbackCertificates)
  
  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await fetch(`${API_BASE}/api/education/certifications/`)
        if (response.ok) {
          const data: CertificateFromAPI[] = await response.json()
          if (data && Array.isArray(data) && data.length > 0) {
            const mapped: DisplayCertificate[] = data.map(cert => ({
              id: cert.id,
              title: cert.title,
              issuer: cert.issuer || 'Unknown Issuer',
              date: cert.date_obtained || '',
              link: cert.credential_url || '#',
            }))
            setCertificates(mapped)
          }
        }
      } catch (error) {
        console.error('Failed to fetch certificates:', error)
      }
    }
    fetchCertificates()
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <ParallaxSection 
      className="py-32 px-4" 
      bgSpeed={0.15}
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
