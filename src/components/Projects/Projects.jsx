import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiSearch,
  FiBookOpen,
  FiFilter
} from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Adv Platform',
    size: 'featured',
    category: ['fullstack', 'web', 'mongodb', 'nodejs'],
    filters: ['Full Stack', 'Backend'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Full-stack advertising platform for managing campaigns, ads and analytics.',
    problem: 'Businesses lacked a single dashboard to launch, track and optimize ad campaigns across channels.',
    solution: 'Built a MERN-based advertising platform with role-based dashboards for advertisers and admins.',
    architecture: 'React SPA + Express REST API + MongoDB. JWT auth middleware, campaign aggregation pipeline, image upload via Multer.',
    challenges: 'Real-time campaign status updates, efficient aggregation of impression metrics, and secure multi-role access.',
    features: ['REST API', 'Authentication', 'Role Based Access', 'Image Upload', 'Pagination', 'Search', 'Filtering'],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    live: 'https://adv-one.vercel.app/',
    github: 'https://github.com/HanjalaShihab/Adv',
    complexity: 'High',
    year: '2024'
  },
  {
    id: 2,
    title: "Mozammel's Gallery",
    size: 'featured',
    category: ['fullstack', 'web', 'mongodb', 'nodejs'],
    filters: ['Full Stack', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&q=80',
    description: 'Interactive art gallery showcase with a modern, immersive UI.',
    problem: 'An artist needed a digital showcase that could present artworks beautifully and load fast.',
    solution: 'Designed a gallery SPA with lazy-loaded imagery, curated collections and smooth transitions.',
    architecture: 'React + Express + MongoDB. Component-based gallery, image CDN loading, responsive masonry layout.',
    challenges: 'Balancing high-resolution imagery with performance, and crafting a clean editorial UI.',
    features: ['REST API', 'Image Processing', 'Responsive', 'Dark Mode', 'Performance Optimized', 'Search'],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://mozammels-gallery.netlify.app/',
    github: 'https://github.com/HanjalaShihab/mozammels-gallery',
    complexity: 'Medium',
    year: '2023'
  },
  {
    id: 3,
    title: 'Fun Portal',
    size: 'featured',
    category: ['fullstack', 'web', 'mongodb', 'nodejs'],
    filters: ['Full Stack', 'Backend'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    description: 'Entertainment portal with dynamic content, user interactions and admin controls.',
    problem: 'Content creators needed a portal to publish interactive content and engage a community.',
    solution: 'Engineered a content portal with authentication, moderation and dynamic content management.',
    architecture: 'MERN stack with JWT auth, CRUD APIs for posts, comments and likes, admin moderation panel.',
    challenges: 'Moderation workflow, realtime-ish engagement counters, and clean state management on the client.',
    features: ['REST API', 'Authentication', 'Admin Panel', 'Email Verification', 'Pagination', 'Filtering'],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://fun-portal.vercel.app/',
    github: 'https://github.com/HanjalaShihab/Fun-Portal',
    complexity: 'Medium',
    year: '2023'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    size: 'medium',
    category: ['frontend', 'web', 'react'],
    filters: ['Frontend', 'Open Source'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'This very portfolio — a premium, interactive engineering showcase.',
    problem: 'Recruiters need to understand engineering depth quickly and enjoyably.',
    solution: 'Designed a Linear-inspired dark experience with case studies, a tech dashboard and a command palette.',
    architecture: 'React + Framer Motion + CSS architecture. Component-based, reusable motion variants, reduced-motion aware.',
    challenges: 'Balancing rich interactivity with Lighthouse performance and accessibility.',
    features: ['Responsive', 'Dark Mode', 'Performance Optimized', 'Accessibility', 'Search', 'Realtime'],
    tech: ['React', 'Framer Motion', 'CSS3', 'Vite'],
    live: 'https://hanjala-shihab.vercel.app/',
    github: 'https://github.com/HanjalaShihab/Portfolio-',
    complexity: 'Medium',
    year: '2025'
  },
  {
    id: 5,
    title: 'HustleHood BD',
    size: 'medium',
    category: ['php', 'backend', 'web'],
    filters: ['PHP', 'Laravel', 'Backend'],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    description: 'PHP-based community platform for hustlers and entrepreneurs.',
    problem: 'Entrepreneurs needed a local community platform to share ideas and resources.',
    solution: 'Built a PHP + MySQL community platform with member profiles and posts.',
    architecture: 'Procedural-to-structured PHP with MySQL, session-based auth, Bootstrap UI.',
    challenges: 'Secure session handling, input validation, and relational data modeling.',
    features: ['Authentication', 'Role Based Access', 'File Upload', 'Responsive', 'Search'],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    live: 'https://hustlehood.gt.tc/',
    github: 'https://github.com/HanjalaShihab/hustleHood_bd',
    complexity: 'Medium',
    year: '2023'
  },
  {
    id: 6,
    title: "Muzammel's Gallery (PHP)",
    size: 'medium',
    category: ['php', 'backend', 'web'],
    filters: ['PHP', 'Backend'],
    image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?w=800&q=80',
    description: 'PHP-powered art gallery with dynamic content management.',
    problem: 'A PHP-driven gallery was needed with a simple admin workflow for adding artworks.',
    solution: 'Developed a PHP + MySQL gallery with an admin panel for content management.',
    architecture: 'MVC-inspired PHP structure, PDO prepared statements, upload handling.',
    challenges: 'XSS-safe rendering, image storage strategy, and admin authentication.',
    features: ['REST API', 'Authentication', 'Admin Panel', 'Image Processing', 'Responsive'],
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    live: 'http://www.muzammelsgallery.wuaze.com',
    github: 'https://github.com/HanjalaShihab/MozammelsGallery',
    complexity: 'Medium',
    year: '2022'
  },
  {
    id: 7,
    title: 'Hotel Unwind',
    size: 'small',
    category: ['frontend', 'web'],
    filters: ['Frontend'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description: 'Modern hotel website with elegant UI and smooth animations.',
    problem: 'A hotel needed a polished, conversion-focused marketing site.',
    solution: 'Hand-crafted a responsive hotel site with smooth scroll animations and a booking-focused flow.',
    architecture: 'Semantic HTML + CSS + vanilla JS. CSS variables theming, intersection-observer reveals.',
    challenges: 'Creating an elegant, fast, mobile-first experience without a framework.',
    features: ['Responsive', 'Dark Mode', 'Performance Optimized', 'Filtering'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://hanjalashihab.github.io/Hotel-Unwind/',
    github: 'https://github.com/HanjalaShihab/Hotel-Unwind',
    complexity: 'Low',
    year: '2022'
  },
  {
    id: 8,
    title: 'Ogani',
    size: 'small',
    category: ['frontend', 'web'],
    filters: ['Frontend'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    description: 'Organic food e-commerce website with responsive design.',
    problem: 'An organic food brand needed a clean storefront template with product browsing.',
    solution: 'Built a responsive e-commerce layout with product grids, filters and cart UI.',
    architecture: 'HTML + CSS + JS, BEM naming, reusable components, mobile-first grid.',
    challenges: 'Product filtering logic and a smooth mobile browsing experience.',
    features: ['Responsive', 'Search', 'Filtering', 'Pagination'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://hanjalashihab.github.io/Ogani/',
    github: 'https://github.com/HanjalaShihab/Ogani',
    complexity: 'Low',
    year: '2022'
  }
]

const filters = [
  'All',
  'Laravel',
  'PHP',
  'Python',
  'AI',
  'Full Stack',
  'Frontend',
  'Backend',
  'Open Source'
]

const sizeClass = {
  featured: 'bento-featured',
  medium: 'bento-medium',
  small: 'bento-small'
}

const complexityColor = {
  High: 'complexity--high',
  Medium: 'complexity--medium',
  Low: 'complexity--low'
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    let list = projects
    if (activeFilter !== 'All') {
      list = list.filter((p) => p.filters.includes(activeFilter) || p.category.includes(activeFilter.toLowerCase().replace(' ', '')))
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [activeFilter, search])

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">03 — Projects</span>
          <h2 className="section-title">
            Case Studies &amp; <span className="text-gradient">Builds</span>
          </h2>
          <p className="section-subtitle">
            Real products with real engineering decisions — explore the architecture behind each one.
          </p>
        </motion.div>

        {/* Filters + search */}
        <motion.div
          className="projects-toolbar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="filter-row" role="group" aria-label="Filter projects">
            <FiFilter className="filter-icon" />
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects or tech…"
              aria-label="Search projects"
            />
          </div>
        </motion.div>

        {/* Bento grid */}
        <motion.div layout className="bento-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              return (
                <motion.article
                  key={project.id}
                  layout
                  className={`bento-card ${sizeClass[project.size]}`}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
                  onClick={() => setSelected(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelected(project)
                    }
                  }}
                  aria-label={`Open case study for ${project.title}`}
                >
                  <div className="browser-mock">
                    <div className="browser-bar">
                      <span className="browser-dot browser-dot--r" />
                      <span className="browser-dot browser-dot--y" />
                      <span className="browser-dot browser-dot--g" />
                      <span className="browser-url">{project.live.replace('https://', '')}</span>
                    </div>
                    <div className="browser-body">
                      <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                      <div className="browser-overlay" />
                    </div>
                  </div>

                  <div className="bento-content">
                    <div className="bento-meta">
                      <span className="bento-year">{project.year}</span>
                      <span className={`complexity ${complexityColor[project.complexity]}`}>
                        {project.complexity} complexity
                      </span>
                    </div>
                    <h3 className="bento-title">{project.title}</h3>
                    <p className="bento-desc">{project.description}</p>

                    <div className="bento-features">
                      {project.features.slice(0, 4).map((f) => (
                        <span key={f} className="feature-chip">{f}</span>
                      ))}
                      {project.features.length > 4 && (
                        <span className="feature-chip feature-chip--more">+{project.features.length - 4}</span>
                      )}
                    </div>

                    <div className="bento-tech">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>

                    <div className="bento-actions">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-action bento-action--primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink /> Live
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-action"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub /> Code
                      </a>
                      <button
                        className="bento-action bento-action--study"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected(project)
                        }}
                      >
                        <FiBookOpen /> Case Study
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="projects-empty">
            <FiSearch size={28} />
            <p>No projects match “{search}” under <strong>{activeFilter}</strong>.</p>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="study-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} case study`}
          >
            <motion.div
              className="study-modal-content"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="study-close"
                onClick={() => setSelected(null)}
                aria-label="Close case study"
              >
                <FiX size={22} />
              </button>

              <div className="study-hero">
                <div className="study-browser">
                  <div className="browser-bar">
                    <span className="browser-dot browser-dot--r" />
                    <span className="browser-dot browser-dot--y" />
                    <span className="browser-dot browser-dot--g" />
                    <span className="browser-url">{selected.live.replace('https://', '')}</span>
                  </div>
                  <div className="study-browser-body">
                    <img src={selected.image} alt={`${selected.title} preview`} />
                  </div>
                </div>
                <div className="study-intro">
                  <div className="study-tags">
                    <span className="study-year">{selected.year}</span>
                    <span className={`complexity ${complexityColor[selected.complexity]}`}>
                      {selected.complexity} complexity
                    </span>
                  </div>
                  <h3 className="study-title">{selected.title}</h3>
                  <p className="study-desc">{selected.description}</p>
                  <div className="study-actions">
                    <a href={selected.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <FiExternalLink /> Live Demo
                    </a>
                    <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      <FiGithub /> View Code
                    </a>
                  </div>
                </div>
              </div>

              <div className="study-body">
                <div className="study-grid">
                  <div className="study-section">
                    <h4>Problem</h4>
                    <p>{selected.problem}</p>
                  </div>
                  <div className="study-section">
                    <h4>Solution</h4>
                    <p>{selected.solution}</p>
                  </div>
                  <div className="study-section study-section--wide">
                    <h4>Architecture</h4>
                    <p>{selected.architecture}</p>
                  </div>
                  <div className="study-section study-section--wide">
                    <h4>Challenges</h4>
                    <p>{selected.challenges}</p>
                  </div>
                </div>

                <div className="study-section">
                  <h4>Key Engineering Features</h4>
                  <div className="study-features">
                    {selected.features.map((f) => (
                      <span key={f} className="feature-chip feature-chip--lg">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="study-section">
                  <h4>Tech Stack</h4>
                  <div className="study-tech">
                    {selected.tech.map((t) => (
                      <span key={t} className="tech-tag tech-tag--lg">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="study-section">
                  <h4>Future Improvements</h4>
                  <ul className="study-future">
                    <li>Add realtime notifications &amp; WebSocket updates</li>
                    <li>Implement queue-based background jobs for heavy tasks</li>
                    <li>Introduce Redis caching for high-traffic endpoints</li>
                    <li>Expand test coverage with unit &amp; integration tests</li>
                  </ul>
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

