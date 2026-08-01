import { useEffect, useRef, useState } from 'react'
import { CAT_LINES, pick } from '../../utils/secretCommands'

/* ============================================================
   Pixel Cat — a tiny pixel-art cat that walks across the
   bottom of the screen with a random speech bubble, then leaves.
   ============================================================ */
const PixelCat = ({ onDone, walkDuration = 9000 }) => {
  const [bubble, setBubble] = useState('')
  const [hasBubble, setHasBubble] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const line = pick(CAT_LINES)
    const showBubble = setTimeout(() => {
      setBubble(line)
      setHasBubble(true)
    }, 900)
    const bubbleOff = setTimeout(() => setHasBubble(false), 2200)
    const walkTimer = setTimeout(() => {
      setDone(true)
    }, walkDuration)

    return () => {
      clearTimeout(showBubble)
      clearTimeout(bubbleOff)
      clearTimeout(walkTimer)
    }
  }, [walkDuration])

  // Report completion to the parent AFTER the exit animation.
  useEffect(() => {
    if (!done) return undefined
    const t = setTimeout(() => onDone?.(), 950)
    return () => clearTimeout(t)
  }, [done, onDone])

  return (
    <div className={`pixel-cat-wrap ${done ? 'is-leaving' : ''}`} ref={ref} aria-label="A pixel cat walks across the screen">
      {hasBubble && <div className="pixel-cat-bubble">{bubble}</div>}
      <div className="pixel-cat" aria-hidden="true">
        {/* Pixel art row by row */}
        <div className="pc-row"><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="pc-row"><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="pc-row"><span /><span className="on" /><span className="on" /><span /><span className="on" /><span className="on" /><span /></div>
        <div className="pc-row"><span /><span className="on" /><span /><span /><span /><span className="on" /><span /></div>
        <div className="pc-row"><span /><span className="on" /><span className="on" /><span /><span className="on" /><span className="on" /><span /></div>
        <div className="pc-row"><span /><span className="on" /><span /><span /><span /><span className="on" /><span /></div>
        <div className="pc-row"><span className="on" /><span className="on" /><span className="on" /><span className="on" /><span className="on" /><span className="on" /><span className="on" /></div>
      </div>
    </div>
  )
}

export default PixelCat

