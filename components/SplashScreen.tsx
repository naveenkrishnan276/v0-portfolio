'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = [
  'Hello',
  'Hola',
  'Bonjour',
  'Namaste',
  'Ciao',
  'Konnichiwa',
]

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (currentIndex >= greetings.length) {
      setIsExiting(true)
      const exitTimer = setTimeout(() => {
        onComplete()
      }, 800)
      return () => clearTimeout(exitTimer)
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 400)

    return () => clearTimeout(timer)
  }, [currentIndex, onComplete])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Gradient background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
              style={{
                background: 'radial-gradient(circle, hsl(270, 100%, 65%), hsl(330, 100%, 65%), transparent)',
              }}
            />
          </div>

          {/* Greeting text */}
          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              {currentIndex < greetings.length && (
                <motion.h1
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-7xl sm:text-8xl md:text-9xl font-display font-normal uppercase tracking-wider gradient-text"
                >
                  {greetings[currentIndex]}
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Progress dots */}
            <div className="mt-12 flex gap-2 justify-center">
              {greetings.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ width: 8 }}
                  animate={{
                    width: idx === currentIndex ? 32 : 8,
                    backgroundColor:
                      idx < currentIndex
                        ? 'hsl(270, 100%, 65%)'
                        : idx === currentIndex
                          ? 'hsl(330, 100%, 65%)'
                          : 'hsl(240, 5%, 25%)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-background"
        />
      )}
    </AnimatePresence>
  )
}
