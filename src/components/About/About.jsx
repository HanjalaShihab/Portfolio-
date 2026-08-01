import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiDownload,
  FiMapPin,
  FiTarget,
  FiZap,
  FiAward,
  FiBriefcase,
  FiBookOpen
} from 'react-icons/fi'
import { FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa'
import shihab from '../../assets/shihab.jpg'
import resume from '../../assets/hanjala_resume.pdf'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/variants'
import './About.css'

const stats = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Projects Completed' },
  { value: 20, suffix: '+', label: 'Technologies Used' },
  { value: 3, suffix: '', label: 'Core Frameworks' }
]

const timeline = [
  {
    id: 'education',
    icon: FaGraduationCap,
    title: 'Education',
    period: '2023 — Present',
    description:
      'Computer Science & Engineering student at Daffodil International University — where I turned curiosity into structured engineering practice.',
    tags: ['CSE', 'Algorithms', 'Data Structures', 'DBMS']
  },
  {
    id: 'started',
    icon: FaCode,
    title: 'Started Programming',
    period: 'Early Days',
    description:
      'Began with Python and problem-solving. Built a foundation in logic, control flow, and object-oriented thinking.',
    tags: ['Python', 'Problem Solving', 'OOP']
  },
  {
    id: 'laravel',
    icon: FiBriefcase,
    title: 'Laravel & PHP',
    period: 'Core Stack',
    description:
      'Deep-dived into Laravel and PHP — building RESTful APIs, auth systems, admin panels, and real-world database design.',
    tags: ['Laravel', 'PHP', 'MySQL', 'REST API']
  },
  {
    id: 'fullstack',
    icon: FiZap,
    title: 'Full Stack Engineering',
    period: 'Now',
    description:
      'Combining Laravel backends with React frontends — shipping complete products: e-commerce, portals, dashboards and SaaS-style platforms.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 'ai',
    icon: FaRocket,
    title: 'AI-Powered Development',
    period: 'Current Focus',
    description:
      'Integrating AI into practical applications — chatbots, content pipelines, and intelligent features on top of robust backends.',
    tags: ['AI Integration', 'Chatbots', 'Automation']
  }
]

const currentFocus = [
  { icon: FiTarget, label: 'Mastering Laravel architecture & API design' },
  { icon: FiZap, label: 'Building production-grade full stack products' },
  { icon: FaRocket, label: 'Exploring AI-powered backend features' },
  { icon: FiBookOpen, label: 'Studying system design & scalability' }
]

const goals = [
  { icon: FiBriefcase, label: 'Senior Backend Engineer' },
  { icon: FiAward, label: 'Contribute to open-source Laravel packages' },
  { icon: FaCode, label: 'Ship 10+ production applications' },
  { icon: FiTarget, label: 'Lead backend teams & mentor juniors' }
]

const About = () => {
  const [counters, setCounters] = useState(stats.map(() => 0))
  const statsRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            const timers = stats.map((stat, index) => {
              const duration = 1400
              const steps = 55
              const increment = stat.value / steps
              let current = 0
              return setInterval(() => {
                current += increment
                if (current >= stat.value) {
                  current = stat.value
                  clearInterval(timers[index])
                }
                setCounters((prev) => {
                  const next = [...prev]
                  next[index] = Math.floor(current)
                  return next
                })
              }, duration / steps)
            })
            return timers
          }
        })
      },
      { threshold: 0.4 }
    )

    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">01 — About</span>
          <h2 className="section-title">
            Engineering, <span className="text-gradient">end to end</span>
          </h2>
          <p className="section-subtitle">
            The journey from first lines of code to shipping full stack products —
            and where I'm headed next.
          </p>
        </motion.div>

        <div className="about-layout">
          {/* Left: profile + stats */}
          <motion.div
            className="about-profile-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div className="about-profile-card glass-card" variants={staggerItem}>
              <div className="about-image-wrap">
                <div className="about-image-glow" />
                <div className="about-image">
                  <img src={shihab} alt="Portrait of Hanjala Shihab" loading="lazy" />
                </div>
              </div>
              <div className="about-profile-info">
                <h3 className="about-name">Hanjala Shihab</h3>
                <p className="about-role">Backend · Laravel · Full Stack</p>
                <div className="about-location">
                  <FiMapPin size={14} /> Dhaka, Bangladesh
                </div>
              </div>
              <div className="about-cta">
                <a href="#contact" className="btn btn-primary">
                  Hire Me <FiArrowRight />
                </a>
                <a href={resume} download="Hanjala_Shihab_Resume.pdf" className="btn btn-outline">
                  <FiDownload /> Resume
                </a>
              </div>
            </motion.div>

            <motion.div className="about-stats" ref={statsRef} variants={staggerItem}>
              {stats.map((stat, i) => (
                <div key={stat.label} className="about-stat">
                  <span className="about-stat-value">
                    {counters[i]}
                    {stat.suffix}
                  </span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: timeline */}
          <div className="about-timeline-col">
            <motion.div
              className="timeline"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {timeline.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    className="timeline-item"
                    variants={staggerItem}
                    custom={idx}
                  >
                    <div className="timeline-marker">
                      <span className="timeline-icon"><Icon /></span>
                      <span className="timeline-line" />
                    </div>
                    <div className="timeline-card glass-card">
                      <div className="timeline-head">
                        <h4 className="timeline-title">{item.title}</h4>
                        <span className="timeline-period">{item.period}</span>
                      </div>
                      <p className="timeline-desc">{item.description}</p>
                      <div className="timeline-tags">
                        {item.tags.map((tag) => (
                          <span key={tag} className="chip">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Focus & Goals */}
        <motion.div
          className="about-duo"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div className="focus-card glass-card" variants={staggerItem}>
            <div className="duo-head">
              <span className="duo-icon"><FiZap /></span>
              <h3>Current Focus</h3>
            </div>
            <ul className="duo-list">
              {currentFocus.map((f) => (
                <li key={f.label}>
                  <f.icon size={15} className="duo-list-icon" />
                  {f.label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="focus-card glass-card" variants={staggerItem}>
            <div className="duo-head">
              <span className="duo-icon duo-icon--alt"><FiTarget /></span>
              <h3>Goals</h3>
            </div>
            <ul className="duo-list">
              {goals.map((g) => (
                <li key={g.label}>
                  <g.icon size={15} className="duo-list-icon duo-list-icon--alt" />
                  {g.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

