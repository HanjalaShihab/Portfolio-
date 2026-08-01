import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import './Cursor.css'

const Cursor = ({ mousePosition }) => {
  const [isHovering, setIsHovering] = useState(false)

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
    </>
  )
}

export default Cursor

