import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch,
  FiHome,
  FiUser,
  FiGrid,
  FiFolder,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiArrowRight,
  FiTerminal
} from 'react-icons/fi'
import resume from '../../assets/hanjala_resume.pdf'

const commands = [
  { id: 'home', label: 'Go to Home', section: '#home', icon: FiHome },
  { id: 'about', label: 'Go to About', section: '#about', icon: FiUser },
  { id: 'skills', label: 'Go to Skills', section: '#skills', icon: FiGrid },
  { id: 'projects', label: 'Go to Projects', section: '#projects', icon: FiFolder },
  { id: 'contact', label: 'Go to Contact', section: '#contact', icon: FiMail },
  { id: 'github', label: 'Open GitHub', href: 'https://github.com/HanjalaShihab', icon: FiGithub },
  { id: 'linkedin', label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/h-m-shihab-a98039350/', icon: FiLinkedin },
  { id: 'resume', label: 'Download Resume', href: resume, download: true, icon: FiDownload },
  { id: 'email', label: 'Copy Email Address', action: 'copy', icon: FiMail }
]

const navigate = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setQuery('')
        setActiveIndex(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const runCommand = (cmd) => {
    if (cmd.action === 'copy') {
      navigator.clipboard.writeText('shihab2305341402@diu.edu.bd')
    } else if (cmd.href) {
      window.open(cmd.href, cmd.download ? '_self' : '_blank', 'noopener,noreferrer')
    } else if (cmd.section) {
      navigate(cmd.section)
    }
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[activeIndex]) runCommand(results[activeIndex])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="cmd-palette"
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-input-wrap">
              <FiSearch size={20} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command… (about, projects, resume)"
                aria-label="Search commands"
              />
              <FiTerminal size={18} style={{ color: 'var(--accent-secondary)', opacity: 0.7 }} />
            </div>

            <div className="cmd-list" role="listbox">
              {results.length === 0 && (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  No matching commands.
                </div>
              )}
              {results.map((cmd, idx) => {
                const Icon = cmd.icon
                return (
                  <button
                    key={cmd.id}
                    className={`cmd-item ${idx === activeIndex ? 'cmd-item--active' : ''}`}
                    onClick={() => runCommand(cmd)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    role="option"
                    aria-selected={idx === activeIndex}
                  >
                    <Icon />
                    <span>{cmd.label}</span>
                    {idx === activeIndex && <FiArrowRight className="cmd-shortcut" />}
                  </button>
                )
              })}
            </div>

            <div className="cmd-footer">
              <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette

