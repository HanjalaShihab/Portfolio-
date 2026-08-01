import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Cursor from './components/Cursor/Cursor'
import BackgroundFX from './components/BackgroundFX/BackgroundFX'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import CommandPalette from './components/CommandPalette/CommandPalette'

const MOBILE_MEDIA_QUERY = '(max-width: 768px), (hover: none), (pointer: coarse)'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MOBILE_MEDIA_QUERY).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
    const handleMediaChange = (event) => {
      setIsMobileDevice(event.matches)
    }

    setIsMobileDevice(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (isMobileDevice) return undefined

    let animationFrameId = null

    const handleMouseMove = (e) => {
      if (animationFrameId) return
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        animationFrameId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isMobileDevice])

  return (
    <div className="app">
      <BackgroundFX />
      <ScrollProgress />
      {!isMobileDevice && <Cursor mousePosition={mousePosition} />}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <CommandPalette />
    </div>
  )
}

export default App

