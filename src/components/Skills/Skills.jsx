import { motion } from 'framer-motion'
import { FaReact, FaJs, FaHtml5, FaCss3, FaNodeJs, FaPython, FaFigma, FaGitAlt } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb } from 'react-icons/si'
import './Skills.css'

const skills = [
  { name: 'React', icon: FaReact, level: 95, color: '#61DAFB' },
  { name: 'JavaScript', icon: FaJs, level: 92, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, level: 88, color: '#3178C6' },
  { name: 'HTML5', icon: FaHtml5, level: 98, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3, level: 95, color: '#1572B6' },
  { name: 'Node.js', icon: FaNodeJs, level: 85, color: '#339933' },
  { name: 'Python', icon: FaPython, level: 80, color: '#3776AB' },
  { name: 'Figma', icon: FaFigma, level: 90, color: '#F24E1E' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
}

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div className="section-header reveal-item reveal-down">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div 
          className="skills-grid reveal-item reveal-up"
          variants={container}
          initial="hidden"
          whileInView="show"
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              variants={item}
              whileHover={{ scale: 1.08, y: -10, boxShadow: '0 20px 40px rgba(0, 255, 136, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                <skill.icon size={32} />
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-progress-bg">
                <motion.div 
                  className="skill-progress-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                  style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
                />
              </div>
              <span className="skill-level">{skill.level}%</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

