'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, Send } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

/*
 * ============================================
 * UPDATE YOUR SOCIAL LINKS HERE
 * ============================================
 */
const socialLinks = [
  { id: 1, name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/naveen-krishnan-r-4446952aa' },
  { id: 2, name: 'GitHub', icon: Github, url: 'https://github.com/naveenkrishnan276' },
  
  { id: 3, name: 'Email', icon: Mail, url: 'mailto:naveenkrishnan276@gmail.com' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <ParallaxSection 
      className="py-32 px-4" 
      bgSpeed={0.15}
    >
      <section ref={ref} className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ y }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-foreground"
          >
            CONTACT
          </motion.h2>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-effect rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted-foreground/30 focus:border-muted-foreground/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted-foreground/30 focus:border-muted-foreground/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted-foreground/30 focus:border-muted-foreground/50 transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all"
            >
              Send Message
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center gap-4 mt-12"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-effect border border-transparent hover:border-muted-foreground/20 text-muted-foreground hover:text-foreground transition-all duration-300 hover:-translate-y-1"
                aria-label={social.name}
              >
                <Icon className="w-6 h-6" />
              </a>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            {/* UPDATE: Change your name */}
            © {new Date().getFullYear()} Naveen Krishnan. Built with Next.js & Framer Motion
          </p>
        </motion.div>
      </section>
    </ParallaxSection>
  )
}
