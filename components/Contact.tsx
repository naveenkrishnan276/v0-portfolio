'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, Send, Phone } from 'lucide-react'
import ParallaxSection from './ParallaxSection'

// API base URL - uses environment variable in production
const API_BASE = 'https://gracious-spirit-production-7500.up.railway.app'

/*
 * ============================================
 * UPDATE YOUR SOCIAL LINKS HERE
 * ============================================
 */
const socialLinks = [
  { id: 1, name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/naveen-krishnan-r-4446952aa/' },
  { id: 2, name: 'GitHub', icon: Github, url: 'https://github.com/naveenkrishnan276' },
  { id: 3, name: 'Email', icon: Mail, url: 'https://mail.google.com/mail/?view=cm&fs=1&to=naveenkrishnan276@gmail.com' },
]

/*
 * ============================================
 * UPDATE YOUR CONTACT INFO HERE
 * ============================================
 */
const contactInfo = [
  {
    id: 1,
    title: 'Email',
    value: 'naveenkrishnan276@gmail.com',
    icon: Mail,
    href: 'mailto:naveenkrishnan276@gmail.com',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 2,
    title: 'Phone',
    value: '+91-9361218299',
    icon: Phone,
    href: 'tel:+919361218299',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 3,
    title: 'LinkedIn',
    value: 'View Profile',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/naveen-krishnan-r-4446952aa/',
    color: 'from-blue-500 to-indigo-500',
  },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    setFieldErrors({})
    
    try {
      const response = await fetch(`${API_BASE}/api/contact/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        const errorData = await response.json()
        setSubmitStatus('error')
        
        // Parse validation errors from FastAPI
        if (errorData.detail && Array.isArray(errorData.detail)) {
          const errors: { name?: string; email?: string; message?: string } = {}
          errorData.detail.forEach((err: { loc: string[]; msg: string }) => {
            const field = err.loc[err.loc.length - 1] as 'name' | 'email' | 'message'
            if (field === 'name' || field === 'email' || field === 'message') {
              errors[field] = err.msg
            }
          })
          setFieldErrors(errors)
          setErrorMessage('Please fix the errors above')
        } else if (typeof errorData.detail === 'string') {
          setErrorMessage(errorData.detail)
        } else {
          setErrorMessage('Failed to send message. Please check your input.')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
      setErrorMessage('Cannot connect to server. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
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

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <a
                key={info.id}
                href={info.href}
                target={info.id === 3 ? '_blank' : undefined}
                rel={info.id === 3 ? 'noopener noreferrer' : undefined}
                className="glass-effect rounded-2xl p-6 border border-transparent hover:border-muted-foreground/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-muted-foreground text-sm">{info.value}</p>
              </a>
            )
          })}
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
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined })
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-input border ${fieldErrors.name ? 'border-red-500' : 'border-border'} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted-foreground/30 focus:border-muted-foreground/50 transition-all`}
                  placeholder="Your name"
                />
                <p className={`text-xs mt-1 ${fieldErrors.name ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {fieldErrors.name || 'Min. 2 characters'}
                </p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined })
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-input border ${fieldErrors.email ? 'border-red-500' : 'border-border'} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted-foreground/30 focus:border-muted-foreground/50 transition-all`}
                  placeholder="your@email.com"
                />
                <p className={`text-xs mt-1 ${fieldErrors.email ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {fieldErrors.email || 'Valid email address'}
                </p>
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
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value })
                  if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined })
                }}
                className={`w-full px-4 py-3 rounded-xl bg-input border ${fieldErrors.message ? 'border-red-500' : 'border-border'} text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-muted-foreground/30 focus:border-muted-foreground/50 transition-all resize-none`}
                placeholder="Your message..."
              />
              <p className={`text-xs mt-1 ${fieldErrors.message ? 'text-red-500' : 'text-muted-foreground'}`}>
                {fieldErrors.message || 'Min. 10 characters, max. 5000 characters'}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="w-5 h-5" />
            </button>
            
            {submitStatus === 'success' && (
              <p className="text-green-500 mt-4">Message sent successfully! I'll get back to you soon.</p>
            )}
            {submitStatus === 'error' && errorMessage && (
              <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
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
