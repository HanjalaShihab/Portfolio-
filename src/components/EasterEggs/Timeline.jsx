import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CAREER_MILESTONES } from '../../utils/secretCommands'
import { AchievementStore } from '../../utils/achievements'
import './Timeline.css'

/* ------------------------------------------------------------------
   Timeline — horizontal career journey.
   Milestones expand into rich cards; animated connector lines.
   ------------------------------------------------------------------ */

const Timeline = ({ onExit }) => {
  const [expanded, setExpanded] = useState(null)
  const [leaving, setLeaving] = useState(false)
  const scrollerRef = useRef(null)

  useEffect(() => {
    AchievementStore.unlock('timeline')
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

  const handleWheel = (e) => {
    if (scrollerRef.current) {
      // Convert vertical wheel to horizontal scroll for a "journey" feel
      scrollerRef.current.scrollLeft += e.deltaY
    }
  }

  return (
    <motion.div
      className="timeline-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label="Career timeline"
      onWheel={handleWheel}
    >
      <div className="timeline-header">
        <motion.div
          className="timeline-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="timeline-eyebrow">The Journey</span>
          <h2>Career <span className="text-gradient">Timeline</span></h2>
          <p>Scroll to travel horizontally through the milestones. Click any node to expand.</p>
        </motion.div>

        <motion.button
          className="timeline-exit"
          onClick={handleExit}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Exit timeline"
        >
          ✕ Exit
        </motion.button>
      </div>

      <div className="timeline-track-wrap">
        <div className="timeline-track" ref={scrollerRef}>
          {CAREER_MILESTONES.map((m, i) => {
            const isExpanded = expanded === i
            return (
              <div key={m.title} className="timeline-node-wrap">
                {/* Connector line to next node */}
                {i < CAREER_MILESTONES.length - 1 && (
                  <motion.div
                    className="timeline-connector"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <motion.button
                  className={`timeline-node ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  aria-expanded={isExpanded}
                  aria-label={`${m.title} — ${m.year}`}
                >
                  <span className="timeline-node-year">{m.year}</span>
                  <span className="timeline-node-icon">{m.icon}</span>
                  <span className="timeline-node-title">{m.title}</span>
                </motion.button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="timeline-card"
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="timeline-card-head">
                        <span className="timeline-card-year">{m.year}</span>
                        <span className="timeline-card-title">{m.title}</span>
                      </div>
                      <p className="timeline-card-desc">{m.desc}</p>
                      <div className="timeline-card-section">
                        <span className="timeline-card-label">💡 Technologies</span>
                        <div className="timeline-card-tags">
                          {m.tech.map((t) => (
                            <span key={t} className="timeline-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="timeline-card-section">
                        <span className="timeline-card-label">🧗 Challenges</span>
                        <p className="timeline-card-text">{m.challenges}</p>
                      </div>
                      <div className="timeline-card-section">
                        <span className="timeline-card-label">📌 Lessons</span>
                        <p className="timeline-card-text timeline-card-text--lesson">{m.lessons}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      <div className="timeline-foot-hint">
        <span>◀ ▶ or scroll to travel · click a milestone to expand</span>
      </div>
    </motion.div>
  )
}

export default Timeline

