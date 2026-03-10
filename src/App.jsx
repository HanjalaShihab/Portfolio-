import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import './index.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Cursor from './components/Cursor/Cursor'

const MOBILE_MEDIA_QUERY = '(max-width: 768px), (hover: none), (pointer: coarse)'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
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
    setIsLoaded(true)
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

  // Scroll-triggered section reveal + background color transition (excluding hero)
  useEffect(() => {
    const sectionConfig = [
      { id: 'about', colorClass: 'section-bg-1' },
      { id: 'skills', colorClass: 'section-bg-7' },
      { id: 'projects', colorClass: 'section-bg-6' },
      { id: 'contact', colorClass: 'section-bg-4' },
      { id: 'footer', colorClass: 'section-bg-8' }
    ]

    if (isMobileDevice) {
      sectionConfig.forEach(({ id, colorClass }, index) => {
        const element = document.getElementById(id)
        if (!element) return

        const directionClass = index % 2 === 0 ? 'scroll-section--left' : 'scroll-section--right'
        element.classList.remove(
          'section-bg',
          'scroll-section',
          'section-bg-active',
          'is-visible',
          colorClass,
          directionClass
        )
      })

      return undefined
    }

    const sections = sectionConfig
      .map(({ id, colorClass }, index) => {
        const element = document.getElementById(id)
        if (!element) return null
        const directionClass = index % 2 === 0 ? 'scroll-section--left' : 'scroll-section--right'
        element.classList.add('section-bg', 'scroll-section', colorClass, directionClass)
        const revealItems = element.querySelectorAll('.reveal-item')
        revealItems.forEach((item, itemIndex) => {
          item.style.setProperty('--reveal-delay', `${itemIndex * 0.12}s`)
        })
        return element
      })
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-bg-active', 'is-visible')
          } else {
            entry.target.classList.remove('section-bg-active', 'is-visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -25% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      sections.forEach((section) => {
        section.classList.remove('section-bg-active', 'is-visible')
      })
    }
  }, [isMobileDevice])

  return (
    <AnimatePresence>
      <div className="app">
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
      </div>
    </AnimatePresence>
  )
}

export default App

