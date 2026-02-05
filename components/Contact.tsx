'use client'

import { useEffect, useRef } from 'react'
import { Mail, Linkedin, Github, Twitter, MapPin } from 'lucide-react'

/*
 * ============================================
 * UPDATE YOUR SOCIAL LINKS HERE
 * ============================================
 * 
 * Change the 'url' for each social link to your actual profile URLs
 */
const socialLinks = [
  {
    id: 1,
    name: 'LinkedIn',
    icon: Linkedin,
    url: '#', // UPDATE: Add your LinkedIn URL
  },
  {
    id: 2,
    name: 'GitHub',
    icon: Github,
    url: '#', // UPDATE: Add your GitHub URL
  },
  {
    id: 3,
    name: 'Twitter',
    icon: Twitter,
    url: '#', // UPDATE: Add your Twitter/X URL
  },
  {
    id: 4,
    name: 'Email',
    icon: Mail,
    url: 'mailto:hello@yourname.com', // UPDATE: Add your email
  },
]

export default function Contact() {
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
    <footer ref={sectionRef} className="py-20 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="reveal-up text-4xl sm:text-5xl font-display font-bold gradient-text mb-6">
            Let&apos;s Connect
          </h2>
          <p className="reveal-up text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            {/* UPDATE: Change your location */}
            San Francisco, CA
          </p>
        </div>

        {/* Social Links */}
        <div className="reveal-up flex justify-center gap-4 mb-16">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl glass-effect hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                aria-label={social.name}
              >
                <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            )
          })}
        </div>

        {/* Footer Bottom */}
        <div className="reveal-up pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {/* UPDATE: Change your name */}
            © {new Date().getFullYear()} Your Name. Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
