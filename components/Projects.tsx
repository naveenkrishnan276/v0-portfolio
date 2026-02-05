'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

/*
 * ============================================
 * UPDATE YOUR PROJECTS DATA HERE
 * ============================================
 * 
 * Each project needs:
 * - id: unique number
 * - title: project name
 * - description: brief description (1-2 sentences)
 * - tech: array of technologies used
 * - link: live project URL (or '#' if none)
 * - github: GitHub repo URL (or '#' if none)
 */
const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of your first project and what it does.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of your second project and its features.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A brief description of another project you have built.',
    tech: ['Python', 'FastAPI', 'React', 'MongoDB'],
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Project Four',
    description: 'Description of yet another impressive project.',
    tech: ['Vue.js', 'Firebase', 'Stripe', 'Vercel'],
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
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
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="reveal-up group glass-effect rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Project gradient header */}
              <div className="h-2 bg-gradient-to-r from-primary to-secondary" />

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                  >
                    <span>Source</span>
                    <Github className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
