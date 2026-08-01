import { useEffect, useState } from 'react'

/* ============================================================
   Retro Mode — CRT scanline overlay + pixel font + retro badge.
   Toggleable: press "Exit Retro" or type `konami` again.
   Uses WebAudio for a tiny retro bleep (degrades gracefully).
   ============================================================ */

const playBleep = () => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 440
    gain.gain.value = 0.04
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.18)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
    osc.start(now)
    osc.stop(now + 0.24)
    setTimeout(() => ctx.close(), 400)
  } catch {
    // Audio unavailable — ignore
  }
}

const RetroMode = ({ onExit }) => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    playBleep()
  }, [])

  return active ? (
    <div className="retro-mode" role="presentation" aria-hidden="false">
      <div className="crt-overlay" />
      <div className="retro-badge">
        <span className="retro-blink">▶</span> RETRO MODE
        <button className="retro-exit" onClick={onExit} aria-label="Exit retro mode">✕</button>
      </div>
      <button className="retro-dismiss" onClick={() => { playBleep(); setActive(false); onExit && onExit() }} aria-label="Exit retro mode">
        EXIT RETRO [ESC/K]
      </button>
    </div>
  ) : null
}

export default RetroMode

