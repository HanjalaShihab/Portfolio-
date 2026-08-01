import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line no-unused-vars
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
  FiTerminal,
  FiSun
} from 'react-icons/fi'
import resume from '../../assets/hanjala_resume.pdf'
import { useTheme } from '../../context/ThemeContext'
import {
  getSecretKey,
  pick,
  PROGRAMMING_QUOTES,
  FORTUNES,
  JOKES,
  COFFEE_JOKES
} from '../../utils/secretCommands'
import { AchievementStore } from '../../utils/achievements'
import './SecretLayer.css'
import TerminalView from './TerminalView'
import MatrixMode from '../EasterEggs/MatrixMode'
import PixelCat from '../EasterEggs/PixelCat'
import AchievementsPanel from '../EasterEggs/AchievementsPanel'
import AskAssistant from '../EasterEggs/AskAssistant'
import RetroMode from '../EasterEggs/RetroMode'
import Confetti from '../EasterEggs/Confetti'
import SecretToast from '../EasterEggs/SecretToast'

/* ---------------- Lazy-loaded Phase 2 experiences (code-split) ---------------- */
const Office = lazy(() => import('../EasterEggs/Office'))
const PortfolioOS = lazy(() => import('../EasterEggs/PortfolioOS'))
const Timeline = lazy(() => import('../EasterEggs/Timeline'))
const World = lazy(() => import('../EasterEggs/World'))
const Space = lazy(() => import('../EasterEggs/Space'))

