/* ============================================================
   Secret command registry + data for the hidden Easter egg layer.
   These commands are NEVER rendered in the palette list/search —
   they only execute on an EXACT full match in the input.
   ============================================================ */

// Exact input (lowercased, trimmed) -> internal handler key
const SECRET_EXACT = {
  terminal: 'terminal',
  matrix: 'matrix',
  cat: 'cat',
  quote: 'quote',
  achievements: 'achievements',
  ask: 'ask',
  'sudo hire hanjala': 'hire',
  'rm -rf /': 'rm',
  coffee: 'coffee',
  fortune: 'fortune',
  joke: 'joke',
  '42': '42',
  hello: 'hello',
  'make me rich': 'rich',
  konami: 'konami',
  developer: 'developer',
  office: 'office',
  portfolioos: 'portfolioos',
  timeline: 'timeline',
  world: 'world',
  space: 'space'
}

export const getSecretKey = (input) => {
  const key = String(input || '').trim().toLowerCase()
  return SECRET_EXACT[key] || null
}

/* ------------------------------------------------------------
   Data pools
   ------------------------------------------------------------ */
export const PROGRAMMING_QUOTES = [
  'Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson',
  'Simplicity is the soul of efficiency. — Austin Freeman',
  'First, solve the problem. Then, write the code. — John Johnson',
  'Code is like humor. When you have to explain it, it’s bad. — Cory House',
  'Make it work, make it right, make it fast. — Kent Beck',
  'The best way to predict the future is to invent it. — Alan Kay',
  'Talk is cheap. Show me the code. — Linus Torvalds'
]

export const FORTUNES = [
  "Today's prediction:\nYour next bug will disappear after one console.log().",
  "Today's prediction:\nThe code you delete today saves you hours tomorrow.",
  "Today's prediction:\nA merge conflict is coming. Stay calm and pull first.",
  "Today's prediction:\nYour tests will pass on the first run. (Unlikely, but possible.)",
  "Today's prediction:\nYou will write more code today than you delete. Maybe.",
  "Today's prediction:\nThe stray bug will be recreated in production. Good luck."
]

export const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'There are only 10 kinds of people: those who understand binary and those who don’t.',
  'Why do Java developers wear glasses? Because they can’t C#.',
  'How many programmers does it take to change a light bulb? None, that’s a hardware problem.',
  'I would tell you a UDP joke, but you might not get it.'
]

export const COFFEE_JOKES = [
  'Coffee.js: a framework that turns sleep into dependency injection.',
  'How do you comfort a JavaScript bug? You console it. (After coffee.)',
  'My code works — I have no idea why. My coffee is also a mystery.',
  'Decaf is just a hoax invented by people who don’t ship.',
  'Programmer: a machine that turns coffee into code.'
]

export const CAT_LINES = [
  'meow',
  'Need more RAM.',
  '404: Fish not found.',
  'sudo pet cat',
  'meow?',
  'segfault… purring anyway',
  'Ctrl+C to stop pets'
]

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

/* ------------------------------------------------------------
   Local portfolio knowledge base for the `ask` assistant.
   No external AI — pure local keyword matching.
   ------------------------------------------------------------ */
