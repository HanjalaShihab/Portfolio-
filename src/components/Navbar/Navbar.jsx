import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGithub, FiLinkedin, FiCommand } from 'react-icons/fi'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Navbar.css'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      }
    )

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const openPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true
    }))
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary navigation"
      >
        <div className="container navbar-container">
          <motion.a
            href="#home"
            className="logo"
            onClick={(e) => handleNavClick(e, '#home')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Go to home"
          >
            <span className="logo-mark">{'</>'}</span>
            <span className="logo-text">hanjala</span>
            <span className="logo-dot">_</span>
          </motion.a>

          <div className="nav-links">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index + 0.2 }}
                >
                  <span className="nav-link-index">0{index + 1}</span>
                  {link.name}
                  <span className="nav-underline" />
                </motion.a>
              )
            })}
          </div>

          <div className="nav-actions">
            <ThemeToggle />

            <motion.button
              className="palette-trigger"
              onClick={openPalette}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Open command palette"
              title="Command palette (⌘K)"
            >
              <FiCommand size={16} />
              <span className="palette-kbd">⌘K</span>
            </motion.button>

            <motion.button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.94 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mobile-menu-content">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.15 }}
                >
                  <span className="mobile-nav-index">0{index + 1}</span>
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                className="mobile-social-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <a href="https://github.com/HanjalaShihab" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/h-m-shihab-a98039350/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

