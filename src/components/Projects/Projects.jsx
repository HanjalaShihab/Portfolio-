import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'
import { MdWeb, MdPhoneIphone, MdDesignServices } from 'react-icons/md'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'HANJALA Dashboard',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    description: 'A comprehensive analytics dashboard with real-time data visualization',
    tech: ['React', 'D3.js', 'Node.js'],
    live: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'CryptoWallet App',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    description: 'Secure cryptocurrency wallet with real-time trading features',
    tech: ['React Native', 'Web3', 'TypeScript'],
    live: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Brand Identity System',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    description: 'Complete brand identity design for a tech startup',
    tech: ['Figma', 'Illustrator', 'Photoshop'],
    live: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description: 'Full-featured e-commerce solution with payment integration',
    tech: ['Next.js', 'Stripe', 'MongoDB'],
    live: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&q=80',
    description: 'Health and fitness tracking app with AI-powered insights',
    tech: ['React Native', 'Firebase', 'TensorFlow'],
    live: '#',
    github: '#'
  },
  {
    id: 6,
    title: 'Portfolio Template',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'Minimalist portfolio template for creative professionals',
    tech: ['Figma', 'Framer', 'React'],
    live: '#',
    github: '#'
  }
]

const categories = [
  { name: 'All', icon: null },
  { name: 'Web', icon: MdWeb },
  { name: 'Mobile', icon: MdPhoneIphone },
  { name: 'Design', icon: MdDesignServices }
]

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter.toLowerCase())

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div className="section-header reveal-item reveal-down">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of my recent work and creative endeavors
          </p>
        </motion.div>

        <motion.div 
          className="filter-buttons reveal-item reveal-up"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category.name}
              className={`filter-btn ${activeFilter === category.name ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.name)}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {category.icon && <category.icon size={18} />}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card reveal-item ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-overlay-content">
                    <span className="view-project">View Project</span>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-index">0{index + 1}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.live}
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink /> Live
                  </a>
                  <a
                    href={project.github}
                    className="project-link outline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <FiX size={24} />
              </button>
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-info">
                <span className="modal-category">{selectedProject.category}</span>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div className="modal-tech">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="modal-links">
                  <a href={selectedProject.live} className="btn btn-primary">
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href={selectedProject.github} className="btn btn-outline">
                    <FiGithub /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects

