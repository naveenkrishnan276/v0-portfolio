'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden parallax-section"
    >
      {/* Background gradient orbs */}
      <div className="parallax-bg">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto z-10">
        <div className="text-center">
          {/* Name and Title */}
          <div className="mb-8 reveal-up">
            <p className="text-sm uppercase tracking-widest text-primary mb-4 font-medium">
              {/* UPDATE: Change your greeting */}
              Welcome to my portfolio
            </p>
            <h1 className="text-5xl sm:text-7xl font-display font-bold mb-6 text-balance gradient-text">
              {/* UPDATE: Change "Your Name" to your actual name */}
              Your Name
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              {/* UPDATE: Change your title/role */}
              Full Stack Developer
            </p>
          </div>

          {/* Brief tagline */}
          <p className="reveal-up text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10 text-balance">
            {/* UPDATE: Change your tagline/bio */}
            Building modern web applications with clean code and thoughtful design.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#projects"
              className="group px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="glass-effect px-8 py-4 rounded-lg text-foreground font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              Get in Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="reveal-up flex justify-center gap-4">
            {/* UPDATE: Change href to your actual social links */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg glass-effect text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg glass-effect text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@yourname.com"
              className="p-3 rounded-lg glass-effect text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
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
