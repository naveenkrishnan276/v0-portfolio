'use client'

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="blacksmoke"
          style={{
            left: `${(i % 3) * 30 + 20}%`,
            top: `${(i % 4) * 25}%`,
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}
