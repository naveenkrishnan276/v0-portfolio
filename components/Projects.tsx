import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Sentiment Analysis Engine',
    description: 'NLP-based sentiment analysis tool processing real-time social media data with 94% accuracy.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Image Classification System',
    description: 'Deep learning model for image recognition with transfer learning, achieving state-of-the-art accuracy.',
    tech: ['PyTorch', 'ResNet', 'FastAPI', 'Next.js'],
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Predictive Analytics Dashboard',
    description: 'Time series forecasting dashboard for financial market predictions using LSTM networks.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Recharts'],
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Recommendation Engine',
    description: 'Collaborative filtering ML model providing personalized recommendations with real-time user analytics.',
    tech: ['Python', 'Scikit-learn', 'FastAPI', 'MongoDB'],
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center scroll-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
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
              className="glass-effect group relative rounded-2xl overflow-hidden hover:border-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 scroll-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Icon Background */}
              <div className="h-32 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="relative z-10 text-primary/60 group-hover:text-primary transition-colors">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM16.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM10 18a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 16.243a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM4 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zM5.757 5.757a1 1 0 000-1.414L5.05 3.636a1 1 0 10-1.414 1.414l.707.707z" />
                  </svg>
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
