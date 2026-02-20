import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'
import { MdWeb, MdPhoneIphone, MdDesignServices } from 'react-icons/md'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Adv Platform',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Full-stack advertising platform built with MERN stack',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://adv-one.vercel.app/',
    github: 'https://github.com/HanjalaShihab/Adv'
  },
  {
    id: 2,
    title: "Mozammel's Gallery",
    category: 'web',
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&q=80',
    description: 'Interactive art gallery showcase with modern UI/UX',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://mozammels-gallery.netlify.app/',
    github: 'https://github.com/HanjalaShihab/mozammels-gallery'
  },
  {
    id: 3,
    title: 'Fun Portal',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    description: 'Entertainment portal with dynamic content and user interaction',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://fun-portal.vercel.app/',
    github: 'https://github.com/HanjalaShihab/Fun-Portal'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'Personal portfolio showcasing projects and skills',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://hanjala-shihab.vercel.app/',
    github: 'https://github.com/HanjalaShihab/Portfolio-'
  },
  {
    id: 5,
    title: 'HustleHood BD',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    description: 'PHP-based community platform for hustlers and entrepreneurs',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    live: 'https://hustlehood.gt.tc/',
    github: 'https://github.com/HanjalaShihab/hustleHood_bd'
  },
  {
    id: 6,
    title: "Muzammel's Gallery (PHP)",
    category: 'web',
    image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?w=800&q=80',
    description: 'PHP-powered art gallery with dynamic content management',
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    live: 'http://www.muzammelsgallery.wuaze.com',
    github: 'https://github.com/HanjalaShihab/MozammelsGallery'
  },
  {
    id: 7,
    title: 'Hotel Unwind',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description: 'Modern hotel website with elegant UI and smooth animations',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://hanjalashihab.github.io/Hotel-Unwind/',
    github: 'https://github.com/HanjalaShihab/Hotel-Unwind'
  },
  {
    id: 8,
    title: 'Ogani',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    description: 'Organic food e-commerce website with responsive design',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://hanjalashihab.github.io/Ogani/',
    github: 'https://github.com/HanjalaShihab/Ogani'
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

