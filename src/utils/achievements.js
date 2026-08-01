/* ============================================================
   Achievements — localStorage-backed, lightweight.
   `master` is a meta-achievement: it unlocks automatically once
   every BASE achievement is unlocked. `hasAll()` checks the base
   set so the `developer` secret command can gate correctly.
   ============================================================ */

const STORAGE_KEY = 'portfolio-achievements'

export const ACHIEVEMENTS = [
  { id: 'first-visit', label: 'First Visit', emoji: '🏆' },
  { id: 'palette', label: 'Opened Command Palette', emoji: '🏆' },
  { id: 'secret', label: 'Found Secret Command', emoji: '🏆' },
  { id: 'terminal', label: 'Opened Terminal', emoji: '🏆' },
  { id: 'matrix', label: 'Matrix Hacker', emoji: '🏆' },
  { id: 'cat', label: 'Cat Friend', emoji: '🏆' },
  { id: 'resume', label: 'Downloaded Resume', emoji: '🏆' },
  { id: 'github', label: 'Visited GitHub', emoji: '🏆' }
]

export const MASTER_ACHIEVEMENT = { id: 'master', label: 'Secret Master', emoji: '🏆' }

// Base achievements (everything except the meta `master` achievement)
export const BASE_ACHIEVEMENT_IDS = ACHIEVEMENTS.map((a) => a.id)

// Full display list — master is appended at the end
export const ALL_ACHIEVEMENTS = [...ACHIEVEMENTS, MASTER_ACHIEVEMENT]
export const ALL_ACHIEVEMENT_IDS = ALL_ACHIEVEMENTS.map((a) => a.id)

const safeRead = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const safeWrite = (list) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export class AchievementStore {
  static get() {
    return safeRead()
  }

  static isUnlocked(id) {
    return safeRead().includes(id)
  }

  // True when every BASE achievement is unlocked (master not required).
  static hasAll() {
    const current = safeRead()
    return BASE_ACHIEVEMENT_IDS.every((id) => current.includes(id))
  }

  // True when every achievement INCLUDING master is unlocked.
  static hasMaster() {
    return safeRead().includes('master')
  }

  static unlock(id, { onAll } = {}) {
    const current = safeRead()
    if (!current.includes(id)) {
      const next = [...current, id]
      safeWrite(next)

      // Auto-unlock the meta `master` achievement once all base ones are earned.
      if (!next.includes('master') && BASE_ACHIEVEMENT_IDS.every((bid) => next.includes(bid))) {
        safeWrite([...next, 'master'])
      }
      if (onAll && this.hasAll()) onAll()
    }
    return safeRead()
  }
}

