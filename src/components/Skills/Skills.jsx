import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaPhp,
  FaBootstrap,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaAws
} from 'react-icons/fa'
import {
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiLaravel,
  SiRedis,
  SiPostman,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiFirebase,
  SiGithub
} from 'react-icons/si'
import { FiBox, FiServer, FiTerminal } from 'react-icons/fi'
import './Skills.css'

const skillCategories = [
  {
    id: 'backend',
    title: 'Backend',
    icon: FiServer,
    layout: 'large',
    accent: '#8B5CF6',
    skills: [
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', level: 'Expert', years: 3, projects: 12, desc: 'Eloquent ORM, Middleware, Queues, Policies, REST APIs.' },
      { name: 'PHP', icon: FaPhp, color: '#8993BE', level: 'Expert', years: 4, projects: 15, desc: 'OOP, PDO, Composer packages, legacy & modern codebases.' },
      { name: 'Node.js', icon: FaNodeJs, color: '#339933', level: 'Advanced', years: 3, projects: 8, desc: 'Express servers, REST & realtime backends, RESTful design.' },
      { name: 'Express.js', icon: SiExpress, color: '#9BA4B5', level: 'Advanced', years: 3, projects: 7, desc: 'Middleware pipelines, routing, error handling, API auth.' },
      { name: 'REST API Design', icon: FiTerminal, color: '#22D3EE', level: 'Expert', years: 4, projects: 14, desc: 'Versioning, validation, JWT, rate limiting, documentation.' },
      { name: 'Python', icon: FaPython, color: '#3776AB', level: 'Comfortable', years: 2, projects: 5, desc: 'Scripting, data processing, AI integrations, automation.' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: FiBox,
    layout: 'wide',
    accent: '#22D3EE',
    skills: [
      { name: 'React', icon: FaReact, color: '#61DAFB', level: 'Advanced', years: 3, projects: 10, desc: 'Hooks, state management, SPAs, component architecture.' },
      { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', level: 'Expert', years: 4, projects: 16, desc: 'ES6+, async patterns, DOM, tooling, bundlers.' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 'Advanced', years: 2, projects: 8, desc: 'Utility-first styling, responsive systems, design tokens.' },
      { name: 'Bootstrap 5', icon: FaBootstrap, color: '#7952B3', level: 'Advanced', years: 3, projects: 9, desc: 'Rapid prototyping, grid systems, components, theming.' },
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26', level: 'Expert', years: 4, projects: 18, desc: 'Semantic markup, accessibility, SEO-friendly structure.' },
      { name: 'CSS3', icon: FaCss3, color: '#1572B6', level: 'Expert', years: 4, projects: 18, desc: 'Flexbox/Grid, animations, custom properties, responsive.' }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    icon: FaDatabase,
    layout: 'wide',
    accent: '#34D399',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', level: 'Advanced', years: 4, projects: 14, desc: 'Schema design, indexing, joins, normalization, queries.' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 'Advanced', years: 3, projects: 8, desc: 'Document modeling, aggregation pipelines, indexing.' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D', level: 'Comfortable', years: 1, projects: 3, desc: 'Caching, queues, sessions, realtime data patterns.' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 'Comfortable', years: 1, projects: 2, desc: 'Auth, Firestore, realtime sync for rapid products.' },
      { name: 'Database Design', icon: FaDatabase, color: '#6366F1', level: 'Advanced', years: 4, projects: 12, desc: 'ER modeling, migrations, seeders, query optimization.' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    icon: FiTerminal,
    layout: 'medium',
    accent: '#6366F1',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032', level: 'Expert', years: 4, projects: 20, desc: 'Branching, rebasing, conflict resolution, Git flow.' },
      { name: 'GitHub', icon: SiGithub, color: '#E6EDF3', level: 'Expert', years: 4, projects: 20, desc: 'PRs, CI/CD, Actions, releases, project management.' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37', level: 'Advanced', years: 3, projects: 12, desc: 'API testing, collections, environments, automation.' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 'Comfortable', years: 1, projects: 3, desc: 'Containers, compose, dev environments, deployment.' },
      { name: 'Composer / NPM', icon: FiBox, color: '#22D3EE', level: 'Advanced', years: 3, projects: 15, desc: 'Dependency management, package publishing, scripts.' }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: FaCloud,
    layout: 'medium',
    accent: '#F59E0B',
    skills: [
      { name: 'Vercel', icon: SiVercel, color: '#FFFFFF', level: 'Advanced', years: 2, projects: 9, desc: 'Frontend hosting, previews, serverless functions.' },
      { name: 'cPanel Hosting', icon: FiServer, color: '#22D3EE', level: 'Advanced', years: 3, projects: 10, desc: 'PHP deployment, MySQL, SSL, domain management.' },
      { name: 'AWS Basics', icon: FaAws, color: '#FF9900', level: 'Learning', years: 0, projects: 1, desc: 'S3, EC2, IAM — expanding cloud infrastructure skills.' },
      { name: 'CI/CD', icon: FaGitAlt, color: '#6366F1', level: 'Comfortable', years: 1, projects: 4, desc: 'Automated builds, testing, deployment pipelines.' }
    ]
  },
  {
    id: 'ai',
    title: 'AI & Data',
    icon: FaRobot,
    layout: 'medium',
    accent: '#22D3EE',
    skills: [
      { name: 'OpenAI API', icon: SiOpenai, color: '#74AA9C', level: 'Advanced', years: 1, projects: 4, desc: 'Chat completion, embeddings, prompt engineering.' },
      { name: 'AI Integration', icon: FaRobot, color: '#8B5CF6', level: 'Advanced', years: 1, projects: 4, desc: 'Feature flags, streaming responses, cost control.' },
      { name: 'Data Analysis', icon: FaPython, color: '#00D4AA', level: 'Comfortable', years: 2, projects: 5, desc: 'Pandas, visualization, insight extraction.' },
      { name: 'Chatbot Systems', icon: SiOpenai, color: '#34D399', level: 'Comfortable', years: 1, projects: 3, desc: 'Context-aware assistants, retrieval, conversation flow.' }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: FiServer,
    layout: 'wide',
    accent: '#F87171',
    skills: [
      { name: 'Linux', icon: FiTerminal, color: '#E6EDF3', level: 'Comfortable', years: 2, projects: 6, desc: 'Shell, permissions, services, process management.' },
      { name: 'Nginx / Apache', icon: FiServer, color: '#009639', level: 'Comfortable', years: 2, projects: 7, desc: 'Virtual hosts, reverse proxy, SSL termination.' },
      { name: 'Monitoring', icon: FiTerminal, color: '#22D3EE', level: 'Learning', years: 0, projects: 1, desc: 'Logs, uptime checks, error tracking fundamentals.' }
    ]
  }
]

const favorites = ['Laravel', 'PHP', 'React', 'MySQL', 'Redis', 'REST APIs']
const learning = ['Go (Golang)', 'Kubernetes', 'Advanced System Design', 'LLM Fine-tuning']

const filters = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Database' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'ai', label: 'AI' },
  { id: 'tools', label: 'Tools' }
]

const filterToCategories = {
  all: ['backend', 'frontend', 'database', 'tools', 'cloud', 'ai', 'devops'],
  backend: ['backend'],
  frontend: ['frontend'],
  database: ['database'],
  cloud: ['cloud', 'devops'],
  ai: ['ai'],
  tools: ['tools']
}

// Grid placement of each cluster inside the constellation canvas.
// A structured 3-column grid guarantees every node stays inside the board
// while clusters still read as a connected ecosystem.
const clusterGrid = {
  backend: { column: 1, row: 1 },
  frontend: { column: 2, row: 1 },
  database: { column: 3, row: 1 },
  ai: { column: 1, row: 2 },
  tools: { column: 2, row: 2 },
  cloud: { column: 3, row: 2 },
  devops: { column: 2, row: 3 }
}

// Directed graph of technology relationships (both directions render)
const connections = [
  ['Laravel', 'PHP'],
  ['Laravel', 'MySQL'],
  ['Laravel', 'Redis'],
  ['Laravel', 'REST API Design'],
  ['Laravel', 'Composer / NPM'],
  ['PHP', 'MySQL'],
  ['PHP', 'cPanel Hosting'],
  ['REST API Design', 'Node.js'],
  ['REST API Design', 'React'],
  ['REST API Design', 'Postman'],
  ['Node.js', 'Express.js'],
  ['Node.js', 'JavaScript'],
  ['Node.js', 'MongoDB'],
  ['Express.js', 'MongoDB'],
  ['React', 'JavaScript'],
  ['React', 'Tailwind CSS'],
  ['React', 'CSS3'],
  ['React', 'Vercel'],
  ['React', 'Firebase'],
  ['JavaScript', 'HTML5'],
  ['JavaScript', 'CSS3'],
  ['Bootstrap 5', 'CSS3'],
  ['HTML5', 'CSS3'],
  ['MySQL', 'Database Design'],
  ['MongoDB', 'Database Design'],
  ['MySQL', 'cPanel Hosting'],
  ['Python', 'OpenAI API'],
  ['Python', 'Data Analysis'],
  ['OpenAI API', 'AI Integration'],
  ['OpenAI API', 'Chatbot Systems'],
  ['AI Integration', 'Chatbot Systems'],
  ['Docker', 'Linux'],
  ['Docker', 'CI/CD'],
  ['Docker', 'Composer / NPM'],
  ['Docker', 'AWS Basics'],
  ['Docker', 'GitHub'],
  ['Git', 'GitHub'],
  ['Git', 'Composer / NPM'],
  ['GitHub', 'CI/CD'],
  ['Vercel', 'CI/CD'],
  ['Linux', 'Nginx / Apache'],
  ['Linux', 'Monitoring']
]

const LevelBadge = ({ level }) => {
  const cls = {
    Expert: 'level--expert',
    Advanced: 'level--advanced',
    Comfortable: 'level--comfortable',
    Learning: 'level--learning'
  }[level] || 'level--comfortable'
  return <span className={`level-badge ${cls}`}>{level}</span>
}

const SkillNode = ({ skill, index, isActive, isConnected, isDimmed, onHover, onLeave, registerRef }) => {
  const [open, setOpen] = useState(false)
  const Icon = skill.icon
  const stateClass = isActive ? ' is-active' : isConnected ? ' is-connected' : isDimmed ? ' is-dimmed' : ''

  return (
    <motion.div
      ref={(el) => registerRef(skill.name, el)}
      className={`skill-node-wrap${stateClass}`}
      style={{
        '--chip-accent': skill.color,
        '--float-duration': `${7 + (index % 5)}s`,
        '--float-delay': `${-(index * 1.7)}s`
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { onHover(skill.name); setOpen(true) }}
      onMouseLeave={() => { onLeave(); setOpen(false) }}
    >
      <div className="skill-node-float">
        <motion.button
          className="skill-node"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={open}
          style={{ borderColor: `${skill.color}44` }}
        >
          <span className="skill-node-icon" style={{ color: skill.color }}><Icon /></span>
          <span className="skill-node-name">{skill.name}</span>
        </motion.button>
      </div>

      {/* ============================================================
          Tooltip popover — PRESERVED but currently commented out.
          Re-enable by uncommenting the block below.
          ============================================================ */}
      {/* {open && (
        <motion.div
          className="skill-pop"
          initial={{ opacity: 0, y: 8, x: '-50%', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 8, x: '-50%', scale: 0.95 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="skill-pop-head">
            <span className="skill-pop-icon" style={{ color: skill.color }}><Icon /></span>
            <div>
              <h4>{skill.name}</h4>
              <LevelBadge level={skill.level} />
            </div>
          </div>
          <p className="skill-pop-desc">{skill.desc}</p>
          <div className="skill-pop-meta">
            <span><strong>{skill.years}</strong> yrs</span>
            <span className="meta-sep" />
            <span><strong>{skill.projects}</strong> projects</span>
          </div>
        </motion.div>
      )} */}
    </motion.div>
  )
}

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null)
  const [filter, setFilter] = useState('all')
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [lineData, setLineData] = useState([])
  const constellationRef = useRef(null)
  const nodeRefs = useRef({})

  const connectedTo = useMemo(() => {
    if (!activeSkill) return null
    const set = new Set([activeSkill])
    connections.forEach(([a, b]) => {
      if (a === activeSkill) set.add(b)
      if (b === activeSkill) set.add(a)
    })
    return set
  }, [activeSkill])

  const registerRef = useCallback((name, el) => {
    if (el) nodeRefs.current[name] = el
  }, [])

  const measure = useCallback(() => {
    const c = constellationRef.current
    if (!c) return
    const cRect = c.getBoundingClientRect()
    const data = connections
      .filter(([a, b]) => nodeRefs.current[a] && nodeRefs.current[b])
      .map(([a, b]) => {
        const ra = nodeRefs.current[a].getBoundingClientRect()
        const rb = nodeRefs.current[b].getBoundingClientRect()
        return {
          id: `${a}__${b}`,
          a,
          b,
          x1: ra.left + ra.width / 2 - cRect.left,
          y1: ra.top + ra.height / 2 - cRect.top,
          x2: rb.left + rb.width / 2 - cRect.left,
          y2: rb.top + rb.height / 2 - cRect.top
        }
      })
    setLineData(data)
  }, [])

  useEffect(() => {
    const t = setTimeout(measure, 650)
    window.addEventListener('resize', measure)

    // Re-measure once the constellation actually scrolls into view,
    // after the node entrance animations (scale 0.85 -> 1) complete.
    let observer
    if (constellationRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(measure, 700)
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(constellationRef.current)
    }

    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
      if (observer) observer.disconnect()
    }
  }, [measure])

  const handleSpot = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">03 — Tech Ecosystem</span>
          <h2 className="section-title">
            Technology <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="section-subtitle">
            Hover any technology to explore my engineering stack. Every node is connected — each one
            plays a role in how I build complete software systems.
          </p>
        </motion.div>

        <motion.div
          className="constellation-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {filters.map((f) => (
            <motion.button
              key={f.id}
              className={`filter-pill ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => setFilter(f.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="constellation" ref={constellationRef} onMouseMove={handleSpot}>
          <div
            className="constellation-spotlight"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          />

          <svg className="constellation-lines" aria-hidden="true">
            {lineData.map((line) => {
              const active = activeSkill && (line.a === activeSkill || line.b === activeSkill)
              return (
                <line
                  key={line.id}
                  className={`constellation-line${active ? ' is-active' : ''}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                />
              )
            })}
          </svg>

          {skillCategories.map((cat, ci) => {
            const grid = clusterGrid[cat.id] || { column: 1, row: 1 }
            const hidden = filter !== 'all' && !filterToCategories[filter].includes(cat.id)
            return (
              <div
                key={cat.id}
                className={`constellation-cluster${hidden ? ' is-filtered' : ''}`}
                style={{ gridColumn: grid.column, gridRow: grid.row, '--cluster-delay': `${ci * 0.08}s` }}
              >
                <span className="cluster-label" style={{ color: cat.accent }}>{cat.title}</span>
                <div className="cluster-nodes">
                  {cat.skills.map((skill, si) => {
                    const isActive = activeSkill === skill.name
                    const isConnected = !!connectedTo && connectedTo.has(skill.name) && !isActive
                    const isDimmed = !!activeSkill && connectedTo && !connectedTo.has(skill.name)
                    return (
                      <SkillNode
                        key={skill.name}
                        skill={skill}
                        index={si}
                        isActive={isActive}
                        isConnected={isConnected}
                        isDimmed={isDimmed}
                        onHover={setActiveSkill}
                        onLeave={() => setActiveSkill(null)}
                        registerRef={registerRef}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Favorites & currently learning */}
        <div className="skills-foot">
          <div className="skills-foot-block">
            <span className="skills-foot-label">⭐ Favorite Stack</span>
            <div className="skills-foot-tags">
              {favorites.map((fav) => (
                <motion.span key={fav} className="foot-tag" whileHover={{ y: -3 }}>
                  {fav}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="skills-foot-block">
            <span className="skills-foot-label">🌱 Currently Learning</span>
            <div className="skills-foot-tags">
              {learning.map((item) => (
                <motion.span key={item} className="foot-tag foot-tag--learning" whileHover={{ y: -3 }}>
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

