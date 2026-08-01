import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { ALL_ACHIEVEMENTS, AchievementStore } from '../../utils/achievements'

/* ============================================================
   Achievements panel.
   Locked achievements render dimmed; nothing is manually
   unlockable — progress only comes from genuine actions.
   ============================================================ */
const AchievementsPanel = ({ onClose }) => {
  const [unlocked, setUnlocked] = useState(() => AchievementStore.get())

  return (
    <div className="easter-panel" role="dialog" aria-modal="true" aria-label="Achievements">
      <div className="easter-panel-head">
        <h3 className="easter-panel-title">🏆 Achievements</h3>
        <button className="easter-panel-close" onClick={onClose} aria-label="Close achievements">
          <FiX size={20} />
        </button>
      </div>
      <p className="easter-panel-sub">
        {unlocked.length}/{ALL_ACHIEVEMENTS.length} unlocked
      </p>
      <div className="achievements-grid">
        {ALL_ACHIEVEMENTS.map((a) => {
          const has = unlocked.includes(a.id)
          return (
            <div key={a.id} className={`achievement-cell ${has ? 'is-unlocked' : 'is-locked'}`} aria-label={`${a.label}: ${has ? 'unlocked' : 'locked'}`}>
              <span className="achievement-emoji" aria-hidden="true">{has ? a.emoji : '🔒'}</span>
              <span className="achievement-label">{a.label}</span>
            </div>
          )
        })}
      </div>
      <p className="achievements-hint">
        Tip: explore the hidden commands to unlock these — type <code>terminal</code>, <code>matrix</code>, <code>cat</code> or just check your <code>achievements</code>.
      </p>
    </div>
  )
}

export default AchievementsPanel