export const KNOWLEDGE = [
  {
    keywords: ['who', 'hanjala', 'about', 'name', 'him', 'himself', 'intro'],
    answer:
      'Hanjala Shihab is a backend-focused software engineer specializing in Laravel, PHP and full-stack development. He turns ideas into reliable, scalable products with clean architecture and thoughtful APIs.'
  },
  {
    keywords: ['technolog', 'stack', 'skill', 'laravel', 'react', 'php', 'using', 'used', 'language'],
    answer:
      'Core stack: Laravel, PHP, React, MySQL, MongoDB, Redis, Docker, Node.js, Express and Python. Also comfortable with Tailwind, Bootstrap, Git, GitHub Actions, Postman, Vercel and AWS basics. Currently learning Go and Kubernetes.'
  },
  {
    keywords: ['best', 'favourite', 'favorite', 'project', 'kanban', 'recent', 'top', 'build'],
    answer:
      "The favourite build is 'Kanban Flow' — a real-time collaborative Kanban board built with Laravel 11, Livewire 3 and Laravel Reverb for instant WebSocket sync, role-based workspaces and optimistic drag-and-drop."
  },
  {
    keywords: ['education', 'university', 'study', 'cse', 'degree', 'college', 'academic'],
    answer:
      'Hanjala is studying Computer Science & Engineering at Daffodil International University (started 2023) — where curiosity turned into structured engineering practice across PHP, Laravel, React and system design.'
  },
  {
    keywords: ['experience', 'year', 'work', 'career', 'job', 'professional', 'level', 'senior'],
    answer:
      '4+ years of hands-on experience and 30+ projects shipped across Laravel, PHP, React and Node.js — from REST APIs and authentication to real-time apps, AI integrations and deployment pipelines.'
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'connect', 'message', 'available'],
    answer:
      'Reach out via email at shihab2305341402@diu.edu.bd or connect on LinkedIn (linkedin.com/in/h-m-shihab). He is currently available for internships, freelance work and collaborations.'
  },
  {
    keywords: ['ai', 'openai', 'machine', 'llm', 'integration'],
    answer:
      'Hanjala integrates AI into products using the OpenAI API — chat completion, embeddings, prompt engineering and cost-controlled streaming features with feature flags.'
  }
]

export const UNKNOWN_ANSWER =
  "Hmm — that is outside my knowledge base. Try asking about Hanjala, his tech stack, projects, education, experience, AI work, or how to contact him."

/* ------------------------------------------------------------
   Phase 2 — Hidden Experience data pools
   ------------------------------------------------------------ */

// `office` — pixel-art developer workspace
export const OFFICE_QUOTES = [
  'Every expert was once a beginner. Keep shipping. 🌱',
  'The best error message is the one that never happens.',
  'Code is read more than it is written. Make it readable.',
  'Great things never come from comfort zones.',
  'A little progress each day adds up to big results.'
]

export const OFFICE_GOALS = [
  { icon: '🎯', title: 'Master System Design', desc: 'Scale backend architectures with confidence.' },
  { icon: '🧠', title: 'AI-Powered Products', desc: 'Ship more LLM integrations into real products.' },
  { icon: '🚀', title: 'Go & Kubernetes', desc: 'Level up the cloud-native engineering toolkit.' },
  { icon: '📚', title: 'Open Source', desc: 'Contribute meaningful libraries to the community.' }
]

export const OFFICE_SKILLS = [
  'Laravel', 'PHP', 'React', 'MySQL', 'Redis',
  'Docker', 'Node.js', 'Python', 'REST APIs', 'System Design'
]

// `timeline` — horizontal career journey
export const CAREER_MILESTONES = [
  {
    year: '2022',
    title: 'Started Programming',
    icon: '💻',
    desc: 'Wrote the first lines of code and fell in love with problem solving.',
    tech: ['Python', 'Logic Building'],
    challenges: 'Understanding how computers actually execute instructions.',
    lessons: 'Consistency beats intensity — code a little every single day.'
  },
  {
    year: '2022',
    title: 'First Website',
    icon: '🌐',
    desc: 'Hand-crafted a static website with HTML, CSS and a sprinkle of JavaScript.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    challenges: 'Making it look good in every browser and screen size.',
    lessons: 'Semantic structure and responsive design matter from day one.'
  },
  {
    year: '2023',
    title: 'Learned JavaScript',
    icon: '⚡',
    desc: 'Deep-dived into ES6+, async patterns and the DOM.',
    tech: ['JavaScript', 'DOM', 'ES6+'],
    challenges: 'Wrapping the head around closures and the event loop.',
    lessons: 'Async thinking unlocks the entire modern web.'
  },
  {
    year: '2024',
    title: 'Built First Laravel Project',
    icon: '🐘',
    desc: 'Shipped a full CRUD application with authentication and a real database.',
    tech: ['Laravel', 'MySQL', 'Blade', 'Eloquent'],
    challenges: 'Migrations, relationships and keeping queries fast.',
    lessons: 'Frameworks are superpowers when you understand the fundamentals.'
  },
  {
    year: '2025',
    title: 'Built AI Projects',
    icon: '🤖',
    desc: 'Integrated OpenAI APIs — chat, embeddings and prompt engineering.',
    tech: ['OpenAI API', 'Python', 'React'],
    challenges: 'Streaming responses, cost control and prompt quality.',
    lessons: 'AI is a tool; the engineer still designs the experience.'
  },
  {
    year: '2025',
    title: 'Backend Development',
    icon: '🗄️',
    desc: 'Focused on REST APIs, system design and production-grade architecture.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker'],
    challenges: 'Designing resilient systems that survive real traffic.',
    lessons: 'Reliability is a feature. Design for failure.'
  },
  {
    year: 'Now',
    title: 'Present',
    icon: '🚀',
    desc: 'Building the hidden ecosystem you are exploring right now.',
    tech: ['React', 'Laravel', 'Everything Above'],
    challenges: 'Keeping delight hidden behind a professional facade.',
    lessons: 'The best products reward curiosity.'
  }
]

