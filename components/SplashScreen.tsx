'use client'

import { useEffect, useState } from 'react'

const languages = [
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: '你好', lang: 'Mandarin' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'வணக்கம்', lang: 'Tamil' },
  { text: 'Hello', lang: 'English' },
]

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (currentIndex >= languages.length) {
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(onComplete, 500)
      }, 500)
      return
    }

    const timer = setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
    }, 450)

    return () => clearTimeout(timer)
  }, [currentIndex, onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Animated blacksmoke background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => {
          const positions = [
            { left: 20, top: 15 },
            { left: 70, top: 25 },
            { left: 40, top: 60 },
            { left: 80, top: 70 },
            { left: 30, top: 80 },
          ]
          const pos = positions[i]
          const sizes = [150, 180, 200, 160, 190]
          return (
            <div
              key={i}
              className="blacksmoke"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: `${sizes[i]}px`,
                height: `${sizes[i]}px`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          )
        })}
      </div>

      {/* Hello text animation */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1
            key={currentIndex}
            className="text-7xl md:text-8xl font-bold animate-fade-in-scale"
            style={{
              background: 'linear-gradient(135deg, hsl(180, 100%, 50%), hsl(300, 100%, 50%))',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shift 2s ease infinite, fade-in-scale 0.5s ease-out',
            }}
          >
            {languages[currentIndex].text}
          </h1>
        </div>

        {/* Language label */}
        <p className="text-lg text-gray-400 tracking-widest uppercase">
          {languages[currentIndex].lang}
        </p>

        {/* Progress indicator */}
        <div className="mt-8 flex gap-2 justify-center">
          {languages.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx < currentIndex
                  ? 'w-8 bg-gradient-to-r from-cyan-500 to-magenta-500'
                  : idx === currentIndex
                    ? 'w-8 bg-cyan-500'
                    : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
