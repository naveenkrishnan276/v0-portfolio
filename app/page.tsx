'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

export default function Page() {
  const [activeSection, setActiveSection] = useState('hero')

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 text-foreground">
      <Header onNavigate={scrollToSection} activeSection={activeSection} />
      
      <div id="hero" className="scroll-mt-20">
        <Hero />
      </div>

      <div id="projects" className="scroll-mt-20">
        <Projects />
      </div>

      <div id="skills" className="scroll-mt-20">
        <Skills />
      </div>

      <div id="education" className="scroll-mt-20">
        <Education />
      </div>

      <div id="contact" className="scroll-mt-20">
        <Contact />
      </div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl opacity-30" />
      </div>
    </main>
  )
}
