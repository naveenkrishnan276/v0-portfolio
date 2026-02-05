import { ArrowRight, Brain, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto z-10">
        <div className="text-center mb-12 scroll-fade-in">
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-balance gradient-text">
              Your Name
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-2">
              ML Engineer &amp; Full Stack Developer
            </p>
          </div>

          {/* Stats with glass effect */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <div className="glass-effect group px-6 py-4 rounded-xl hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 justify-center">
                <Brain className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">ML Models</p>
                  <p className="text-2xl font-bold">8+</p>
                </div>
              </div>
            </div>

            <div className="glass-effect group px-6 py-4 rounded-xl hover:border-secondary/50 transition-all duration-300">
              <div className="flex items-center gap-3 justify-center">
                <Zap className="w-5 h-5 text-secondary" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold">15+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 text-balance">
            Building intelligent systems and scalable applications using machine learning and modern web technologies. 
            Passionate about transforming data into insights and creating intuitive user experiences through full-stack development.
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
              className="glass-effect px-8 py-4 rounded-lg text-primary font-semibold transition-all duration-300 hover:-translate-y-1"
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
    </section>
  )
}
