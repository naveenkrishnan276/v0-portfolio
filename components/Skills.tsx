'use client'

import { useEffect, useRef, useState } from 'react'
import { Code2, Database, Server, Palette, Cloud, Terminal } from 'lucide-react'

/*
 * ============================================
 * UPDATE YOUR SKILLS DATA HERE
 * ============================================
 * 
 * Each category needs:
 * - id: unique string identifier
 * - name: category display name
 * - icon: Lucide icon component
 * - skills: array of skill names
 */
const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Palette,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'REST APIs', 'GraphQL'],
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase', 'Firebase'],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    icon: Terminal,
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD', 'Linux'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState('frontend')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed')
              }, i * 100)
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
      <div className="max-w-6xl mx-auto">
        {/* Section Header - No description */}
        <div className="mb-16 text-center">
          <h2 className="reveal-up text-4xl sm:text-5xl font-display font-bold gradient-text">
            Skills & Expertise
          </h2>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Navigation */}
          <div className="reveal-left space-y-3">
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    selectedCategory === category.id
                      ? 'glass-effect border-primary/50 shadow-lg shadow-primary/10'
                      : 'bg-card/50 border border-border hover:border-primary/30'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.skills.length} skills</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Category Skills */}
          <div className="reveal-right">
            {skillCategories
              .filter((cat) => cat.id === selectedCategory)
              .map((category) => (
                <div key={category.id} className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">{category.name}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-4 py-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
