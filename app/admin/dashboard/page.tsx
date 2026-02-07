'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, LogOut, FolderOpen, Code, GraduationCap, Award, Mail, RefreshCw } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type Tab = 'projects' | 'skills' | 'education' | 'certificates' | 'messages'

interface Project {
  id: number
  title: string
  description: string
  technologies: string | null
  link: string | null
  github_link: string | null
  order: number
}

interface Skill {
  id: number
  name: string
  category: string
  level: string | null
}

interface Education {
  id: number
  title: string
  institution: string
  location: string | null
  start_date: string | null
  end_date: string | null
  education_type: string | null
}

interface Certificate {
  id: number
  title: string
  issuer: string
  date_obtained: string | null
  credential_url: string | null
}

interface Message {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  // Data states
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  // Form states
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (!storedToken) {
      router.push('/admin')
      return
    }

    // Verify token
    fetch(`${API_BASE}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then(res => {
        if (!res.ok) {
          localStorage.removeItem('adminToken')
          router.push('/admin')
        } else {
          setToken(storedToken)
          setLoading(false)
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken')
        router.push('/admin')
      })
  }, [router])

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token, activeTab])

  const fetchData = async () => {
    if (!token) return
    setRefreshing(true)

    const headers = { Authorization: `Bearer ${token}` }

    try {
      switch (activeTab) {
        case 'projects':
          const projRes = await fetch(`${API_BASE}/api/admin/projects`, { headers })
          if (projRes.ok) setProjects(await projRes.json())
          break
        case 'skills':
          const skillRes = await fetch(`${API_BASE}/api/admin/skills`, { headers })
          if (skillRes.ok) setSkills(await skillRes.json())
          break
        case 'education':
          const eduRes = await fetch(`${API_BASE}/api/admin/education`, { headers })
          if (eduRes.ok) setEducation(await eduRes.json())
          break
        case 'certificates':
          const certRes = await fetch(`${API_BASE}/api/admin/certifications`, { headers })
          if (certRes.ok) setCertificates(await certRes.json())
          break
        case 'messages':
          const msgRes = await fetch(`${API_BASE}/api/admin/messages`, { headers })
          if (msgRes.ok) setMessages(await msgRes.json())
          break
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  const deleteItem = async (endpoint: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const res = await fetch(`${API_BASE}/api/admin/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const tabs = [
    { id: 'projects' as Tab, label: 'Projects', icon: FolderOpen },
    { id: 'skills' as Tab, label: 'Skills', icon: Code },
    { id: 'education' as Tab, label: 'Education', icon: GraduationCap },
    { id: 'certificates' as Tab, label: 'Certificates', icon: Award },
    { id: 'messages' as Tab, label: 'Messages', icon: Mail },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center cursor-visible">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 cursor-visible">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-zinc-400 hover:text-white text-sm">
              View Site →
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
          <div className="flex gap-2">
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {activeTab !== 'messages' && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {activeTab === 'projects' && (
            <ProjectsTable projects={projects} onDelete={(id) => deleteItem('projects', id)} />
          )}
          {activeTab === 'skills' && (
            <SkillsTable skills={skills} onDelete={(id) => deleteItem('skills', id)} />
          )}
          {activeTab === 'education' && (
            <EducationTable education={education} onDelete={(id) => deleteItem('education', id)} />
          )}
          {activeTab === 'certificates' && (
            <CertificatesTable certificates={certificates} onDelete={(id) => deleteItem('certifications', id)} />
          )}
          {activeTab === 'messages' && (
            <MessagesTable messages={messages} onDelete={(id) => deleteItem('messages', id)} />
          )}
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <AddFormModal
            type={activeTab}
            token={token!}
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false)
              fetchData()
            }}
          />
        )}
      </div>
    </div>
  )
}

