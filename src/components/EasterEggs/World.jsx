import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WORLD_ISLANDS } from '../../utils/secretCommands'
import { AchievementStore } from '../../utils/achievements'
import './World.css'

/* ------------------------------------------------------------------
   World — fictional "Developer World" ocean map.
   Each project is an island. Clicking zooms into it with a sail feel.
   ------------------------------------------------------------------ */

const World = ({ onExit }) => {
  const [selected, setSelected] = useState(null)
  const [sailing, setSailing] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    AchievementStore.unlock('world')
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (selected) setSelected(null)
        else handleExit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const handleExit = () => {
    setLeaving(true)
    setTimeout(() => onExit?.(), 350)
  }

  const openIsland = (island) => {
    if (selected) return
    setSailing(true)
    setTimeout(() => {
      setSelected(island)
      setSailing(false)
    }, 650)
  }

  const closeIsland = () => {
    setSailing(true)
    setTimeout(() => {
      setSelected(null)
      setSailing(false)
    }, 500)
  }

  return (
    <motion.div
      className="world-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label="Developer World map"
    >
      {/* Ocean */}
      <div className="world-ocean">
        {/* Gentle waves */}
        <div className="world-waves world-waves--1" />
        <div className="world-waves world-waves--2" />
        <div className="world-waves world-waves--3" />
      </div>

      {/* Ship path trail */}
      <div className="world-route" aria-hidden="true">
        {WORLD_ISLANDS.map((isl, i) => {
          const next = WORLD_ISLANDS[i + 1]
          if (!next) return null
          return (
            <svg key={i} className="world-route-line" width="200" height="200" style={{ left: `${isl.x}%`, top: `${isl.y}%` }}>
              <line x1="0" y1="0" x2={next.x - isl.x} y2={next.y - isl.y} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 6" />
            </svg>
          )
        })}
      </div>

      {/* Sailing ship */}
      {sailing && (
        <motion.div
          className="world-ship"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          ⛵
        </motion.div>
      )}

      {/* Islands */}
      <div className="world-map">
        {WORLD_ISLANDS.map((island) => (
          <motion.button
            key={island.id}
            className="world-island"
            style={{ left: `${island.x}%`, top: `${island.y}%` }}
            onClick={() => openIsland(island)}
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: selected && selected.id === island.id ? 0 : 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + island.x / 200 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Explore ${island.name}`}
          >
            <span className="world-island-emoji">{island.emoji}</span>
            <span className="world-island-name">{island.name}</span>
            <span className="world-island-tag">{island.tag}</span>
            <span className="world-island-ripple" aria-hidden="true" />
          </motion.button>
        ))}

        {/* Compass */}
        <div className="world-compass" aria-hidden="true">
          <div className="world-compass-rose">🧭</div>
          <span className="world-compass-label">DEV WORLD</span>
        </div>
      </div>

      {/* Header */}
      <div className="world-header">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="world-eyebrow">The Developer World</span>
          <h2 className="world-title">Sail the <span className="text-gradient">Project Archipelago</span></h2>
          <p className="world-sub">Every project is its own island. Click to sail there and explore.</p>
        </motion.div>
        <motion.button
          className="world-exit"
          onClick={handleExit}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Exit world map"
        >
          ✕ Exit
        </motion.button>
      </div>

      {/* Island detail overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="world-island-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeIsland}
          >
            <motion.div
              className="world-island-card"
              initial={{ y: 60, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={`${selected.name} details`}
            >
              <div className="world-card-head">
                <span className="world-card-emoji">{selected.emoji}</span>
                <div>
                  <div className="world-card-name">{selected.name}</div>
                  <div className="world-card-tag">{selected.tag}</div>
                </div>
              </div>

              <p className="world-card-summary">{selected.summary}</p>

              <div className="world-card-section">
                <span className="world-card-label">🧰 Tech Stack</span>
                <div className="world-card-tags">
                  {selected.tech.map((t) => (
                    <span key={t} className="world-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="world-card-section">
                <span className="world-card-label">🧗 Challenges</span>
                <p className="world-card-text">{selected.challenges}</p>
              </div>

              <div className="world-card-actions">
                <a href={selected.github} target="_blank" rel="noopener noreferrer" className="world-btn world-btn--ghost">
                  GitHub ↗
                </a>
                <a href={selected.live} target="_blank" rel="noopener noreferrer" className="world-btn world-btn--primary">
                  Live Demo ↗
                </a>
              </div>

              <button className="world-card-close" onClick={closeIsland} aria-label="Close island details">
                ⛵ Sail Back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="world-legend">
        <span>🛶 Click an island to explore · Esc to sail back</span>
      </div>
    </motion.div>
  )
}

export default World