/* ---------------- Existing commands (UNCHANGED) ---------------- */
const commands = [
  { id: 'home', label: 'Go to Home', section: '#home', icon: FiHome },
  { id: 'about', label: 'Go to About', section: '#about', icon: FiUser },
  { id: 'skills', label: 'Go to Skills', section: '#skills', icon: FiGrid },
  { id: 'projects', label: 'Go to Projects', section: '#projects', icon: FiFolder },
  { id: 'contact', label: 'Go to Contact', section: '#contact', icon: FiMail },
  { id: 'toggle-theme', label: 'Toggle Light / Night Mode', action: 'toggle-theme', icon: FiSun },
  { id: 'github', label: 'Open GitHub', href: 'https://github.com/HanjalaShihab', icon: FiGithub },
  { id: 'linkedin', label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/h-m-shihab-a98039350/', icon: FiLinkedin },
  { id: 'resume', label: 'Download Resume', href: resume, download: true, icon: FiDownload },
  { id: 'email', label: 'Copy Email Address', action: 'copy', icon: FiMail }
]

const navigate = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------------- Konami / retro sequence ---------------- */
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

/* ---------------- Secret response data ---------------- */
const SECRET_TEXT = {
  rm: `Permission denied.\nFilesystem protected.\nNice try 😄`,
  hello: `Hello, recruiter 👋\nWelcome to my portfolio.`,
  rich: `Command unavailable.\nTry:\n\nbuild amazing products`,
  42: `The answer is 42.\nThe question is still loading...`
}

const HIRE_LINES = [
  'Checking references...',
  'Testing Laravel...',
  'Testing Problem Solving...',
  'Building...',
  '✔ Candidate Accepted'
]

const DEVELOPER_MSG = `Congratulations.

You explored every hidden corner of this portfolio.

Thanks for taking the time to explore beyond the surface.

If you're a recruiter or fellow developer, I'd love to connect.`

const CommandPalette = () => {
  const { toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  /* --- Hidden layer state --- */
  const [mode, setMode] = useState(null) // null | 'terminal' | 'matrix' | 'cat' | 'achievements' | 'ask' | 'retro' | 'toast' | 'hire' | 'office' | 'portfolioos' | 'timeline' | 'world' | 'space'
  const [toast, setToast] = useState(null) // { title, text }
  const [confetti, setConfetti] = useState(false)
  const [hireStep, setHireStep] = useState(0)
  const [hireDone, setHireDone] = useState(false)
  const [retroActive, setRetroActive] = useState(false)

  /* --- Results (existing, unchanged) --- */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  /* --- Existing open/close + keyboard, preserved --- */
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => {
          if (!prev) {
            // Reopening — clear any transient global modes (matrix/cat/retro)
            setMode(null)
            setToast(null)
            setConfetti(false)
          }
          return !prev
        })
        setQuery('')
        setActiveIndex(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  /* --- Unlock pallete + first-visit achievements --- */
  useEffect(() => {
    if (open) {
      AchievementStore.unlock('palette')
      if (AchievementStore.get().length === 0) {
        AchievementStore.unlock('first-visit')
      }
    }
  }, [open])

  /* --- Konami sequence --- */
  useEffect(() => {
    let idx = 0
    const onKey = (e) => {
      if (!open) return
      const key = e.key.toLowerCase()
      if (key === KONAMI[idx]) {
        idx += 1
        if (idx === KONAMI.length) {
          idx = 0
          setRetroActive(true)
          AchievementStore.unlock('secret')
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* --- Retro body class (pixel font + tint) --- */
  useEffect(() => {
    document.body.classList.toggle('retro-active', retroActive)
    return () => document.body.classList.remove('retro-active')
  }, [retroActive])

  /* --- Existing query change, preserved --- */
  const handleQueryChange = (e) => {
    // If a mode is active (e.g. terminal), do not let typing leak in.
    if (mode) {
      e.target.value = ''
      return
    }
    setQuery(e.target.value)
    setActiveIndex(0)
  }

  /* --- Existing command runner, preserved + achievement hooks --- */
  const runCommand = (cmd) => {
    if (cmd.action === 'toggle-theme') {
      toggleTheme()
    } else if (cmd.action === 'copy') {
      navigator.clipboard.writeText('shihab2305341402@diu.edu.bd')
    } else if (cmd.href) {
      if (cmd.download) AchievementStore.unlock('resume')
      if (cmd.href.includes('github.com/HanjalaShihab')) AchievementStore.unlock('github')
      window.open(cmd.href, cmd.download ? '_self' : '_blank', 'noopener,noreferrer')
    } else if (cmd.section) {
      navigate(cmd.section)
    }
    setOpen(false)
  }

  /* --- Enter key handling, preserved --- */
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

  /* --- Run a secret command (only on exact match) --- */
  const runSecret = (secretKey) => {
    // Found Secret Command + Secret Master tracking
    AchievementStore.unlock('secret')
    if (AchievementStore.hasAll()) AchievementStore.unlock('master')

    switch (secretKey) {
      case 'terminal':
        setMode('terminal')
        AchievementStore.unlock('terminal')
        break
      case 'matrix':
        setMode('matrix')
        setConfetti(false)
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('matrix')
        break
      case 'cat':
        setMode('cat')
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('cat')
        break
      case 'quote':
        setToast({ title: 'Quote', text: pick(PROGRAMMING_QUOTES) })
        break
      case 'achievements':
        setMode('achievements')
        break
      case 'ask':
        setMode('ask')
        break
      case 'hire':
        setMode('hire')
        setHireDone(false)
        setHireStep(0)
        break
      case 'rm':
        setToast({ title: 'rm -rf /', text: SECRET_TEXT.rm })
        break
      case 'coffee':
        setToast({ title: '☕ Coffee', text: pick(COFFEE_JOKES) })
        break
      case 'fortune':
        setToast({ title: '🔮 Fortune', text: FORTUNES[Math.floor(Math.random() * FORTUNES.length)] })
        break
      case 'joke':
        setToast({ title: '😂 Joke', text: pick(JOKES) })
        break
      case '42':
        setToast({ title: '42', text: SECRET_TEXT[42] })
        break
      case 'hello':
        setToast({ title: 'Hello', text: SECRET_TEXT.hello })
        break
      case 'rich':
        setToast({ title: 'make me rich', text: SECRET_TEXT.rich })
        break
      case 'konami':
        setRetroActive(true)
        AchievementStore.unlock('secret')
        break
      case 'developer':
        if (AchievementStore.hasAll()) {
          setToast({ title: 'developer', text: DEVELOPER_MSG, showConnect: true })
        } else {
          setToast({ title: 'developer', text: 'Command not found.' })
        }
        break
      case 'office':
        setMode('office')
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('office')
        break
      case 'portfolioos':
        setMode('portfolioos')
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('portfolioos')
        break
      case 'timeline':
        setMode('timeline')
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('timeline')
        break
      case 'world':
        setMode('world')
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('world')
        break
      case 'space':
        setMode('space')
        setOpen(false)
        setQuery('')
        AchievementStore.unlock('space')
        break
      default:
        break
    }
  }

  /* --- Intercept Enter to detect exact secret commands first --- */
  const handleSecretEnter = (e) => {
    if (e.key === 'Enter') {
      const secretKey = getSecretKey(query)
      if (secretKey) {
        e.preventDefault()
        runSecret(secretKey)
        setQuery('')
        setActiveIndex(0)
        return
      }
    }
    handleKeyDown(e)
  }

  const closeAll = () => {
    setOpen(false)
    setMode(null)
    setToast(null)
    setConfetti(false)
  }

  return (
    <>
      {/* Overlay globals from secret modes — rendered at body level via portal-ish wrapper */}
      {mode === 'matrix' && <MatrixMode onDone={() => { setMode(null); setQuery('') }} />}
      {mode === 'cat' && <PixelCat onDone={() => { setMode(null); setQuery('') }} />}
      {mode === 'office' && (
        <Suspense fallback={null}>
          <Office onExit={() => { setMode(null); setQuery('') }} />
        </Suspense>
      )}
      {mode === 'portfolioos' && (
        <Suspense fallback={null}>
          <PortfolioOS onExit={() => { setMode(null); setQuery('') }} />
        </Suspense>
      )}
      {mode === 'timeline' && (
        <Suspense fallback={null}>
          <Timeline onExit={() => { setMode(null); setQuery('') }} />
        </Suspense>
      )}
      {mode === 'world' && (
        <Suspense fallback={null}>
          <World onExit={() => { setMode(null); setQuery('') }} />
        </Suspense>
      )}
      {mode === 'space' && (
        <Suspense fallback={null}>
          <Space onExit={() => { setMode(null); setQuery('') }} />
        </Suspense>
      )}
      {retroActive && <RetroMode onExit={() => setRetroActive(false)} />}
      {confetti && <Confetti onDone={() => setConfetti(false)} />}

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
            {mode === 'hire' ? (
              <motion.div
                className="cmd-palette cmd-palette--hire"
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="status"
                aria-live="polite"
              >
                <HireSequence
                  step={hireStep}
                  setStep={setHireStep}
                  done={hireDone}
                  setDone={setHireDone}
                  onFinish={() => {
                    setConfetti(true)
                    setMode(null)
                    setOpen(false)
                  }}
                />
              </motion.div>
            ) : mode === 'achievements' ? (
              <motion.div
                className="cmd-palette"
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <AchievementsPanel onClose={() => setMode(null)} />
              </motion.div>
            ) : mode === 'ask' ? (
              <motion.div
                className="cmd-palette"
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <AskAssistant onClose={() => setMode(null)} />
              </motion.div>
            ) : mode === 'terminal' ? (
              <motion.div
                className="cmd-palette cmd-palette--terminal"
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <TerminalView
                  onExit={() => {
                    setMode(null)
                    setQuery('')
                  }}
                />
              </motion.div>
            ) : toast ? (
              <motion.div
                className="cmd-palette cmd-palette--toast"
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <SecretToast
                  text={toast.text}
                  title={toast.title}
                  showConnect={toast.showConnect}
                  onClose={() => setToast(null)}
                  onConnect={(type) => {
                    if (type === 'contact') {
                      navigate('#contact')
                    } else if (type === 'linkedin') {
                      window.open('https://www.linkedin.com/in/h-m-shihab-a98039350/', '_blank', 'noopener,noreferrer')
                    }
                    setOpen(false)
                    setToast(null)
                  }}
                />
              </motion.div>
            ) : (
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
                    onChange={handleQueryChange}
                    onKeyDown={handleSecretEnter}
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------------- Hire sequence ---------------- */
const HireSequence = ({ step, setStep, done, setDone, onFinish }) => {
  useEffect(() => {
    if (done) return undefined
    const t = setTimeout(() => {
      if (step < HIRE_LINES.length - 1) {
        setStep(step + 1)
      } else {
        setDone(true)
        setTimeout(() => onFinish(), 700)
      }
    }, 600)
    return () => clearTimeout(t)
  }, [step, done, setStep, setDone, onFinish])

  return (
    <div className="hire-panel">
      <h3 className="easter-panel-title">sudo hire hanjala</h3>
      <div className="hire-lines">
        {HIRE_LINES.slice(0, step + 1).map((line, i) => (
          <div key={i} className={`hire-line ${line.startsWith('✔') ? 'hire-line--ok' : ''}`}>
            <span className="hire-dot">$</span> {line}
          </div>
        ))}
        {!done && <span className="hire-blinking">▌</span>}
      </div>
    </div>
  )
}

export default CommandPalette

