'use client'

import { useState } from 'react'
import { Code2, Database, Palette, Server, Zap, Cloud } from 'lucide-react'

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: Palette,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    icon: Server,
    skills: ['FastAPI', 'Django', 'Node.js', 'Express', 'REST APIs', 'GraphQL'],
  },
  {
    id: 'database',
    name: 'Databases',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase', 'SQL'],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    icon: Cloud,
    skills: ['Docker', 'Git', 'CI/CD', 'Vercel', 'AWS', 'Linux'],
  },
]

const certifications = [
  { id: 1, title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
  { id: 2, title: 'Full Stack Web Developer', issuer: 'freeCodeCamp', year: '2023' },
  { id: 3, title: 'React Advanced Patterns', issuer: 'egghead.io', year: '2023' },
  { id: 4, title: 'Data Structures & Algorithms', issuer: 'Coursera', year: '2022' },
  { id: 5, title: 'Python Professional', issuer: 'DataCamp', year: '2022' },
]

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('frontend')

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and best practices.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Category Navigation */}
          <div className="space-y-4">
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 shadow-lg shadow-primary/20'
                      : 'bg-card border border-border hover:border-primary/30 hover:bg-card/50'
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-br from-primary to-secondary text-background'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.skills.length} skills</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Category Skills */}
          <div className="space-y-4 animate-in fade-in">
            {skillCategories
              .filter((cat) => cat.id === selectedCategory)
              .map((category) => (
                <div key={category.id} className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">{category.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="group px-4 py-3 rounded-lg bg-card border border-primary/20 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 text-center cursor-pointer"
                      >
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-border pt-16">
          <h3 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="group p-4 rounded-xl bg-card border border-secondary/20 hover:border-secondary/60 hover:bg-secondary/5 transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-secondary/50 text-background mb-3 mx-auto group-hover:shadow-lg group-hover:shadow-secondary/30 transition-all">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1 line-clamp-2">{cert.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                <p className="text-xs text-secondary font-semibold">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Hire Me */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Hire Me?
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Quality Code
              </h4>
              <p className="text-sm text-muted-foreground">
                I write clean, maintainable, and well-tested code following industry best practices and design patterns.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Fast Learner
              </h4>
              <p className="text-sm text-muted-foreground">
                Passionate about exploring new technologies and methodologies to stay ahead in the ever-evolving tech landscape.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <Server className="w-5 h-5" />
                Full Stack
              </h4>
              <p className="text-sm text-muted-foreground">
                I can handle projects from database design to production deployment with expertise in both frontend and backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
