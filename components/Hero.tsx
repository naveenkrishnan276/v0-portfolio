import { ArrowRight, Dumbbell, Code } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-4xl mx-auto z-10">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-balance">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Your Name
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-2">
              Full Stack Developer &amp; Fitness Enthusiast
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <div className="group px-6 py-4 rounded-xl bg-card border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-center gap-3 justify-center">
                <Code className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Projects Built</p>
                  <p className="text-2xl font-bold">12+</p>
                </div>
              </div>
            </div>

            <div className="group px-6 py-4 rounded-xl bg-card border border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
              <div className="flex items-center gap-3 justify-center">
                <Dumbbell className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Certifications</p>
                  <p className="text-2xl font-bold">5+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 text-balance">
            I craft high-performance web applications combining modern development practices with clean, scalable architecture. 
            When I&apos;m not coding, you&apos;ll find me hitting the gym or exploring new technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              className="group px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-center justify-center">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>

      {/* Accent elements */}
      <div className="absolute top-1/4 -right-20 w-40 h-40 rounded-full border-2 border-primary/20 opacity-50 animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-40 h-40 rounded-full border-2 border-secondary/20 opacity-50 animate-pulse" />
    </section>
  )
}