// `world` — fictional Developer World islands
export const WORLD_ISLANDS = [
  {
    id: 'kanban',
    name: 'Kanban Island',
    tag: 'Realtime • Laravel',
    emoji: '🗿',
    x: 18, y: 32,
    summary: 'A real-time collaborative Kanban board with instant multi-user sync over WebSockets.',
    tech: ['Laravel 11', 'Livewire', 'Reverb', 'MySQL', 'Alpine.js'],
    challenges: 'Optimistic drag-and-drop across concurrent editors + scoping real-time channels per workspace.',
    github: '#',
    live: '#'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Island',
    tag: 'React • Framer Motion',
    emoji: '🏝️',
    x: 42, y: 22,
    summary: 'This very portfolio — a premium interactive engineering showcase with a hidden ecosystem.',
    tech: ['React', 'Framer Motion', 'CSS3', 'Vite'],
    challenges: 'Balancing rich interactivity with Lighthouse performance and accessibility.',
    github: 'https://github.com/HanjalaShihab/Portfolio-',
    live: 'https://hanjala-shihab.vercel.app/'
  },
  {
    id: 'ai',
    name: 'AI Island',
    tag: 'OpenAI • Python',
    emoji: '🤖',
    x: 64, y: 38,
    summary: 'AI-powered products — chat completion, embeddings and prompt engineering.',
    tech: ['OpenAI API', 'Python', 'React'],
    challenges: 'Streaming responses, cost control and feature-flag-gated releases.',
    github: 'https://github.com/HanjalaShihab',
    live: '#'
  },
  {
    id: 'chatbot',
    name: 'Chatbot Island',
    tag: 'Conversational AI',
    emoji: '💬',
    x: 30, y: 58,
    summary: 'Context-aware assistants with retrieval and smooth conversation flow.',
    tech: ['OpenAI', 'Node.js', 'React'],
    challenges: 'Keeping context windows small while preserving conversation memory.',
    github: 'https://github.com/HanjalaShihab',
    live: '#'
  },
  {
    id: 'dengue',
    name: 'Dengue Project Island',
    tag: 'Data • Public Good',
    emoji: '🦟',
    x: 55, y: 62,
    summary: 'Data-driven dengue outbreak insights and dashboards for public awareness.',
    tech: ['Python', 'Data Analysis', 'React'],
    challenges: 'Cleaning messy public-health datasets and presenting clear insights.',
    github: 'https://github.com/HanjalaShihab',
    live: '#'
  }
]

// `space` — galaxy bodies (projects as planets)
export const SPACE_PLANETS = [
  {
    id: 'adv',
    name: 'Adv Platform',
    tag: 'MERN • Advertising',
    emoji: '🪐',
    size: 72,
    color: '#8B5CF6',
    x: 20, y: 30,
    orbit: 16,
    desc: 'Full-stack advertising platform for campaigns, ads and analytics.',
    github: 'https://github.com/HanjalaShihab/Adv',
    live: 'https://adv-one.vercel.app/'
  },
  {
    id: 'kanban-planet',
    name: 'Kanban Flow',
    tag: 'Laravel • Realtime',
    emoji: '🌍',
    size: 64,
    color: '#22D3EE',
    x: 48, y: 22,
    orbit: 10,
    desc: 'Real-time collaborative Kanban board over WebSockets.',
    github: '#',
    live: '#'
  },
  {
    id: 'gallery-planet',
    name: "Mozammel's Gallery",
    tag: 'React • Node',
    emoji: '🎨',
    size: 58,
    color: '#F59E0B',
    x: 74, y: 34,
    orbit: 13,
    desc: 'Interactive art gallery showcase with a modern immersive UI.',
    github: 'https://github.com/HanjalaShihab/mozammels-gallery',
    live: 'https://mozammels-gallery.netlify.app/'
  },
  {
    id: 'ai-planet',
    name: 'AI Projects',
    tag: 'OpenAI • Python',
    emoji: '🤖',
    size: 60,
    color: '#34D399',
    x: 30, y: 60,
    orbit: 14,
    desc: 'LLM integrations, embeddings and intelligent assistants.',
    github: 'https://github.com/HanjalaShihab',
    live: '#'
  },
  {
    id: 'fun-planet',
    name: 'Fun Portal',
    tag: 'MERN • Community',
    emoji: '🎢',
    size: 54,
    color: '#F87171',
    x: 62, y: 66,
    orbit: 12,
    desc: 'Entertainment portal with dynamic content and admin controls.',
    github: 'https://github.com/HanjalaShihab/Fun-Portal',
    live: 'https://fun-portal.vercel.app/'
  }
]

