import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SPACE_PLANETS, SPACE_STARS, SPACE_CONSTELLATIONS } from '../../utils/secretCommands'
import { AchievementStore } from '../../utils/achievements'
import './Space.css'

/* ------------------------------------------------------------------
   Space — transform the portfolio into a galaxy.
   Projects are planets, skills are stars, experience is constellations.
   Clicking a planet flies the camera to it (parallax transform).
   ------------------------------------------------------------------ */

const SKILL_STARS = [
  { name: 'Laravel', emoji: '🐘' },
  { name: 'PHP', emoji: '⚙️' },
  { name: 'React', emoji: '⚛️' },
  { name: 'MySQL', emoji: '🗄️' },
  { name: 'Redis', emoji: '⚡' },
  { name: 'Docker', emoji: '🐳' },
  { name: 'Node', emoji: '🟢' },
  { name: 'Python', emoji: '🐍' }
]

const Space = ({ onExit }) => {
  const [selected, setSelected] = useState(null)
  const [flying, setFlying] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const universeRef = useRef(null)

  useEffect(() => {
    AchievementStore.unlock('space')
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
    setTimeout(() => onExit?.(), 400)
  }

  const flyTo = (planet) => {
    if (flying) return
    setFlying(true)
    setTimeout(() => {
      setSelected(planet)
      setFlying(false)
    }, 900)
  }

  const flyBack = () => {
    setFlying(true)
    setTimeout(() => {
      setSelected(null)
      setFlying(false)
    }, 700)
  }

  // Parallax — track mouse
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    setMouse({
      x: (e.clientX / innerWidth - 0.5) * 2,
      y: (e.clientY / innerHeight - 0.5) * 2
    })
  }

  // Slow ambient drift
  const [drift, setDrift] = useState({ x: 0, y: 0 })
  useEffect(() => {
    let raf
    let t = 0
    const loop = () => {
      t += 0.004
      setDrift({ x: Math.sin(t) * 14, y: Math.cos(t * 0.8) * 10 })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Fly-to transform: shift universe so the target planet centers
  const target = selected || null
  const viewX = target ? -(target.x * 3 + mouse.x * 6 - 50) : mouse.x * -12 + drift.x
  const viewY = target ? -(target.y * 3 + mouse.y * 6 - 50) : mouse.y * -10 + drift.y
  const viewScale = selected ? 1.5 : 1

  return (
    <motion.div
      className="space-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      role="dialog"
      aria-modal="true"
      aria-label="Developer galaxy"
    >
      {/* Nebula backdrop */}
      <div className="space-nebula" />

      {/* Universe — parallax layer */}
      <motion.div
        ref={universeRef}
        className="space-universe"
        animate={{ x: viewX, y: viewY, scale: viewScale }}
        transition={{ duration: selected ? 0.9 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Deep space stars */}
        {SPACE_STARS.map((s, i) => (
          <motion.span
            key={i}
            className="space-star"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 3, height: s.r * 3 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Constellations */}
        {SPACE_CONSTELLATIONS.map((c, i) => (
          <div key={i} className="space-constellation" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
            <svg width="120" height="90" className="space-constellation-svg">
              {c.pts.map((pt, j) => {
                const next = c.pts[j + 1]
                if (!next) return null
                return (
                  <line
                    key={j}
                    x1={pt[0] - c.x}
                    y1={pt[1] - c.y}
                    x2={next[0] - c.x}
                    y2={next[1] - c.y}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )
              })}
              {c.pts.map((pt, j) => (
                <circle key={`d${j}`} cx={pt[0] - c.x} cy={pt[1] - c.y} r="3" fill="rgba(255,255,255,0.7)" />
              ))}
            </svg>
            <span className="space-constellation-label">experience</span>
          </div>
        ))}

        {/* Skill stars (stars become skills) */}
        {SKILL_STARS.map((skill, i) => (
          <motion.span
            key={skill.name}
            className="space-skill-star"
            style={{ left: `${8 + i * 11}%`, top: `${70 + (i % 2) * 14}%` }}
            animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            title={skill.name}
          >
            {skill.emoji}
          </motion.span>
        ))}

        {/* Planets (projects) */}
        {SPACE_PLANETS.map((planet) => (
          <motion.button
            key={planet.id}
            className="space-planet"
            style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
            onClick={() => flyTo(planet)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Fly to ${planet.name}`}
          >
            <motion.span
              className="space-planet-body"
              style={{
                width: planet.size,
                height: planet.size,
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}55 70%, #000 130%)`,
                '--orbit-duration': `${planet.orbit}s`
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: planet.orbit * 4, repeat: Infinity, ease: 'linear' }}
            >
              <span className="space-planet-emoji">{planet.emoji}</span>
            </motion.span>
            <span className="space-planet-name">{planet.name}</span>
            <span className="space-planet-ring" style={{ borderColor: `${planet.color}88` }} />
          </motion.button>
        ))}
      </motion.div>

      {/* Header */}
      <div className="space-header">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="space-eyebrow">The Developer Galaxy</span>
          <h2 className="space-title">Projects are <span className="space-gradient">planets</span></h2>
          <p className="space-sub">Skills are stars · Experience is constellations. Click a planet to fly to it.</p>
        </motion.div>
        <motion.button
          className="space-exit"
          onClick={handleExit}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Exit space"
        >
          ✕ Exit
        </motion.button>
      </div>

      {/* Fly transition flash */}
      <AnimatePresence>
        {flying && (
          <motion.div
            className="space-warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>

      {/* Planet info card */}
      <AnimatePresence>
        {selected && !flying && (
          <motion.div
            className="space-planet-card"
            initial={{ y: 50, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-card-head">
              <span className="space-card-emoji">{selected.emoji}</span>
              <div>
                <div className="space-card-name">{selected.name}</div>
                <div className="space-card-tag">{selected.tag}</div>
              </div>
            </div>
            <p className="space-card-desc">{selected.desc}</p>
            <div className="space-card-actions">
              <a href={selected.github} target="_blank" rel="noopener noreferrer" className="space-btn space-btn--ghost">
                GitHub ↗
              </a>
              <a href={selected.live} target="_blank" rel="noopener noreferrer" className="space-btn space-btn--primary">
                Live Demo ↗
              </a>
            </div>
            <button className="space-card-back" onClick={flyBack} aria-label="Fly back">
              🚀 Fly Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="space-legend">
        <span>🪐 Click a planet to fly to it · Esc returns to orbit</span>
      </div>
    </motion.div>
  )
}

export default Space

