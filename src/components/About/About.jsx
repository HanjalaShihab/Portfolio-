// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import shihab from '../../assets/shihab.jpg'
import resume from '../../assets/hanjala_resume.pdf'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/variants'
import './About.css'

const focusAreas = [
  'Laravel',
  'REST APIs',
  'Backend Systems',
  'AI Integration',
  'Clean Architecture',
  'System Design'
]

const journey = [
  {
    year: '2023',
    title: 'Started Computer Science & Engineering',
    desc: 'at Daffodil International University — where curiosity turned into structured engineering practice.'
  },
  {
    year: '2023',
    title: 'Discovered Python',
    desc: 'Built a strong programming foundation through logic, problem solving, and object-oriented thinking.'
  },
  {
    year: '2024',
    title: 'Moved into Laravel & PHP',
    desc: 'Built REST APIs, authentication systems, and database-driven applications.'
  },
  {
    year: '2025',
    title: 'Expanded into Full Stack',
    desc: 'React, Node.js, modern UI — real-world products from concept to deployment.'
  },
  {
    year: 'Today',
    title: 'Backend / Laravel Developer',
    desc: 'Exploring scalable backend systems, AI integration, Docker, Redis, and cloud deployment.',
    current: true
  }
]

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-editorial">
          {/* ============ LEFT — Editorial intro ============ */}
          <motion.div
            className="about-intro"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span className="about-eyebrow" variants={staggerItem}>
              About
            </motion.span>

            <div className="about-title-block">
              <motion.h2 className="about-heading" variants={staggerItem}>
                My <span className="text-gradient">Journey</span>
              </motion.h2>
              <motion.p className="about-statement" variants={staggerItem}>
                Building software
                <br />
                that solves
                <br />
                real-world problems.
              </motion.p>
            </div>

            <motion.div className="about-portrait" variants={staggerItem} aria-hidden="true">
              <div className="about-portrait-ring" />
              <div className="about-portrait-img">
                <img src={shihab} alt="Portrait of Hanjala Shihab" loading="lazy" />
              </div>
            </motion.div>

            <motion.p className="about-bio" variants={staggerItem}>
              I'm Hanjala Shihab — a backend-focused software engineer who turns ideas into
              reliable, scalable products. I care about clean architecture, thoughtful APIs,
              and software that feels effortless to use and easy to maintain.
            </motion.p>

            <motion.div className="about-focus" variants={staggerItem}>
              <span className="about-focus-label">Current Focus</span>
              <div className="about-focus-tags">
                {focusAreas.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="about-focus-tag"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div className="about-actions" variants={staggerItem}>
              <a href="#contact" className="about-link about-link--primary">
                Get in touch
              </a>
              <a href={resume} download="Hanjala_Shihab_Resume.pdf" className="about-link download-link">
                <FiDownload /> Resume
              </a>
            </motion.div>
          </motion.div>

          {/* ============ RIGHT — Editorial journey ============ */}
          <motion.div
            className="about-journey"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {journey.map((item, idx) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                className={`journey-row ${item.current ? 'journey-row--current' : ''}`}
                variants={staggerItem}
                custom={idx}
              >
                <div className="journey-rail">
                  <motion.span
                    className="journey-dot"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {idx < journey.length - 1 && (
                    <motion.span
                      className="journey-line"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </div>
                <div className="journey-content">
                  <motion.span
                    className="journey-year"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.year}
                  </motion.span>
                  <h4 className="journey-title">{item.title}</h4>
                  <p className="journey-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

