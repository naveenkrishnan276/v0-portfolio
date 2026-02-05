'use client'

import { useEffect, useRef } from 'react'

/*
 * ============================================
 * UPDATE YOUR TECH/TOOLS SLIDER DATA HERE
 * ============================================
 * 
 * Add or remove technologies you want to showcase
 * These will scroll infinitely across the screen
 */
const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Docker',
  'AWS',
  'Git',
  'Vercel',
  'GraphQL',
  'Redis',
  'Prisma',
]

export default function TechSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sliderRef.current) {
      observer.observe(sliderRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Double the array for seamless infinite scroll
  const duplicatedTech = [...technologies, ...technologies]

  return (
    <section className="py-16 overflow-hidden border-y border-border bg-card/30">
      <div ref={sliderRef} className="reveal-up">
        {/* First row - left to right */}
        <div className="flex mb-4 overflow-hidden">
          <div className="slider-track">
            {duplicatedTech.map((tech, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 px-6 py-3 rounded-lg glass-effect hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - right to left */}
        <div className="flex overflow-hidden">
          <div className="slider-track" style={{ animationDirection: 'reverse' }}>
            {duplicatedTech.map((tech, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 px-6 py-3 rounded-lg glass-effect hover:border-secondary/50 transition-all duration-300"
              >
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
