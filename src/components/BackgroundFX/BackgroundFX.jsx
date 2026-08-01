import { useEffect, useRef, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MOBILE_QUERY = '(max-width: 768px), (hover: none), (pointer: coarse)'

const BackgroundFX = () => {
  const spotlightRef = useRef(null)
  const canvasRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Track motion / device preferences
  useEffect(() => {
    const reducedMedia = window.matchMedia(REDUCED_MOTION_QUERY)
    const mobileMedia = window.matchMedia(MOBILE_QUERY)

    const sync = () => {
      setReducedMotion(reducedMedia.matches)
      setIsMobile(mobileMedia.matches)
    }

    sync()
    reducedMedia.addEventListener('change', sync)
    mobileMedia.addEventListener('change', sync)

    return () => {
      reducedMedia.removeEventListener('change', sync)
      mobileMedia.removeEventListener('change', sync)
    }
  }, [])

  // Mouse-following radial spotlight
  useEffect(() => {
    if (isMobile || reducedMotion) return undefined

    const spotlight = spotlightRef.current
    let frame = null

    const handleMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.setProperty('--spot-x', `${e.clientX}px`)
          spotlight.style.setProperty('--spot-y', `${e.clientY}px`)
        }
        frame = null
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [isMobile, reducedMotion])

  // Light particle field on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let animationFrameId = null
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      const count = isMobile ? 14 : 30
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: Math.random() * 0.35 + 0.08,
        hue: Math.random() > 0.6 ? '139, 92, 246' : '34, 211, 238'
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue}, ${p.a})`
        ctx.fill()
      })
      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })

    if (reducedMotion) {
      draw()
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
      return () => window.removeEventListener('resize', initParticles)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, reducedMotion])

  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />
      <div className="bg-spotlight" ref={spotlightRef} />
      <canvas ref={canvasRef} className="bg-particles" />
      <div className="bg-noise" />
    </div>
  )
}

export default BackgroundFX

