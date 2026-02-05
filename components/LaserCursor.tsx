'use client'

import { useEffect, useRef } from 'react'

export default function LaserCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`

        // Set CSS variables for animation
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
      }

      // Create trail effect
      if (trailRef.current && Math.random() > 0.7) {
        const trail = document.createElement('div')
        trail.className = 'laser-trail'
        trail.style.position = 'fixed'
        trail.style.left = `${e.clientX}px`
        trail.style.top = `${e.clientY}px`
        trail.style.width = '4px'
        trail.style.height = '4px'
        trail.style.background = 'radial-gradient(circle, hsl(180, 100%, 50%), transparent)'
        trail.style.borderRadius = '50%'
        trail.style.pointerEvents = 'none'
        trail.style.zIndex = '9998'
        trail.style.boxShadow = '0 0 6px hsl(180, 100%, 50%)'
        trail.style.animation = 'trail-fade 0.6s ease-out forwards'

        trailRef.current.appendChild(trail)

        setTimeout(() => trail.remove(), 600)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="laser-cursor"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div ref={trailRef} />

      <style>{`
        @keyframes trail-fade {
          to {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </>
  )
}
