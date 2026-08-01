import { useEffect, useState } from 'react'

/* ============================================================
   Lightweight confetti burst — pure CSS/DOM, no dependencies.
   Fires once and fades out.
   ============================================================ */
const COLORS = ['#6366F1', '#8B5CF6', '#22D3EE', '#34D399', '#FBBF24', '#F87171']

const Confetti = ({ count = 70, onDone }) => {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    const list = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 2.2 + Math.random() * 1.6,
      size: 7 + Math.random() * 8,
      color: COLORS[i % COLORS.length],
      rotate: Math.random() * 360
    }))
    setPieces(list)

    const t = setTimeout(() => onDone?.(), 4200)
    return () => clearTimeout(t)
  }, [count, onDone])

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`
          }}
        />
      ))}
    </div>
  )
}

export default Confetti

