'use client'

import React from "react"

import { useState } from 'react'
import { Mail, Linkedin, Github, Twitter, Send, MapPin, Phone } from 'lucide-react'

const socialLinks = [
  {
    id: 1,
    name: 'LinkedIn',
    icon: Linkedin,
    url: '#',
    color: 'hover:text-blue-500 hover:shadow-lg hover:shadow-blue-500/20',
  },
  {
    id: 2,
    name: 'GitHub',
    icon: Github,
    url: '#',
    color: 'hover:text-primary hover:shadow-lg hover:shadow-primary/20',
  },
  {
    id: 3,
    name: 'Twitter',
    icon: Twitter,
    url: '#',
    color: 'hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20',
  },
  {
    id: 4,
    name: 'Email',
    icon: Mail,
    url: 'mailto:hello@yourname.com',
    color: 'hover:text-secondary hover:shadow-lg hover:shadow-secondary/20',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Let&apos;s Work Together
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-in fade-in slide-in-from-left-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder-muted-foreground"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder-muted-foreground"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-all duration-300 text-foreground placeholder-muted-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Contact Info</h3>

              <a
                href="mailto:hello@yourname.com"
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">hello@yourname.com</p>
                </div>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">+1 (234) 567-890</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:bg-card/80 transition-all duration-300 group ${social.color}`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-semibold text-sm hidden sm:block">{social.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">
            © 2024 Your Name. All rights reserved. Built with React &amp; Next.js
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
