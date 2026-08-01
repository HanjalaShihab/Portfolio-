import { useEffect, useRef } from 'react'

/* ============================================================
   Matrix Mode — full-screen green "digital rain" overlay.
   Auto-stops after ~10 seconds and notifies parent.
   ============================================================ */
const MatrixMode = ({ onDone, duration = 10000 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]$@#%&+=*'
    const fontSize = 16
    let columns
    let drops = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array.from({ length: columns }, () => Math.random() * (canvas.height / fontSize))
    }

    resize()
    window.addEventListener('resize', resize)

    // Dark fill so old columns stay behind
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let raf
    const tick = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `bold ${fontSize}px monospace`
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = '#00ff66'
        ctx.fillText(ch, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        } else {
          drops[i] += 1
        }
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const timer = setTimeout(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      onDone()
    }, duration)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      window.removeEventListener('resize', resize)
    }
  }, [onDone, duration])

  return (
    <div className="matrix-mode" role="presentation" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default MatrixMode

