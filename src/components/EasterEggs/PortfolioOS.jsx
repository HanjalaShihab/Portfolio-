import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TerminalView from '../CommandPalette/TerminalView'
import AchievementsPanel from './AchievementsPanel'
import {
  OS_APPS,
  OS_WALLPAPERS,
  OS_ACCENTS,
  DEV_JOURNAL_ENTRIES
} from '../../utils/secretCommands'
import { AchievementStore } from '../../utils/achievements'
import './PortfolioOS.css'

/* ------------------------------------------------------------------
   PortfolioOS — a miniature operating system inside the portfolio.
   Boot sequence → desktop with draggable windows.
   Settings (wallpaper + accent) are scoped ONLY to this OS via localStorage.
   ------------------------------------------------------------------ */

const BOOT_LINES = [
  'Initializing Portfolio OS...',
  'Loading Components...',
  'Checking Coffee...',
  'Loading Projects...',
  'System Ready.'
]

const OS_STORAGE = 'portfolio-os-preferences'

const defaultPrefs = () => ({
  wallpaper: OS_WALLPAPERS[0].value,
  accent: OS_ACCENTS[0].value
})

const loadPrefs = () => {
  try {
    const raw = window.localStorage.getItem(OS_STORAGE)
    if (raw) return { ...defaultPrefs(), ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return defaultPrefs()
}

const savePrefs = (prefs) => {
  try {
    window.localStorage.setItem(OS_STORAGE, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

/* Window with drag support — hand-rolled pointer events (no deps) */
const DraggableWindow = ({ app, onClose, onMinimize, accent, children, defaultPos }) => {
  const [pos, setPos] = useState(defaultPos)
  const [drag, setDrag] = useState(null)

  const onPointerDown = (e) => {
    const rect = e.currentTarget.closest('.os-window').getBoundingClientRect()
    setDrag({
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top
    })
  }

  useEffect(() => {
    if (!drag) return undefined
    const move = (ev) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 200, ev.clientX - drag.dx)),
        y: Math.max(0, Math.min(window.innerHeight - 120, ev.clientY - drag.dy))
      })
    }
    const up = () => setDrag(null)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [drag])

  return (
    <motion.div
      className="os-window"
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.95 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      style={{
        left: pos.x,
        top: pos.y,
        '--os-accent': accent
      }}
      role="dialog"
      aria-label={`${app.label} window`}
    >
      <div
        className="os-window-titlebar"
        onPointerDown={onPointerDown}
        style={{ cursor: drag ? 'grabbing' : 'grab' }}
      >
        <span className="os-window-title">
          <span className="os-window-app-icon">{app.icon}</span>
          {app.label}
        </span>
        <div className="os-window-controls">
          <button className="os-win-btn os-win-btn--min" onClick={onMinimize} aria-label={`Minimize ${app.label}`}>—</button>
          <button className="os-win-btn os-win-btn--close" onClick={onClose} aria-label={`Close ${app.label}`}>✕</button>
        </div>
      </div>
      <div className="os-window-body">{children}</div>
    </motion.div>
  )
}

const PortfolioOS = ({ onExit }) => {
  const [booted, setBooted] = useState(false)
  const [bootIdx, setBootIdx] = useState(0)
  const [windows, setWindows] = useState([]) // array of { id, app, minimized, z }
  const [zTop, setZTop] = useState(10)
  const [prefs, setPrefs] = useState(loadPrefs)
  const [clock, setClock] = useState('')
  const taskbarRef = useRef(null)

  /* Boot sequence */
  useEffect(() => {
    const timers = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setBootIdx(i), i * 420))
    })
    timers.push(setTimeout(() => setBooted(true), BOOT_LINES.length * 420 + 200))
    return () => timers.forEach(clearTimeout)
  }, [])

  /* Clock */
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  /* Achievement */
  useEffect(() => {
    if (booted) AchievementStore.unlock('portfolioos')
  }, [booted])

  /* Persist prefs */
  useEffect(() => {
    savePrefs(prefs)
  }, [prefs])

  const openApp = (app) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.app.id === app.id)
      if (exists) {
        // Focus + restore
        setZTop((z) => z + 1)
        return prev.map((w) => (w.app.id === app.id ? { ...w, minimized: false, z: zTop + 1 } : w))
      }
      setZTop((z) => z + 1)
      const baseX = 120 + (prev.length % 4) * 36
      const baseY = 80 + (prev.length % 4) * 30
      return [...prev, { id: `${app.id}-${Date.now()}`, app, minimized: false, z: zTop + 1, defaultPos: { x: baseX, y: baseY } }]
    })
  }

  const closeWindow = (id) => setWindows((prev) => prev.filter((w) => w.id !== id))
  const minimizeWindow = (id) => setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  const focusWindow = (id) => {
    setZTop((z) => z + 1)
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false, z: zTop + 1 } : w)))
  }
  const restoreWindow = (id) => focusWindow(id)

  const setWallpaper = (value) => setPrefs((p) => ({ ...p, wallpaper: value }))
  const setAccent = (value) => setPrefs((p) => ({ ...p, accent: value }))

  const activeCount = windows.filter((w) => !w.minimized).length

  /* App content renderers */
  const renderAppContent = (app) => {
    switch (app.id) {
      case 'projects':
        return (
          <div className="os-app os-app--projects">
            <div className="os-app-title">📁 Projects</div>
            <div className="os-app-list">
              {['Kanban Flow (2026)', 'Adv Platform (2024)', "Mozammel's Gallery (2023)", 'Fun Portal (2023)', 'HustleHood BD (2023)', 'Hotel Unwind (2022)', 'Ogani (2022)'].map((p) => (
                <div key={p} className="os-app-list-item">
                  <span className="os-app-list-icon">▸</span> {p}
                </div>
              ))}
            </div>
            <p className="os-app-note">Type `world` in the palette to sail the full Developer World map 🌊</p>
          </div>
        )
      case 'terminal':
        return <TerminalView onExit={() => closeWindow(windows.find((w) => w.app.id === 'terminal')?.id)} />
      case 'resume':
        return (
          <div className="os-app os-app--resume">
            <div className="os-app-title">📄 Resume</div>
            <p className="os-app-text">Backend / Laravel / Full Stack Developer — Hanjala Shihab.</p>
            <a
              className="os-btn os-btn--primary"
              href="/hanjala_resume.pdf"
              download="Hanjala_Shihab_Resume.pdf"
              onClick={() => AchievementStore.unlock('resume')}
            >
              ⬇ Download Resume
            </a>
          </div>
        )
      case 'achievements':
        return <AchievementsPanel onClose={() => {}} compact />
      case 'journal':
        return (
          <div className="os-app os-app--journal">
            <div className="os-app-title">📓 Developer Journal</div>
            <div className="os-journal-list">
              {DEV_JOURNAL_ENTRIES.map((entry) => (
                <div key={entry.title} className="os-journal-entry">
                  <span className="os-journal-date">{entry.date}</span>
                  <span className="os-journal-title">{entry.title}</span>
                  <span className="os-journal-body">{entry.body}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'browser':
        return (
          <div className="os-app os-app--browser">
            <div className="os-browser-bar">
              <span className="os-browser-dot os-browser-dot--r" />
              <span className="os-browser-dot os-browser-dot--y" />
              <span className="os-browser-dot os-browser-dot--g" />
              <span className="os-browser-url">https://hanjala-shihab.vercel.app</span>
            </div>
            <div className="os-browser-body">
              <span className="os-browser-headline">Welcome to the Portfolio OS browser.</span>
              <span className="os-browser-sub">Links open in a real browser tab.</span>
              <div className="os-browser-links">
                <a href="https://github.com/HanjalaShihab" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/h-m-shihab-a98039350/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href="https://hanjala-shihab.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio ↗</a>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="os-app os-app--settings">
            <div className="os-app-title">⚙️ Settings</div>
            <div className="os-settings-section">
              <div className="os-settings-label">Wallpaper</div>
              <div className="os-settings-options">
                {OS_WALLPAPERS.map((w) => (
                  <button
                    key={w.id}
                    className={`os-swatch os-swatch--wall ${prefs.wallpaper === w.value ? 'is-active' : ''}`}
                    style={{ background: w.value }}
                    onClick={() => setWallpaper(w.value)}
                    aria-label={`Set wallpaper ${w.label}`}
                    title={w.label}
                  />
                ))}
              </div>
            </div>
            <div className="os-settings-section">
              <div className="os-settings-label">Accent Color</div>
              <div className="os-settings-options">
                {OS_ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    className={`os-swatch os-swatch--accent ${prefs.accent === a.value ? 'is-active' : ''}`}
                    style={{ background: a.value }}
                    onClick={() => setAccent(a.value)}
                    aria-label={`Set accent ${a.label}`}
                    title={a.label}
                  />
                ))}
              </div>
            </div>
            <p className="os-app-note">Preferences are saved only inside Portfolio OS — the main portfolio theme is untouched.</p>
          </div>
        )
      case 'about':
        return (
          <div className="os-app os-app--about">
            <div className="os-app-title">👤 About</div>
            <p className="os-app-text">
              Hanjala Shihab — backend-focused software engineer turning ideas into reliable, scalable products.
              Specializes in Laravel, PHP, React, REST APIs and clean architecture.
            </p>
            <div className="os-about-tags">
              {['Laravel', 'PHP', 'React', 'Node.js', 'MySQL', 'Redis', 'Docker', 'AI'].map((t) => (
                <span key={t} className="os-about-tag">{t}</span>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="portfolio-os" style={{ '--os-wallpaper': prefs.wallpaper, '--os-accent': prefs.accent }}>
      <AnimatePresence mode="wait">
        {!booted ? (
          <motion.div
            key="boot"
            className="os-boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="os-boot-logo">
              <span className="os-boot-mark">{'</>'}</span>
              <span className="os-boot-name">Portfolio OS</span>
            </div>
            <div className="os-boot-lines">
              {BOOT_LINES.slice(0, bootIdx + 1).map((line, i) => (
                <motion.div
                  key={line}
                  className="os-boot-line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="os-boot-ok">{i === BOOT_LINES.length - 1 ? '✓' : '>'} </span>
                  {line}
                </motion.div>
              ))}
            </div>
            <div className="os-boot-progress">
              <motion.div
                className="os-boot-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${((bootIdx + 1) / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            className="os-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Desktop icons */}
            <div className="os-desktop-icons">
              {OS_APPS.map((app) => (
                <button
                  key={app.id}
                  className="os-desktop-icon"
                  onClick={() => openApp(app)}
                  onDoubleClick={() => openApp(app)}
                  aria-label={`Open ${app.label}`}
                >
                  <span className="os-desktop-icon-emoji">{app.icon}</span>
                  <span className="os-desktop-icon-label">{app.label}</span>
                </button>
              ))}
            </div>

            {/* Windows */}
            <AnimatePresence>
              {windows
                .filter((w) => !w.minimized)
                .map((w) => (
                  <DraggableWindow
                    key={w.id}
                    app={w.app}
                    accent={prefs.accent}
                    defaultPos={w.defaultPos}
                    onClose={() => closeWindow(w.id)}
                    onMinimize={() => minimizeWindow(w.id)}
                  >
                    <div onMouseDown={() => focusWindow(w.id)} style={{ height: '100%' }}>
                      {renderAppContent(w.app)}
                    </div>
                  </DraggableWindow>
                ))}
            </AnimatePresence>

            {/* Taskbar */}
            <div className="os-taskbar" ref={taskbarRef}>
              <div className="os-taskbar-left">
                <span className="os-taskbar-logo">{'</>'} Portfolio OS</span>
              </div>
              <div className="os-taskbar-windows">
                {windows.map((w) => (
                  <button
                    key={w.id}
                    className={`os-taskbar-window ${w.minimized ? 'is-minimized' : ''}`}
                    onClick={() => restoreWindow(w.id)}
                    aria-label={`Restore ${w.app.label}`}
                  >
                    {w.app.icon} {w.app.label}
                  </button>
                ))}
              </div>
              <div className="os-taskbar-right">
                <span className="os-taskbar-clock">{clock}</span>
                <button className="os-exit" onClick={onExit} aria-label="Exit Portfolio OS">⏻</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioOS

