import { useState } from 'react'
import { FiX, FiSend } from 'react-icons/fi'
import {
  KNOWLEDGE,
  UNKNOWN_ANSWER
} from '../../utils/secretCommands'

/* ============================================================
   Miniature local AI assistant — answers ONLY questions about
   the portfolio using a keyword-based local knowledge base.
   No external API, no network calls.
   ============================================================ */
const SUGGESTIONS = [
  'Who is Hanjala?',
  'What technologies does he use?',
  'Best Laravel project?',
  'Education?',
  'Experience?',
  'Contact?'
]

const scoreByKeyword = (text) => {
  const body = text.toLowerCase()
  return KNOWLEDGE.map((entry) => {
    const hits = entry.keywords.filter((k) => body.includes(k)).length
    return { entry, hits }
  }).sort((a, b) => b.hits - a.hits)
}

const AskAssistant = ({ onClose }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: "Hi! I'm a tiny local assistant built into this portfolio. Ask me anything about Hanjala, his stack, projects, education, experience, AI work or contact info."
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const ask = (raw) => {
    const q = (raw || '').trim()
    if (!q) return

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: q }
    ])
    setInput('')

    setIsTyping(true)
    setTimeout(() => {
      const ranked = scoreByKeyword(q)
      const best = ranked[0]
      const answer =
        best && best.hits > 0
          ? best.entry.answer
          : UNKNOWN_ANSWER
      setMessages((prev) => [
        ...prev,
        { from: 'ai', text: answer }
      ])
      setIsTyping(false)
    }, 420 + Math.random() * 420)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <div className="easter-panel ask-assistant" role="dialog" aria-modal="true" aria-label="Portfolio assistant">
      <div className="easter-panel-head">
        <h3 className="easter-panel-title">Ask me about the portfolio</h3>
        <button className="easter-panel-close" onClick={onClose} aria-label="Close assistant">
          <FiX size={20} />
        </button>
      </div>

      <div className="ask-messages" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`ask-msg ask-msg--${m.from}`}>
            {m.text}
          </div>
        ))}
        {isTyping && (
          <div className="ask-msg ask-msg--ai ask-msg--typing">
            <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
          </div>
        )}
      </div>

      <div className="ask-suggestions" role="group" aria-label="Example questions">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="ask-suggestion" onClick={() => ask(s)}>
            {s}
          </button>
        ))}
      </div>

      <form className="ask-form" onSubmit={handleSubmit}>
        <input
          className="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Hanjala…"
          aria-label="Ask a question"
          autoFocus
        />
        <button type="submit" className="ask-send" aria-label="Send question">
          <FiSend size={16} />
        </button>
      </form>
    </div>
  )
}

export default AskAssistant

