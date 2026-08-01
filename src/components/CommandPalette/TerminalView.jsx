import { useCallback, useEffect, useRef, useState } from 'react'
import resume from '../../assets/hanjala_resume.pdf'

/* ============================================================
   Fake shell inside the command palette.
   Prompt: h a n j a l a @ p o r t f o l i o : ~ $
   ============================================================ */

const PROMPT = 'hanjala@portfolio:~$'

const HELP_TEXT = `Available commands:
  help                 Show this help
  about                Short introduction
  skills               Tech stack overview
  projects             Case studies & builds
  resume               Download resume
  contact              Contact details
  github               Open GitHub profile
  linkedin             Open LinkedIn profile
  pwd                  Print working directory
  ls                   List portfolio files
  whoami               Who you are talking to
  history              Command history
  neofetch             System summary (it’s a portfolio)
  cat about.md         Read the intro
  cat resume.txt       Read a text summary of the résumé
  clear                Clear the terminal
  exit                 Return to the command palette`

const ABOUT_MD = `# Hanjala Shihab

Backend / Full Stack engineer specializing in Laravel, PHP & React.
I design resilient APIs, robust data models, and production-grade
web applications — with the engineering rigor recruiters look for.`

const RESUME_TXT = `HANJALA SHIHAB — RESUME SUMMARY
Role: Backend / Laravel / Full Stack Developer
Experience: 4+ years · 30+ projects shipped
Stack: Laravel, PHP, React, Node.js, MySQL, MongoDB, Redis, Docker
Focus: REST APIs, clean architecture, AI integration, system design
Education: CSE @ Daffodil International University (2023–)
Contact: shihab2305341402@diu.edu.bd
(Press "resume" to download the full PDF.)`

const SKILLS_TEXT = `Tech stack:
  Backend   → Laravel, PHP, Node.js, Express, REST APIs, Python
  Frontend  → React, JavaScript, Tailwind, Bootstrap, HTML5, CSS3
  Database  → MySQL, MongoDB, Redis, Firebase
  Cloud/Ops → Docker, Vercel, cPanel, AWS basics, CI/CD
  AI        → OpenAI API, AI integration, chatbot systems`

const PROJECTS_TEXT = `Case studies & builds:
  1. Kanban Flow      — realtime collab Kanban (Laravel 11, Livewire, Reverb)
  2. Adv Platform     — full-stack ad campaign dashboard (MERN)
  3. Mozammel’s Gallery — immersive art gallery SPA
  4. Fun Portal       — content portal with admin moderation
Type "projects" from the palette for the full showcase.`

const CONTACT_TEXT = `  Email: shihab2305341402@diu.edu.bd
  GitHub: github.com/HanjalaShihab
  LinkedIn: linkedin.com/in/h-m-shihab
  — Open for internships, freelance & collaboration.`

const NEOFETCH = `       .--.          hanjala@portfolio
      |o_o |         -----------------
      |:_/ |         OS:       Arch Portfolio Linux
     //   \\ \\        Shell:    zsh
    (|     | )       Editor:   VS Code
   /'\\_   _/` + '`' + `\\        Stack:    Laravel · PHP · Python · JavaScript
   \\___)=(___/       Theme:    Current portfolio theme
                     Uptime:    Since the first commit
                     Contact:   shihab2305341402@diu.edu.bd`

const runStatic = (cmd, historyRef) => {
  switch (cmd) {
    case 'help':
      return HELP_TEXT
    case 'whoami':
      return `Hanjala Shihab\n\nBackend Developer\nLaravel Enthusiast\nLinux User\nAlways building.`
    case 'pwd':
      return '/home/hanjala/portfolio'
    case 'ls':
      return `about.md\nskills.json\nprojects/\nresume.pdf\ncontact.txt`
    case 'cat about.md':
      return ABOUT_MD
    case 'cat resume.txt':
      return RESUME_TXT
    case 'about':
      return ABOUT_MD
    case 'skills':
      return SKILLS_TEXT
    case 'projects':
      return PROJECTS_TEXT
    case 'contact':
      return CONTACT_TEXT
    case 'neofetch':
      return NEOFETCH
    case 'history':
      return historyRef.current.length
        ? historyRef.current.map((h, i) => `${i + 1}  ${h}`).join('\n')
        : 'No commands in history yet.'
    default:
      return `bash: ${cmd}: command not found`
  }
}

const TerminalView = ({ onExit }) => {
  const [lines, setLines] = useState([
    { type: 'out', text: 'Welcome to the hidden terminal. Type help for a list of commands.' }
  ])
  const [input, setInput] = useState('')
  const historyRef = useRef([])
  const historyIndexRef = useRef(-1)
  const bodyRef = useRef(null)

  const pushLine = useCallback((text, type = 'out') => {
    setLines((prev) => [...prev, { type, text }])
  }, [])

  // Autoscroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  const handleEnter = useCallback(() => {
    const raw = input.trim()
    if (!raw) {
      pushLine('')
      return
    }
    setLines((prev) => [...prev, { type: 'cmd', text: raw }])
    historyRef.current = [...historyRef.current, raw]
    historyIndexRef.current = -1
    setInput('')

    if (raw === 'clear') {
      setLines([{ type: 'out', text: 'Cleared.' }])
      return
    }
    if (raw === 'exit') {
      onExit()
      return
    }
    if (raw === 'resume') {
      window.open(resume, '_self', 'noopener,noreferrer')
      pushLine('Opening resume.pdf …')
      return
    }
    if (raw === 'github') {
      window.open('https://github.com/HanjalaShihab', '_blank', 'noopener,noreferrer')
      pushLine('Opening https://github.com/HanjalaShihab …')
      return
    }
    if (raw === 'linkedin') {
      window.open('https://www.linkedin.com/in/h-m-shihab-a98039350/', '_blank', 'noopener,noreferrer')
      pushLine('Opening LinkedIn …')
      return
    }
    pushLine(runStatic(raw, historyRef))
  }, [input, onExit, pushLine])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleEnter()
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const hist = historyRef.current
      if (!hist.length) return
      const next = historyIndexRef.current === -1
        ? hist.length - 1
        : Math.max(0, historyIndexRef.current - 1)
      historyIndexRef.current = next
      setInput(hist[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const hist = historyRef.current
      if (!hist.length) return
      if (historyIndexRef.current === -1) return
      const next = historyIndexRef.current + 1
      if (next >= hist.length) {
        historyIndexRef.current = -1
        setInput('')
      } else {
        historyIndexRef.current = next
        setInput(hist[next])
      }
      return
    }
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
      return
    }
  }

  return (
    <div className="hidden-terminal">
      <div className="hidden-terminal-bar">
        <span className="ht-dot ht-dot--r" />
        <span className="ht-dot ht-dot--y" />
        <span className="ht-dot ht-dot--g" />
        <span className="hidden-terminal-title">hanjala@portfolio: ~ — bash</span>
      </div>
      <div className="hidden-terminal-body" ref={bodyRef} aria-label="Terminal output">
        {lines.map((line, i) =>
          line.type === 'cmd' ? (
            <div className="ht-line" key={i}>
              <span className="ht-prompt">{PROMPT}</span>
              <span className="ht-input-show">{line.text}</span>
            </div>
          ) : (
            <pre className={`ht-out ${line.text === '' ? 'ht-out--blank' : ''}`} key={i}>
              {line.text}
            </pre>
          )
        )}
        <div className="ht-line ht-line--live">
          <span className="ht-prompt">{PROMPT}</span>
          <input
            className="ht-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </div>
  )
}

export default TerminalView