export const SPACE_STARS = [
  { x: 12, y: 12, r: 2 }, { x: 88, y: 8, r: 3 }, { x: 70, y: 14, r: 2 },
  { x: 35, y: 8, r: 2 }, { x: 8, y: 48, r: 3 }, { x: 92, y: 52, r: 2 },
  { x: 15, y: 80, r: 2 }, { x: 82, y: 84, r: 3 }, { x: 50, y: 90, r: 2 },
  { x: 28, y: 72, r: 2 }, { x: 68, y: 78, r: 2 }, { x: 45, y: 45, r: 3 }
]

export const SPACE_CONSTELLATIONS = [
  { x: 22, y: 20, pts: [[22, 20], [26, 15], [30, 21], [26, 26]] },
  { x: 55, y: 40, pts: [[55, 40], [60, 36], [63, 42], [57, 46]] },
  { x: 76, y: 62, pts: [[76, 62], [81, 58], [84, 65], [78, 70]] }
]

// `portfolioos` — desktop apps metadata
export const OS_APPS = [
  { id: 'projects', label: 'Projects', icon: '📁' },
  { id: 'terminal', label: 'Terminal', icon: '💻' },
  { id: 'resume', label: 'Resume', icon: '📄' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'journal', label: 'Developer Journal', icon: '📓' },
  { id: 'browser', label: 'Browser', icon: '🌐' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'about', label: 'About', icon: '👤' }
]

export const DEV_JOURNAL_ENTRIES = [
  { date: '2025-01', title: 'Realtime epiphany', body: 'Livewire + Reverb made collaborative editing feel effortless. WebSockets are magic when scoped right.' },
  { date: '2025-03', title: 'AI cost control', body: 'Streaming + feature flags keep LLM bills sane. Never ship AI without an off switch.' },
  { date: '2025-06', title: 'The hidden ecosystem', body: 'A portfolio that rewards curiosity. Every Easter egg is a tiny love letter to exploration.' },
  { date: '2025-09', title: 'System design mindset', body: 'Reliability is a feature. Caching, queues, backpressure — design for the worst day.' }
]

export const OS_WALLPAPERS = [
  { id: 'nebula', label: 'Nebula', value: 'linear-gradient(135deg, #0b0b1a 0%, #1a1040 45%, #0b3a4a 100%)' },
  { id: 'sunset', label: 'Sunset', value: 'linear-gradient(135deg, #2a0e3d 0%, #8a2b3f 50%, #e59a4b 100%)' },
  { id: 'forest', label: 'Forest', value: 'linear-gradient(135deg, #0a1f16 0%, #143d2a 50%, #0e5b46 100%)' },
  { id: 'ocean', label: 'Ocean', value: 'linear-gradient(135deg, #021b2f 0%, #0e4a68 50%, #1e8c9e 100%)' }
]

export const OS_ACCENTS = [
  { id: 'indigo', label: 'Indigo', value: '#8B5CF6' },
  { id: 'cyan', label: 'Cyan', value: '#22D3EE' },
  { id: 'emerald', label: 'Emerald', value: '#34D399' },
  { id: 'rose', label: 'Rose', value: '#F87171' },
  { id: 'amber', label: 'Amber', value: '#FBBF24' }
]

