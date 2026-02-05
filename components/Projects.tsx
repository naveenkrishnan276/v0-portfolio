'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

/*
 * ============================================
 * UPDATE YOUR PROJECTS DATA HERE
 * ============================================
 */
const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A modern web application showcasing innovative design and seamless user experience.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Full-stack solution with robust backend architecture and real-time features.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'AI-powered platform delivering intelligent insights and automation.',
    tech: ['Python', 'FastAPI', 'React', 'MongoDB'],
    link: '#',
    github: '#',
  },
]

function ProjectCard({ 
  project, 
  index 
}: { 
  project: typeof projects[0]
  index: number 
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.5, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="group"
    >
      <div className="glass-effect rounded-3xl overflow-hidden border border-transparent hover:border-muted-foreground/20 transition-all duration-500">
        {/* Top bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />

        {/* Content */}
        <div className="p-8 md:p-10 relative">
          {/* Project number */}
          <span className="text-6xl font-display font-normal text-muted/10 absolute top-4 right-6">
            0{project.id}
          </span>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-display font-normal uppercase tracking-wider text-foreground mb-4">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm rounded-full bg-muted/20 text-foreground border border-border hover:border-muted-foreground/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href={project.link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all"
            >
              Live Project
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={project.github}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:border-muted-foreground/50 transition-all"
            >
              Source
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <ParallaxSection 
      className="py-32 px-4" 
      bgSpeed={0.25}
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
            PROJECTS
          </motion.h2>
        </motion.div>

        {/* Projects Stack */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </ParallaxSection>
  )
}