// Table Components
function ProjectsTable({ projects, onDelete }: { projects: Project[]; onDelete: (id: number) => void }) {
  if (projects.length === 0) {
    return <EmptyState message="No projects yet" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-zinc-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Technologies</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Links</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-zinc-800/50">
              <td className="px-6 py-4">
                <div className="text-white font-medium">{project.title}</div>
                <div className="text-zinc-500 text-sm truncate max-w-xs">{project.description}</div>
              </td>
              <td className="px-6 py-4 text-zinc-400 text-sm">{project.technologies || '-'}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {project.link && <a href={project.link} target="_blank" className="text-blue-400 text-sm hover:underline">Live</a>}
                  {project.github_link && <a href={project.github_link} target="_blank" className="text-blue-400 text-sm hover:underline">GitHub</a>}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => onDelete(project.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SkillsTable({ skills, onDelete }: { skills: Skill[]; onDelete: (id: number) => void }) {
  if (skills.length === 0) {
    return <EmptyState message="No skills yet" />
  }

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="p-6 space-y-6">
      {Object.entries(grouped).map(([category, categorySkills]) => (
        <div key={category}>
          <h3 className="text-zinc-400 text-sm uppercase mb-3">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg">
                <span className="text-white">{skill.name}</span>
                <button onClick={() => onDelete(skill.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EducationTable({ education, onDelete }: { education: Education[]; onDelete: (id: number) => void }) {
  if (education.length === 0) {
    return <EmptyState message="No education entries yet" />
  }

  return (
    <div className="divide-y divide-zinc-800">
      {education.map((edu) => (
        <div key={edu.id} className="p-6 flex items-start justify-between hover:bg-zinc-800/50">
          <div>
            <div className="text-white font-medium">{edu.title}</div>
            <div className="text-zinc-400">{edu.institution}</div>
            <div className="text-zinc-500 text-sm">
              {edu.start_date} - {edu.end_date || 'Present'}
              {edu.location && ` • ${edu.location}`}
            </div>
          </div>
          <button onClick={() => onDelete(edu.id)} className="text-red-400 hover:text-red-300">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

function CertificatesTable({ certificates, onDelete }: { certificates: Certificate[]; onDelete: (id: number) => void }) {
  if (certificates.length === 0) {
    return <EmptyState message="No certificates yet" />
  }

  return (
    <div className="divide-y divide-zinc-800">
      {certificates.map((cert) => (
        <div key={cert.id} className="p-6 flex items-start justify-between hover:bg-zinc-800/50">
          <div>
            <div className="text-white font-medium">{cert.title}</div>
            <div className="text-zinc-400">{cert.issuer}</div>
            <div className="text-zinc-500 text-sm">{cert.date_obtained || ''}</div>
          </div>
          <button onClick={() => onDelete(cert.id)} className="text-red-400 hover:text-red-300">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

function MessagesTable({ messages, onDelete }: { messages: Message[]; onDelete: (id: number) => void }) {
  if (messages.length === 0) {
    return <EmptyState message="No messages yet" />
  }

  return (
    <div className="divide-y divide-zinc-800">
      {messages.map((msg) => (
        <div key={msg.id} className="p-6 hover:bg-zinc-800/50">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-white font-medium">{msg.name}</span>
              <span className="text-zinc-500 ml-2">{msg.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 text-sm">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
              <button onClick={() => onDelete(msg.id)} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-zinc-300">{msg.message}</p>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-12 text-center">
      <p className="text-zinc-500">{message}</p>
    </div>
  )
}

// Add Form Modal
function AddFormModal({
  type,
  token,
  onClose,
  onSuccess,
}: {
  type: Tab
  token: string
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form fields
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    let endpoint = ''
    let body: Record<string, string | number | null> = {}

    switch (type) {
      case 'projects':
        endpoint = '/api/admin/projects'
        body = {
          title: formData.title || '',
          description: formData.description || '',
          technologies: formData.technologies || null,
          link: formData.link || null,
          github_link: formData.github_link || null,
          order: parseInt(formData.order || '0'),
        }
        break
      case 'skills':
        endpoint = '/api/admin/skills'
        body = {
          name: formData.name || '',
          category: formData.category || '',
          level: formData.level || null,
        }
        break
      case 'education':
        endpoint = '/api/admin/education'
        body = {
          title: formData.title || '',
          institution: formData.institution || '',
          location: formData.location || null,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          education_type: formData.education_type || 'education',
        }
        break
      case 'certificates':
        endpoint = '/api/admin/certifications'
        body = {
          title: formData.title || '',
          issuer: formData.issuer || '',
          date_obtained: formData.date_obtained || null,
          credential_url: formData.credential_url || null,
        }
        break
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const data = await res.json()
        // Handle validation errors which come as an array of objects
        if (Array.isArray(data.detail)) {
          const messages = data.detail.map((err: { msg?: string; loc?: string[] }) => 
            err.msg || 'Validation error'
          ).join(', ')
          setError(messages)
        } else if (typeof data.detail === 'string') {
          setError(data.detail)
        } else {
          setError('Failed to add item')
        }
      }
    } catch (err) {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Add New {type.slice(0, -1)}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'projects' && (
            <>
              <FormField label="Title" value={formData.title || ''} onChange={(v) => updateField('title', v)} required />
              <FormField label="Description" value={formData.description || ''} onChange={(v) => updateField('description', v)} required multiline />
              <FormField label="Technologies" value={formData.technologies || ''} onChange={(v) => updateField('technologies', v)} placeholder="React, Node.js, etc." />
              <FormField label="Live URL" value={formData.link || ''} onChange={(v) => updateField('link', v)} />
              <FormField label="GitHub URL" value={formData.github_link || ''} onChange={(v) => updateField('github_link', v)} />
            </>
          )}

          {type === 'skills' && (
            <>
              <FormField label="Skill Name" value={formData.name || ''} onChange={(v) => updateField('name', v)} required />
              <FormField label="Category" value={formData.category || ''} onChange={(v) => updateField('category', v)} required placeholder="Frontend, Backend, Database, etc." />
              <FormField label="Level" value={formData.level || ''} onChange={(v) => updateField('level', v)} placeholder="Beginner, Intermediate, Advanced" />
            </>
          )}

          {type === 'education' && (
            <>
              <FormField label="Title/Degree" value={formData.title || ''} onChange={(v) => updateField('title', v)} required />
              <FormField label="Institution" value={formData.institution || ''} onChange={(v) => updateField('institution', v)} required />
              <FormField label="Location" value={formData.location || ''} onChange={(v) => updateField('location', v)} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Start Date" value={formData.start_date || ''} onChange={(v) => updateField('start_date', v)} placeholder="2020" />
                <FormField label="End Date" value={formData.end_date || ''} onChange={(v) => updateField('end_date', v)} placeholder="2024 or Present" />
              </div>
            </>
          )}

          {type === 'certificates' && (
            <>
              <FormField label="Certificate Title" value={formData.title || ''} onChange={(v) => updateField('title', v)} required />
              <FormField label="Issuer" value={formData.issuer || ''} onChange={(v) => updateField('issuer', v)} required />
              <FormField label="Date Obtained" value={formData.date_obtained || ''} onChange={(v) => updateField('date_obtained', v)} placeholder="2024" />
              <FormField label="Credential URL" value={formData.credential_url || ''} onChange={(v) => updateField('credential_url', v)} />
            </>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  required = false,
  multiline = false,
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  multiline?: boolean
  placeholder?: string
}) {
  const inputClass = "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className={inputClass}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  )
}
