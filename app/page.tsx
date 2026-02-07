'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import WhyHireMe from '@/components/WhyHireMe'
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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'certificates', 'whyhireme', 'education', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <LaserCursor />
      
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <Header onNavigate={scrollToSection} activeSection={activeSection} />
        
        <div id="hero">
          <Hero />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="certificates">
          <Certificates />
        </div>

        <div id="whyhireme">
          <WhyHireMe />
        </div>

        <div id="education">
          <Education />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>
    </>
  )
}
