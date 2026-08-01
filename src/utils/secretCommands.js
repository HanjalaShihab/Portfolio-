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
  developer: 'developer'
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

