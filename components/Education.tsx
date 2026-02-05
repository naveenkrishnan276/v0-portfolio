'use client'

import { useEffect, useRef } from 'react'
import { Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react'

/*
 * ============================================
 * UPDATE YOUR EDUCATION & EXPERIENCE DATA HERE
 * ============================================
 * 
 * Each item needs:
 * - id: unique number
 * - type: 'Education' or 'Work Experience'
 * - title: your degree or job title
 * - institution: school or company name
 * - location: city, state or 'Remote'
 * - startDate: start year
 * - endDate: end year or 'Present'
 */
const education = [
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
    type: 'Work Experience',
    title: 'Software Engineer',
    institution: 'Company Name',
    location: 'Remote',
    startDate: '2023',
    endDate: 'Present',
  },
  {
    id: 3,
    type: 'Work Experience',
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

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed')
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 parallax-section">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="reveal-up text-4xl sm:text-5xl font-display font-bold gradient-text">
            Education & Experience
          </h2>
        </div>

        {/* Timeline with alternating sides */}
        <div className="relative">
          {/* Central pipe/line */}
          <div className="timeline-pipe hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-0">
            {education.map((item, index) => {
              const isLeft = index % 2 === 0
              const Icon = item.type === 'Education' ? GraduationCap : Briefcase

              return (
                <div
                  key={item.id}
                  className={`relative md:flex md:items-center ${
                    isLeft ? 'md:justify-start' : 'md:justify-end'
                  }`}
                  style={{ marginTop: index === 0 ? 0 : undefined }}
                >
                  {/* Timeline node (visible on desktop) */}
                  <div 
                    className="timeline-node hidden md:block"
                    style={{ top: index === 0 ? '2rem' : `${index * 12 + 2}rem` }}
                  />

                  {/* Content card */}
                  <div
                    className={`${isLeft ? 'reveal-left md:pr-16 md:w-1/2' : 'reveal-right md:pl-16 md:w-1/2 md:ml-auto'}`}
                    style={{ 
                      position: 'relative',
                      top: `${index * 12}rem`
                    }}
                  >
                    <div
                      className={`p-6 rounded-2xl transition-all duration-500 border glass-effect hover:shadow-xl ${
                        item.type === 'Education'
                          ? 'hover:border-primary/60 hover:shadow-primary/10'
                          : 'hover:border-secondary/60 hover:shadow-secondary/10'
                      }`}
                    >
                      {/* Icon and Type Badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`p-2 rounded-lg ${
                            item.type === 'Education'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-secondary/20 text-secondary'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.type === 'Education'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-secondary/20 text-secondary'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-bold text-foreground mb-2">
                        {item.title}
                      </h3>

                      {/* Institution */}
                      <p className="font-semibold text-muted-foreground mb-3">
                        {item.institution}
                      </p>

                      {/* Meta info */}
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
                  </div>
                </div>
              )
            })}
          </div>

          {/* Spacer for absolute positioned items */}
          <div className="hidden md:block" style={{ height: `${(education.length - 1) * 12 + 8}rem` }} />
        </div>
      </div>
    </section>
  )
}
