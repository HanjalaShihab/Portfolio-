import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiFolder,
  FiCode
} from 'react-icons/fi'
import { FaLaravel, FaReact, FaPhp } from 'react-icons/fa'
import resume from '../../assets/hanjala_resume.pdf'
import './Hero.css'

const roles = [
  'Backend / Laravel Developer',
  'Full Stack Engineer',
  'PHP & Laravel Craftsman',
  'AI-Powered Solutions Builder',
  'REST API Architect'
]

const terminalLines = [
  { prompt: true, cmd: 'composer create-project laravel/laravel portfolio' },
  { prompt: true, cmd: 'php artisan make:model Project -mcr' },
  { prompt: false, text: '✓ Model, migration & controller created successfully' },
  { prompt: true, cmd: 'php artisan migrate --seed' },
  { prompt: false, text: '✓ Database migrated & seeded (users, projects, skills)' },
  { prompt: true, cmd: 'php artisan serve --port=8000' },
  { prompt: false, text: 'INFO  Server running on [http://127.0.0.1:8000].', dim: true },
  { prompt: false, text: '✓ Laravel development server started', accent: true }
]

const heroStats = [
  { value: '4+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Shipped' },
  { value: '12+', label: 'Technologies' },
  { value: '100%', label: 'Commitment' }
]

const techFocus = [
  { icon: FaLaravel, name: 'Laravel', color: '#FF2D20' },
  { icon: FaReact, name: 'React', color: '#61DAFB' },
  { icon: FaPhp, name: 'PHP', color: '#8993BE' }
]

const Hero = () => {
  const [typed, setTyped] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting) {
      if (typed.length < current.length) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 55)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1600)
      }
    } else {
      if (typed.length > 0) {
        timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 28)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }, 160)
      }
    }

    return () => clearTimeout(timeout)
  }, [typed, isDeleting, roleIndex])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div
          className="hero-grid"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Left column */}
          <div className="hero-main">
            <motion.div variants={item}>
              <div className="hero-badge-row">
                <span className="status-badge">
                  <span className="pulse-dot" />
                  Available for work
                </span>
                <span className="hero-tech-focus">
                  <span className="tech-focus-label">Currently building with</span>
                  <span className="tech-focus-icons">
                    {techFocus.map((t) => (
                      <span
                        key={t.name}
                        className="tech-focus-icon"
                        title={t.name}
                        style={{ '--tech-color': t.color }}
                      >
                        <t.icon />
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.h1 className="hero-title" variants={item}>
              Hanjala
              <span className="hero-title-accent"> Shihab</span>
              <span className="hero-title-caret">_</span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={item}>
              <span className="hero-subtitle-prefix">{'>_'}</span>
              <span className="hero-type">{typed}</span>
              <span className="type-cursor" />
            </motion.p>

            <motion.p className="hero-description" variants={item}>
              Backend &amp; Full Stack engineer specializing in{' '}
              <span className="text-gradient">Laravel, PHP &amp; React</span>. I design
              resilient APIs, robust data models, and production-grade web applications —
              with the engineering rigor recruiters look for.
            </motion.p>

            <motion.div className="hero-buttons" variants={item}>
              <motion.a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => handleNavClick(e, '#projects')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects <FiArrowRight />
              </motion.a>
              <motion.a
                href={resume}
                download="Hanjala_Shihab_Resume.pdf"
                className="btn btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiDownload /> Download Resume
              </motion.a>
              <motion.a
                href="https://github.com/HanjalaShihab"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="GitHub profile"
              >
                <FiGithub /> GitHub
              </motion.a>
            </motion.div>

            <motion.div className="hero-stats" variants={item}>
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — terminal window */}
          <motion.div className="hero-terminal-col" variants={item}>
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="t-dot t-dot--r" />
                  <span className="t-dot t-dot--y" />
                  <span className="t-dot t-dot--g" />
                </div>
                <span className="terminal-title">hanjala@dev: ~/portfolio</span>
                <span className="terminal-icon"><FiCode /></span>
              </div>
              <div className="terminal-body">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`term-line ${line.dim ? 'term-line--dim' : ''} ${line.accent ? 'term-line--accent' : ''}`}
                  >
                    {line.prompt && <span className="term-prompt">➜&nbsp;~</span>}
                    {line.prompt ? (
                      <span className="term-cmd">{line.cmd}</span>
                    ) : (
                      <span className="term-out">{line.text}</span>
                    )}
                  </div>
                ))}
                <div className="term-line term-line--cursor">
                  <span className="term-prompt">➜&nbsp;~</span>
                  <span className="term-caret" />
                </div>
              </div>
            </div>

            <motion.a
              className="hero-quick-links"
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              whileHover={{ x: 4 }}
            >
              <span className="quick-link-item"><FiFolder /> About</span>
              <span className="quick-link-item"><FiCode /> Skills</span>
              <span className="quick-link-item"><FiMail /> Contact</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="hero-socials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <a href="https://github.com/HanjalaShihab" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://www.linkedin.com/in/h-m-shihab-a98039350/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="mailto:shihab2305341402@diu.edu.bd" aria-label="Email">
            <FiMail />
          </a>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowDown size={20} />
          </motion.div>
          <span>scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

