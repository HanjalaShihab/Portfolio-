import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  OFFICE_QUOTES,
  OFFICE_GOALS,
  OFFICE_SKILLS,
  pick,
  JOKES,
  COFFEE_JOKES
} from '../../utils/secretCommands'
import { AchievementStore } from '../../utils/achievements'
import './Office.css'

/* ------------------------------------------------------------------
   Office — full-screen pixel-art developer workspace.
   Every object is clickable, animated and theme-aware.
   ------------------------------------------------------------------ */

const PROJECTS_PREVIEW = [
  'Kanban Flow — Realtime collab board',
  'Adv Platform — MERN ad dashboard',
  'Mozammel’s Gallery — art showcase',
  'Fun Portal — community + admin',
  'Hotel Unwind — booking site'
]

const Office = ({ onExit }) => {
  const [panel, setPanel] = useState(null) // { title, emoji, body: React node | string | {list} }
  const [leaving, setLeaving] = useState(false)
  const audioRef = useRef(null)

  // Optional subtle blip sound — graceful fallback if WebAudio is blocked
  const blip = () => {
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        if (!Ctx) return
        audioRef.current = new Ctx()
      }
      const ctx = audioRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = 660 + Math.random() * 220
      osc.type = 'square'
      gain.gain.value = 0.03
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } catch {
      /* audio unavailable — ignore */
    }
  }

  const playHover = () => {
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        if (!Ctx) return
        audioRef.current = new Ctx()
      }
      const ctx = audioRef.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = 880
      osc.type = 'sine'
      gain.gain.value = 0.015
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch {
      /* audio unavailable — ignore */
    }
  }

  useEffect(() => {
    // Office explored achievement
    AchievementStore.unlock('office')
    const onKey = (e) => {
      if (e.key === 'Escape') handleExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExit = () => {
    setLeaving(true)
    setTimeout(() => onExit?.(), 350)
  }

  const openPanel = (panelData) => {
    blip()
    setPanel(panelData)
  }

  const actions = {
    laptop: () => {
      blip()
      window.open('https://github.com/HanjalaShihab', '_blank', 'noopener,noreferrer')
      AchievementStore.unlock('github')
    },
    monitor: () =>
      openPanel({
        title: '🖥️ Current Projects',
        emoji: '🖥️',
        body: { list: PROJECTS_PREVIEW, note: 'Typing `world` opens the full Developer World map.' }
      }),
    coffee: () =>
      openPanel({
        title: '☕ Coffee Mug',
        emoji: '☕',
        body: { quote: pick([...JOKES, ...COFFEE_JOKES]) }
      }),
    bookshelf: () =>
      openPanel({
        title: '📚 Bookshelf — Skills',
        emoji: '📚',
        body: { tags: OFFICE_SKILLS, note: 'Typing `space` turns these skills into stars.' }
      }),
    whiteboard: () =>
      openPanel({
        title: '📋 Whiteboard — Goals & Roadmap',
        emoji: '📋',
        body: { goals: OFFICE_GOALS }
      }),
    window: () => {
      blip()
      const a = document.createElement('a')
      a.href = '/hanjala_resume.pdf'
      a.download = 'Hanjala_Shihab_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      AchievementStore.unlock('resume')
    },
    plant: () =>
      openPanel({
        title: '🪴 Plant — Motivation',
        emoji: '🪴',
        body: { quote: pick(OFFICE_QUOTES) }
      }),
    drawer: () =>
      openPanel({
        title: '🗃️ Desk Drawer',
        emoji: '🗃️',
        body: { secret: true, note: 'Achievement unlocked: Explorer 🎉 — type `achievements` to view them all.' }
      }),
    door: () => {
      blip()
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      handleExit()
    }
  }

  const renderBody = (b) => {
    if (!b) return null
    if (b.quote) {
      return (
        <p className="office-panel-quote">
          <span className="office-panel-quote-mark">“</span>
          {b.quote}
          <span className="office-panel-quote-mark">”</span>
        </p>
      )
    }
    if (b.goals) {
      return (
        <div className="office-goals">
          {b.goals.map((g) => (
            <div key={g.title} className="office-goal">
              <span className="office-goal-icon">{g.icon}</span>
              <div>
                <div className="office-goal-title">{g.title}</div>
                <div className="office-goal-desc">{g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )
    }
    if (b.tags) {
      return (
        <div className="office-tags">
          {b.tags.map((t) => (
            <span key={t} className="office-tag">{t}</span>
          ))}
        </div>
      )
    }
    if (b.list) {
      return (
        <ul className="office-list">
          {b.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    }
    if (b.secret) {
      return (
        <div className="office-secret">
          <span className="office-secret-emoji">🔑</span>
          <p>{b.note}</p>
        </div>
      )
    }
    return b.note ? <p className="office-panel-note">{b.note}</p> : null
  }

  const items = [
    { id: 'laptop', className: 'office-obj office-obj--laptop', emoji: '💻', label: 'Laptop — GitHub' },
    { id: 'monitor', className: 'office-obj office-obj--monitor', emoji: '🖥️', label: 'Monitor — Projects' },
    { id: 'coffee', className: 'office-obj office-obj--coffee', emoji: '☕', label: 'Coffee — Joke' },
    { id: 'bookshelf', className: 'office-obj office-obj--bookshelf', emoji: '📚', label: 'Bookshelf — Skills' },
    { id: 'whiteboard', className: 'office-obj office-obj--whiteboard', emoji: '📋', label: 'Whiteboard — Goals' },
    { id: 'window', className: 'office-obj office-obj--window', emoji: '🪟', label: 'Window — Resume' },
    { id: 'plant', className: 'office-obj office-obj--plant', emoji: '🪴', label: 'Plant — Motivation' },
    { id: 'drawer', className: 'office-obj office-obj--drawer', emoji: '🗃️', label: 'Drawer — Secret' },
    { id: 'door', className: 'office-obj office-obj--door', emoji: '🚪', label: 'Door — Contact' }
  ]

  return (
    <motion.div
      className="office"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label="Pixel-art office"
    >
      <div className="office-sky">
        <span className="office-cloud office-cloud--1">☁️</span>
        <span className="office-cloud office-cloud--2">☁️</span>
      </div>

      <div className="office-room">
        <div className="office-backwall">
          {/* Whiteboard */}
          <button className="office-obj office-obj--whiteboard" onClick={() => actions.whiteboard()} onMouseEnter={playHover} aria-label="Whiteboard — goals and roadmap">
            <span className="office-whiteboard-title">ROADMAP</span>
            <span className="office-whiteboard-line" />
            <span className="office-whiteboard-line office-whiteboard-line--short" />
            <span className="office-whiteboard-line office-whiteboard-line--shorter" />
          </button>

          {/* Window */}
          <button className="office-obj office-obj--window" onClick={() => actions.window()} onMouseEnter={playHover} aria-label="Window — download resume">
            <span className="office-window-sun">🌤</span>
            <span className="office-window-hill office-window-hill--back" />
            <span className="office-window-hill office-window-hill--front" />
          </button>

          {/* Bookshelf */}
          <button className="office-obj office-obj--bookshelf" onClick={() => actions.bookshelf()} onMouseEnter={playHover} aria-label="Bookshelf — skills and technologies">
            <div className="office-shelf-row">
              <span>📕</span><span>📗</span><span>📘</span><span>📙</span>
            </div>
            <div className="office-shelf-row">
              <span>📓</span><span>📔</span><span>🖥️</span><span>🐘</span>
            </div>
            <div className="office-shelf-board" />
          </button>
        </div>

        {/* Desk */}
        <div className="office-desk">
          <button className="office-obj office-obj--monitor" onClick={() => actions.monitor()} onMouseEnter={playHover} aria-label="Monitor — current projects">
            <span className="office-monitor-screen">
              <span className="office-monitor-glow" />
            </span>
            <span className="office-monitor-stand" />
          </button>

          <button className="office-obj office-obj--laptop" onClick={() => actions.laptop()} onMouseEnter={playHover} aria-label="Laptop — open GitHub">
            <span className="office-laptop-screen">{'</>'}</span>
            <span className="office-laptop-base" />
          </button>

          <button className="office-obj office-obj--coffee" onClick={() => actions.coffee()} onMouseEnter={playHover} aria-label="Coffee mug — developer joke">
            <span className="office-coffee-steam office-coffee-steam--1" />
            <span className="office-coffee-steam office-coffee-steam--2" />
            <span className="office-coffee-cup">☕</span>
          </button>

          <button className="office-obj office-obj--plant" onClick={() => actions.plant()} onMouseEnter={playHover} aria-label="Plant — motivational quote">
            <span className="office-plant-pot">
              <span className="office-plant-leaf office-plant-leaf--1">🌿</span>
              <span className="office-plant-leaf office-plant-leaf--2">🌱</span>
            </span>
          </button>

          <button className="office-obj office-obj--drawer" onClick={() => actions.drawer()} onMouseEnter={playHover} aria-label="Desk drawer — secret achievement">
            <span className="office-drawer-handle" />
          </button>
        </div>

        {/* Door on side */}
        <button className="office-obj office-obj--door" onClick={() => actions.door()} onMouseEnter={playHover} aria-label="Door — go to contact section">
          <span className="office-door-panel">
            <span className="office-door-knob" />
          </span>
        </button>
      </div>

      {/* Floor */}
      <div className="office-floor" />

      {/* Hints */}
      <div className="office-hint">
        <span>💡 Click the objects — Laptop, Monitor, Coffee, Bookshelf, Whiteboard, Window, Plant, Drawer, Door</span>
      </div>

      {/* Exit */}
      <motion.button
        className="office-exit"
        onClick={handleExit}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Exit office"
      >
        ✕ Exit
      </motion.button>

      {/* Object labels on hover — rendered as a legend */}
      <div className="office-legend" aria-hidden="true">
        {items.map((i) => (
          <span key={i.id} className="office-legend-item">{i.emoji} {i.label}</span>
        ))}
      </div>

      {/* Panel */}
      <AnimatePresence>
        {panel && (
          <motion.div
            className="office-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanel(null)}
          >
            <motion.div
              className="office-panel"
              initial={{ y: 30, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={panel.title}
            >
              <div className="office-panel-head">
                <span className="office-panel-title">{panel.title}</span>
                <button className="office-panel-close" onClick={() => setPanel(null)} aria-label="Close panel">✕</button>
              </div>
              <div className="office-panel-body">{renderBody(panel.body)}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Office

