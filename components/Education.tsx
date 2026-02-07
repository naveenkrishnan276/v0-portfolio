'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

// API base URL - change this when deploying
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Education type from API
interface EducationItem {
  id: number
  title: string
  institution: string
  location: string | null
  start_date: string | null
  end_date: string | null
  description: string | null
  education_type: string
  order: number
}

// Normalized education item for display
interface DisplayEducation {
  id: number
  type: 'Education' | 'Work'
  title: string
  institution: string
  location: string
  startDate: string
  endDate: string
}

// Fallback data if API is unavailable
const fallbackEducation: DisplayEducation[] = [
  {
    id: 1,
    type: 'Education',
    title: 'Bachelor of Computer Science',
    institution: 'University Name',
    location: 'City, State',
    startDate: '2019',
    endDate: '2023',
  },
  {
    id: 2,
    type: 'Work',
    title: 'Software Engineer',
    institution: 'Company Name',
    location: 'Remote',
    startDate: '2023',
    endDate: 'Present',
  },
  {
    id: 3,
    type: 'Work',
    title: 'Junior Developer',
    institution: 'Previous Company',
    location: 'City, State',
    startDate: '2022',
    endDate: '2023',
  },
  {
    id: 4,
    type: 'Education',
    title: 'Professional Certificate',
    institution: 'Online Platform',
    location: 'Online',
    startDate: '2023',
    endDate: '2024',
  },
]

function TimelineItem({ 
  item, 
  index,
  isLeft
}: { 
  item: DisplayEducation
  index: number
  isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [isLeft ? -80 : 80, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  const Icon = item.type === 'Education' ? GraduationCap : Briefcase

  return (
    <div className={`relative flex items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      {/* Timeline node */}
      <div className="timeline-node hidden md:block" style={{ top: '50%', transform: 'translate(-50%, -50%)' }} />

      {/* Card */}
      <motion.div
        ref={ref}
        style={{ x, opacity }}
        className={`w-full md:w-[45%] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
      >
        <div className="glass-effect rounded-2xl p-6 border border-transparent hover:border-muted-foreground/20 transition-all duration-500">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-muted/30 text-foreground">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {item.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {item.title}
          </h3>

          {/* Institution */}
          <p className="text-muted-foreground mb-4">{item.institution}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {item.startDate} - {item.endDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {item.location}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Education() {
  const ref = useRef<HTMLElement>(null)
  const [education, setEducation] = useState<DisplayEducation[]>(fallbackEducation)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    async function fetchEducation() {
      try {
        const url = `${API_BASE}/api/education`
        console.log('[v0] Fetching education from:', url)
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('[v0] Education response status:', response.status)
        if (response.ok) {
          const data: EducationItem[] = await response.json()
          console.log('[v0] Education data received:', data)
          if (data.length > 0) {
            setEducation(data.map(e => ({
              id: e.id,
              type: e.education_type === 'work_experience' ? 'Work' : 'Education',
              title: e.title,
              institution: e.institution,
              location: e.location || '',
              startDate: e.start_date || '',
              endDate: e.end_date || 'Present',
            })))
          }
        } else {
          console.log('[v0] Education API error response')
        }
      } catch (error) {
        console.log('[v0] Education fetch error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEducation()
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
            EDUCATION
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="timeline-pipe hidden md:block" />

          {/* Items */}
          <div className="space-y-8 md:space-y-12">
            {education.map((item, index) => (
              <TimelineItem 
                key={item.id} 
                item={item} 
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </ParallaxSection>
  )
}
