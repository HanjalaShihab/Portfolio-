import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Cursor.css'

const Cursor = ({ mousePosition }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [trails, setTrails] = useState([])

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button') ||
          target.classList.contains('interactive')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [])

  useEffect(() => {
    if (mousePosition.x === 0 && mousePosition.y === 0) return
    
    setTrails(prev => {
      const newTrails = [
        ...prev,
        { x: mousePosition.x, y: mousePosition.y, id: Date.now() }
      ].slice(-8)
      return newTrails
    })
  }, [mousePosition])

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className={`cursor ${isHovering ? 'hovering' : ''}`}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Cursor Dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35
        }}
      />

      {/* Trail Effects */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="cursor-trail"
          initial={{ x: trail.x - 8, y: trail.y - 8, opacity: 0.6, scale: 1 }}
          animate={{ 
            x: trail.x - 8, 
            y: trail.y - 8, 
            opacity: 0,
            scale: 0.3
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </>
  )
}

export default Cursor

