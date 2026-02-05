import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'AI Fitness Tracker',
    description: 'Real-time workout tracking with AI-powered form analysis using computer vision.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'OpenCV'],
    image: 'bg-gradient-to-br from-primary to-primary/50',
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Code Collaboration Hub',
    description: 'Real-time collaborative code editor with live syntax highlighting and pair programming features.',
    tech: ['Next.js', 'WebSockets', 'TypeScript', 'Tailwind'],
    image: 'bg-gradient-to-br from-secondary to-secondary/50',
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Workout Social Network',
    description: 'Social platform for fitness enthusiasts to share routines, progress, and connect with others.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'bg-gradient-to-br from-primary via-secondary to-primary',
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'DevDash Analytics',
    description: 'Advanced analytics dashboard for tracking development metrics and team productivity.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Recharts'],
    image: 'bg-gradient-to-br from-secondary via-primary to-secondary',
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my best work combining cutting-edge technology with clean, scalable architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image/Background */}
              <div className={`h-48 ${project.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white/50">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM16.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 16.243a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM4 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 5.757a1 1 0 000-1.414L5.05 3.636a1 1 0 10-1.414 1.414l.707.707z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30 hover:border-primary/60 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors group/link"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors group/link"
                  >
                    <span>Code</span>
                    <Github className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

import { ArrowRight } from 'lucide-react'
