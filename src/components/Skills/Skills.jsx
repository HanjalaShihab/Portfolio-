// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaReact, FaJs, FaHtml5, FaCss3, FaNodeJs, 
  FaPython, FaGitAlt, FaGithub, FaBootstrap, FaPhp 
} from 'react-icons/fa'
import { 
  SiExpress, SiTailwindcss, SiMongodb, SiMysql, SiLaravel
} from 'react-icons/si'
import './Skills.css'

const skills = [
  { name: 'React', icon: FaReact, level: 95, color: '#61DAFB' },
  { name: 'JavaScript', icon: FaJs, level: 92, color: '#F7DF1E' },
  { name: 'Node.js', icon: FaNodeJs, level: 88, color: '#339933' },
  { name: 'Express.js', icon: SiExpress, level: 85, color: '#000000' },
  { name: 'MongoDB', icon: SiMongodb, level: 85, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, level: 80, color: '#4479A1' },
  { name: 'PHP', icon: FaPhp, level: 85, color: '#777BB4' },
  { name: 'Laravel', icon: SiLaravel, level: 80, color: '#FF2D20' },
  { name: 'Bootstrap5', icon: FaBootstrap, level: 90, color: '#7952B3' },
  { name: 'Tailwind', icon: SiTailwindcss, level: 88, color: '#06B6D4' },
  { name: 'Python', icon: FaPython, level: 75, color: '#3776AB' },
  { name: 'GitHub', icon: FaGithub, level: 92, color: '#181717' },
  { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032' },
  { name: 'HTML5', icon: FaHtml5, level: 98, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3, level: 95, color: '#1572B6' },
]



const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: 100
  })

  return (
    <section id="skills" className="skills section scroll-section section-bg section-bg-7">
      {/* Minimal Background Pattern */}
      <div className="skills-bg-pattern">
        <div className="pattern-grid"></div>
        <div className="pattern-dots"></div>
      </div>

      <div className="container" ref={ref}>
        {/* Section Header */}
        <div className="section-header reveal-item reveal-down">
          <h2 className="section-title">
            Technical Skills
            <span className="title-dot">.</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with to build amazing digital experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card-wrapper reveal-item ${index % 4 < 2 ? 'reveal-left' : 'reveal-right'}`}
            >
              <SkillCard skill={skill} index={index} inView={inView} />
            </div>
          ))}
        </div>

        {/* Minimal Stats */}
        <motion.div 
          className="skills-stats-minimal"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="stat-item-minimal">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item-minimal">
            <span className="stat-number">30+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item-minimal">
            <span className="stat-number">12</span>
            <span className="stat-label">Technologies</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const SkillCard = ({ skill, index, inView }) => {
  const [progressRef, progressInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    delay: 200
  })

  return (
    <div className="skill-card">
      {/* Icon with subtle glow */}
      <div className="skill-icon-wrapper">
        <div 
          className="skill-icon-glow" 
          style={{ background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)` }}
        />
        <skill.icon 
          className="skill-icon" 
          style={{ color: skill.color }}
        />
      </div>

      {/* Skill Info */}
      <div className="skill-info">
        <h3 className="skill-name">{skill.name}</h3>
        
        {/* Progress Bar */}
        <div className="skill-progress" ref={progressRef}>
          <div className="progress-bg">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={inView && progressInView ? { width: `${skill.level}%` } : {}}
              transition={{ 
                duration: 1.2, 
                delay: 0.2 + (index * 0.05),
                ease: [0.16, 1, 0.3, 1] // Custom easing for smooth animation
              }}
              style={{ backgroundColor: skill.color }}
            />
          </div>
          <span className="progress-percent">{skill.level}%</span>
        </div>
      </div>

      {/* Minimal hover indicator */}
      <div className="card-hover-line" style={{ backgroundColor: skill.color }} />
    </div>
  )
}

export default Skills