import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
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

const LevelBadge = ({ level }) => {
  const cls = {
    Expert: 'level--expert',
    Advanced: 'level--advanced',
    Comfortable: 'level--comfortable',
    Learning: 'level--learning'
  }[level] || 'level--comfortable'
  return <span className={`level-badge ${cls}`}>{level}</span>
}

const SkillChip = ({ skill, index }) => {
  const [open, setOpen] = useState(false)
  const Icon = skill.icon

  return (
    <div
      className="skill-chip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ '--skill-delay': `${index * 0.04}s`, '--chip-accent': skill.color }}
    >
      <motion.button
        className={`skill-chip ${open ? 'skill-chip--open' : ''}`}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={open}
        style={{ borderColor: `${skill.color}44` }}
      >
        <span className="skill-chip-icon" style={{ color: skill.color }}>
          <Icon />
        </span>
        <span className="skill-chip-name">{skill.name}</span>
      </motion.button>

      {/* Tooltip popover */}
      {open && (
        <motion.div
          className="skill-pop"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
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
      )}
    </div>
  )
}

const Skills = () => {
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
          <span className="section-eyebrow">02 — Skills</span>
          <h2 className="section-title">
            Developer <span className="text-gradient">Tech Dashboard</span>
          </h2>
          <p className="section-subtitle">
            Not a list of progress bars — a live map of the stack I use to build,
            ship and scale products.
          </p>
        </motion.div>

        <div className="dashboard">
          {skillCategories.map((cat, ci) => {
            const CatIcon = cat.icon
            return (
              <motion.div
                key={cat.id}
                className={`dash-card glass-card dash-card--${cat.layout}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: (ci % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="dash-card-glow" style={{ background: `radial-gradient(circle, ${cat.accent}1f, transparent 70%)` }} />
                <div className="dash-head">
                  <span className="dash-icon" style={{ color: cat.accent, borderColor: `${cat.accent}44`, background: `${cat.accent}12` }}>
                    <CatIcon />
                  </span>
                  <div>
                    <h3 className="dash-title">{cat.title}</h3>
                    <span className="dash-count">{cat.skills.length} technologies</span>
                  </div>
                </div>
                <div className={`dash-chips dash-chips--${cat.layout}`}>
                  {cat.skills.map((skill, si) => (
                    <SkillChip key={skill.name} skill={skill} index={si} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Favorites & currently learning */}
        <div className="skills-duo">
          <motion.div
            className="fav-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="fav-title">⭐ Favorite Stack</h4>
            <div className="fav-chips">
              {favorites.map((fav, i) => (
                <motion.span
                  key={fav}
                  className="fav-chip"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                >
                  {fav}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="fav-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h4 className="fav-title">🌱 Currently Learning</h4>
            <div className="fav-chips">
              {learning.map((item, i) => (
                <motion.span
                  key={item}
                  className="fav-chip fav-chip--learning"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills

