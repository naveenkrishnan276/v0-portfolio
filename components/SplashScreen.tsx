'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = ['Hello', 'Hola', 'Bonjour', 'வணக்கம்', 'こんにちは']

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const handleComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    if (currentIndex >= greetings.length) {
      setIsExiting(true)
      const exitTimer = setTimeout(handleComplete, 800)
      return () => clearTimeout(exitTimer)
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 600)

    return () => clearTimeout(timer)
  }, [currentIndex, handleComplete])

  if (isExiting) {
    return (
      <motion.div
        key="exit"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-0 z-[100] bg-background"
      />
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      {/* Greeting text */}
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl md:text-8xl font-display font-normal uppercase tracking-wider text-foreground"
          >
            {greetings[currentIndex] || ''}
          </motion.h1>
        </AnimatePresence>

        {/* Simple progress bar */}
        <div className="mt-10 w-48 h-1 bg-zinc-800 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / greetings.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}
