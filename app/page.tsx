'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import SplashScreen from '@/components/SplashScreen'
import LaserCursor from '@/components/LaserCursor'

export default function Page() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <LaserCursor />
      
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      <main className="min-h-screen bg-black text-foreground">
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

        {/* Animated blacksmoke background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="blacksmoke"
              style={{
                left: `${(i % 3) * 30 + 20}%`,
                top: `${(i % 4) * 25}%`,
                width: `${150 + i * 50}px`,
                height: `${150 + i * 50}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}
