import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Cursor.css'

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false)

  // Motion values driven directly by mousemove — no React state round-trip
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Outer ring: softer spring (slight trailing effect)
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 })

  // Inner dot: near-instant response
  const dotX = useSpring(x, { stiffness: 1600, damping: 60, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 1600, damping: 60, mass: 0.2 })

  const scale = useSpring(isHovering ? 1.6 : 1, { stiffness: 260, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      // Raw pointer coords — centering handled via CSS negative margins
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const interactive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.classList?.contains('interactive')

      setIsHovering(!!interactive)
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [x, y])

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className={`cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          scale
        }}
      />

      {/* Cursor Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY
        }}
      />
    </>
  )
}

export default Cursor


