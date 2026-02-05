'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  onNavigate: (sectionId: string) => void
  activeSection: string
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', id: 'hero' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNavClick('hero')} className="flex items-center gap-2 group">
          <div className="relative">
            <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all group-hover:shadow-lg group-hover:shadow-primary/30">
              {/* UPDATE: Change "YN" to your initials */}
              YN
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                activeSection === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              <div
                className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transition-transform origin-left ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-sm"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-3 px-4 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/80'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full mt-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
