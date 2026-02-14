import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import shihab from '../../assets/shihab.jpg'
import './About.css'

const stats = [
  { number: 5, suffix: '+', label: 'Years Experience' },
  { number: 50, suffix: '+', label: 'Projects Completed' },
  { number: 30, suffix: '+', label: 'Happy Clients' }
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
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.number / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          current = stat.number
          clearInterval(timer)
        }
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = Math.floor(current)
          return newCounters
        })
      }, duration / steps)
    })
  }

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div className="section-header reveal-item reveal-down">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate about creating digital experiences that blend creativity with functionality
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-image-container reveal-item reveal-left">
            <div className="about-image-wrapper">
              <div className="about-image-glow" />
              <div className="about-image">
                <img src={shihab} alt="Hanjala Shihab" />
              </div>
              <div className="about-image-border" />
            </div>
          </motion.div>

          <motion.div className="about-text reveal-item reveal-right">
            <h3>Building Digital Dreams</h3>
            <p>
              I'm a creative developer and designer with a passion for crafting exceptional 
              digital experiences. With expertise spanning frontend development, UI/UX design, 
              and interactive animations, I bring ideas to life through code</p>
            <p>
              My approach combines technical precision with artistic vision, ensuring every
              project not only functions perfectly but also captivates users. I believe in 
              pushing boundaries and exploring new technologies to deliver truly extraordinary results.
            </p>

            <div className="about-stats" ref={statsRef}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="stat-number">
                    {counters[index]}
                    {stat.suffix}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="about-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a href="#contact" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Hire Me <FiArrowRight />
              </motion.a>
              <motion.button className="btn btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Download CV <FiDownload />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

