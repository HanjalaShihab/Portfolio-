import { useMemo, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiSearch,
  FiFilter,
  FiArrowRight
} from 'react-icons/fi'
import './Projects.css'

/* ============================================================
   Project data
   ============================================================ */
const projects = [
  {
    id: 1,
    title: 'Adv Platform',
    size: 'featured',
    category: ['fullstack', 'web', 'mongodb', 'nodejs'],
    filters: ['Full Stack', 'Backend'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
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
    id: 9,
    title: 'Kanban Flow',
    size: 'featured',
    category: ['fullstack', 'web', 'laravel', 'php'],
    filters: ['Laravel', 'Full Stack', 'Backend'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80',
    description: 'Real-time collaborative Kanban board with instant multi-user sync over WebSockets.',
    problem: 'Distributed teams needed task boards that stay in sync instantly, without refreshing or polling.',
    solution: 'Built a real-time Kanban board where card moves, edits and comments broadcast to every open board the moment they happen.',
    architecture: 'Laravel 11 + Livewire 3 for reactive server-rendered UI, Laravel Reverb for WebSocket broadcasting, MySQL for persistence, policy-based authorization per workspace.',
    challenges: 'Keeping optimistic drag-and-drop state consistent across concurrent editors, broadcasting granular events without over-fetching, and scoping real-time channels per workspace.',
    features: ['Real-time Collaboration', 'WebSockets', 'Drag & Drop', 'Role Management', 'Activity Logs', 'Notifications'],
    tech: ['Laravel', 'Livewire', 'Reverb', 'MySQL', 'Alpine.js'],
    live: '#',
    github: '#',
    complexity: 'High',
    year: '2026'
  },
  {
    id: 2,
    title: "Mozammel's Gallery",
    size: 'featured',
    category: ['fullstack', 'web', 'mongodb', 'nodejs'],
    filters: ['Full Stack', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1513519107127-1bed33748e4c?w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
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

const complexityColor = {
  High: 'complexity--high',
  Medium: 'complexity--medium',
  Low: 'complexity--low'
}

/* ============================================================
   Mockup system — miniature "screenshot" UIs per project.
   Built from the .mockup-* CSS classes in Projects.css.
   ============================================================ */

const MockBar = ({ url }) => (
  <div className="mockup-bar">
    <span className="mockup-dot mockup-dot--r" />
    <span className="mockup-dot mockup-dot--y" />
    <span className="mockup-dot mockup-dot--g" />
    <span className="mockup-url">{url}</span>
  </div>
)

const DashboardMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--split">
      <div className="mockup-sidebar">
        <span className="mockup-sidebar-icon is-active">●</span>
        <span className="mockup-sidebar-icon">●</span>
        <span className="mockup-sidebar-icon">●</span>
        <span className="mockup-sidebar-icon">●</span>
      </div>
      <div className="mockup-main">
        <div className="mockup-toolbar">
          <span className="mockup-toolbar-title">Campaigns</span>
          <span className="mockup-toolbar-btn">+ New</span>
        </div>
        <div className="mockup-stats">
          <div className="mock-stat"><span className="mock-stat-label">Impressions</span><span className="mock-stat-value">84.2k</span><span className="mock-stat-delta">+12.4%</span></div>
          <div className="mock-stat"><span className="mock-stat-label">Clicks</span><span className="mock-stat-value">6.1k</span><span className="mock-stat-delta">+8.1%</span></div>
          <div className="mock-stat"><span className="mock-stat-label">CTR</span><span className="mock-stat-value">7.2%</span><span className="mock-stat-delta">+0.6%</span></div>
          <div className="mock-stat"><span className="mock-stat-label">Spend</span><span className="mock-stat-value">$2.4k</span><span className="mock-stat-delta">-3.2%</span></div>
        </div>
        <div className="mockup-chart-panel">
          <span className="mock-panel-title">Performance</span>
          <div className="mock-chart">
            {[40, 65, 50, 80, 60, 90, 72, 84, 55, 96, 68, 78].map((h, i) => (
              <span key={i} className="mock-chart-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const KanbanMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--stack">
      <div className="mockup-toolbar mockup-toolbar--kanban">
        <span className="mockup-toolbar-title">Kanban Flow</span>
        <span className="mockup-avatar-stack">
          <span className="mock-avatar-chip" />
          <span className="mock-avatar-chip" />
          <span className="mock-avatar-chip" />
        </span>
        <span className="mockup-toolbar-btn mockup-toolbar-btn--accent">Share</span>
      </div>
      <div className="mock-kanban-board">
        {[
          { title: 'Backlog', count: 4, cards: ['API rate limiting', 'Redis caching layer', 'Webhook retries', 'Schema migration'] },
          { title: 'In Progress', count: 3, cards: ['Reverb broadcasting', 'JWT refresh flow', 'Optimistic DnD'] },
          { title: 'Review', count: 2, cards: ['Role policies', 'WS channel scoping'] },
          { title: 'Done', count: 5, cards: ['Auth scaffold', 'Board CRUD', 'Realtime sync', 'Activity logs', 'Notifications'] }
        ].map((col) => (
          <div key={col.title} className="mock-kanban-col">
            <div className="mock-kanban-col-head">
              <span>{col.title}</span>
              <span className="mock-kanban-count">{col.count}</span>
            </div>
            {col.cards.slice(0, 3).map((c) => (
              <div key={c} className="mock-kanban-card">
                <span className="mock-kanban-tag">ENG</span>
                <span className="mock-kanban-card-title">{c}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)

const GalleryMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--stack">
      <div className="mockup-toolbar">
        <span className="mockup-toolbar-title">Collection</span>
        <span className="mock-gallery-tabs">
          <span className="mock-gallery-tab is-active">All</span>
          <span className="mock-gallery-tab">Paintings</span>
          <span className="mock-gallery-tab">Digital</span>
        </span>
      </div>
      <div className="mock-gallery-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mock-gallery-thumb" style={{ background: `linear-gradient(150deg, hsla(${i * 36 + 200}, 55%, 45%, 0.5), hsla(${i * 36 + 260}, 60%, 20%, 0.4))` }}>
            <span className="mock-gallery-edit">Edit</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const FeedMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--split">
      <div className="mockup-sidebar mockup-sidebar--labeled">
        <span className="mockup-sidebar-brand">Portal</span>
        <span className="mockup-nav-label is-active">Home</span>
        <span className="mockup-nav-label">Explore</span>
        <span className="mockup-nav-label">Messages</span>
        <span className="mockup-nav-label">Admin</span>
      </div>
      <div className="mockup-main">
        <div className="mock-feed-list">
          {[
            { title: 'Shihab posted a new article', role: 'Admin', body: 'Building realtime apps with Laravel Reverb…', likes: 48, comments: 12 },
            { title: 'New project launched', role: 'Member', body: 'Check out the campaign dashboard we shipped.', likes: 32, comments: 7 },
            { title: 'Weekly digest', role: 'System', body: '2,481 new views · 5 new members this week.', likes: 19, comments: 3 }
          ].map((post) => (
            <div key={post.title} className="mock-feed-card">
              <span className="mock-avatar-dot" />
              <div className="mock-feed-body">
                <span className="mock-feed-title">{post.title} <span className="mock-role-badge">{post.role}</span></span>
                <span className="mock-feed-line" />
                <span className="mock-feed-line mock-feed-line--short" />
                <div className="mock-feed-actions">
                  <span>♥ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const PortfolioMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--stack">
      <div className="mock-landing-nav">
        <span className="mock-nav-brand">◆ Hanjala</span>
        <span className="mock-nav-links"><span>Work</span><span className="is-active">Projects</span><span>Skills</span><span>Contact</span></span>
        <span className="mock-cmdk">⌘K</span>
      </div>
      <div className="mock-landing-hero">
        <span className="mock-eyebrow">Backend Engineer</span>
        <span className="mock-heading-line" />
        <span className="mock-heading-line mock-heading-line--short" />
        <span className="mock-sub-line" />
        <div className="mock-landing-cta-row">
          <span className="mock-stat-chip">View Work</span>
          <span className="mock-stat-chip">Contact</span>
        </div>
      </div>
    </div>
  </div>
)

const CommunityMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--split">
      <div className="mockup-sidebar">
        <span className="mockup-sidebar-icon is-active">🏠</span>
        <span className="mockup-sidebar-icon">👥</span>
        <span className="mockup-sidebar-icon">📊</span>
        <span className="mockup-sidebar-icon">⚙️</span>
      </div>
      <div className="mockup-main">
        <div className="mockup-toolbar">
          <span className="mockup-toolbar-title">HustleHood</span>
          <span className="mockup-toolbar-btn">Post</span>
        </div>
        <div className="mock-feed-list">
          {[
            { title: 'How I scaled Laravel to 10k users', role: 'Hustler', body: 'Queue workers, Redis caching and…', likes: 120, comments: 34 },
            { title: 'Freelance pricing guide', role: 'Pro', body: 'A breakdown of day rates across markets.', likes: 86, comments: 21 }
          ].map((post) => (
            <div key={post.title} className="mock-feed-card">
              <span className="mock-avatar-dot mock-avatar-dot--sm" />
              <div className="mock-feed-body">
                <span className="mock-feed-title">{post.title} <span className="mock-role-badge">{post.role}</span></span>
                <span className="mock-feed-line" />
                <span className="mock-feed-line mock-feed-line--short" />
                <div className="mock-feed-actions">
                  <span>♥ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const LandingMock = ({ url, hotel = false }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--stack">
      <div className="mock-landing-nav">
        <span className="mock-nav-brand">{hotel ? '✦ Unwind' : '◆ Brand'}</span>
        <span className="mock-nav-links"><span>Home</span><span>About</span><span>Services</span><span>Contact</span></span>
        <span className="mock-stat-chip">Book</span>
      </div>
      <div className={`mock-landing-hero ${hotel ? 'mock-landing-hero--hotel' : ''}`}>
        <span className="mock-eyebrow">{hotel ? 'Luxury Stays' : 'Welcome'}</span>
        <span className="mock-heading-line" />
        <span className="mock-heading-line mock-heading-line--short" />
        <span className="mock-sub-line" />
        {hotel && (
          <div className="mock-amenity-row">
            <span className="mock-amenity-chip">◇</span>
            <span className="mock-amenity-chip">◇</span>
            <span className="mock-amenity-chip">◇</span>
          </div>
        )}
        <div className="mock-landing-cta-row">
          <span className="mock-stat-chip">Get Started</span>
        </div>
      </div>
    </div>
  </div>
)

const EcommerceMock = ({ url }) => (
  <div className="mockup">
    <MockBar url={url} />
    <div className="mockup-body mockup-body--stack">
      <div className="mock-landing-nav">
        <span className="mock-nav-brand">🍃 Ogani</span>
        <span className="mock-nav-links"><span>Shop</span><span>Fresh</span><span>Organic</span></span>
        <span className="mock-stat-chip">Cart</span>
      </div>
      <div className="mock-ecom-banner">
        <span className="mock-eyebrow">Organic. Local. Fresh.</span>
        <span className="mock-heading-line mock-heading-line--short" />
      </div>
      <div className="mock-ecom-grid">
        {['Organic Apples', 'Fresh Kale', 'Raw Honey', 'Almond Milk'].map((item) => (
          <div key={item} className="mock-ecom-card">
            <span className="mock-ecom-thumb" />
            <span className="mock-ecom-name">{item}</span>
            <div className="mock-ecom-foot">
              <span className="mock-ecom-price">$4.99</span>
              <span className="mock-ecom-add">+</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* Hotel landing — needs the hotel flag, so it's a component that reads url */
const HotelMock = ({ url }) => <LandingMock url={url} hotel />

/* Map each project to its mockup */
const mockFor = (project) => {
  const url = project.live.replace('https://', '').replace('http://', '')
  const map = {
    1: DashboardMock,
    9: KanbanMock,
    2: GalleryMock,
    3: FeedMock,
    4: PortfolioMock,
    5: CommunityMock,
    6: GalleryMock,
    7: HotelMock,
    8: EcommerceMock
  }
  const Comp = map[project.id]
  if (!Comp) return <LandingMock url={url} />
  return <Comp url={url} />
}

/* ============================================================
   Main component
   ============================================================ */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const handleRowMove = (e) => {
    const row = e.currentTarget
    const rect = row.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    row.style.setProperty('--spot-x', `${x}%`)
    row.style.setProperty('--spot-y', `${y}%`)
  }

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

        {filtered.length === 0 && (
          <div className="projects-empty">
            <FiSearch size={28} />
            <p>No projects match &ldquo;{search}&rdquo; under <strong>{activeFilter}</strong>.</p>
          </div>
        )}
      </div>

      {/* Editorial showcase — full-width (outside container) */}
      <div className="editorial-list">
        {filtered.map((project, index) => (
          <div key={project.id} className="editorial-row-wrap">
            {index > 0 && <div className="row-divider" />}
            <motion.article
              className="editorial-row"
              onMouseMove={handleRowMove}
              initial={{ opacity: 0, y: 48, x: 0 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 * (index % 3) }}
            >
              <div className="row-spotlight" aria-hidden="true" />

              {/* Big project number — separate left rail */}
              <div className="row-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Text column */}
              <div className="row-content">
                <div className="row-meta">
                  <span className="row-year">{project.year}</span>
                  <span className={`complexity ${complexityColor[project.complexity]}`}>
                    {project.complexity}
                  </span>
                </div>

                <h3 className="row-title">{project.title}</h3>
                <p className="row-desc">{project.description}</p>

                <div className="row-features-block">
                  <span className="row-label">Engineering Features</span>
                  <div className="row-features">
                    {project.features.slice(0, 5).map((f, idx) => (
                      <span key={f} className="feature-pill" style={{ '--i': idx }}>{f}</span>
                    ))}
                    {project.features.length > 5 && (
                      <span className="feature-pill feature-pill--more">+{project.features.length - 5}</span>
                    )}
                  </div>
                </div>

                <div className="row-tech" aria-label="Tech stack">
                  {project.tech.map((t, i) => (
                    <span key={t} className="tech-item">
                      {i > 0 && <span className="tech-sep" aria-hidden="true">•</span>}
                      {t}
                    </span>
                  ))}
                </div>

                <div className="row-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="row-link"
                  >
                    GitHub <FiArrowRight className="row-link-arrow" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="row-link"
                  >
                    Live Demo <FiArrowRight className="row-link-arrow" />
                  </a>
                  <button
                    className="row-link row-link--study"
                    onClick={() => setSelected(project)}
                  >
                    Case Study <FiArrowRight className="row-link-arrow" />
                  </button>
                </div>
              </div>

              {/* Browser mockup preview — miniature UI, compact */}
              <div className="row-preview">
                {mockFor(project)}
              </div>
            </motion.article>
          </div>
        ))}
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
                    <span className="browser-url">
                      {selected.live === '#'
                        ? selected.title.toLowerCase().replace(/\s+/g, '-')
                        : selected.live.replace('https://', '').replace('http://', '')}
                    </span>
                  </div>
                  <div className="study-browser-body">
                    {mockFor(selected)}
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
                      <FiExternalLink size={15} /> Live Demo
                    </a>
                    <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      <FiGithub size={15} /> Source Code
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
                  <div className="study-section study-section--wide">
                    <h4>Engineering Features</h4>
                    <div className="study-features">
                      {selected.features.map((f) => (
                        <span key={f} className="feature-chip feature-chip--lg">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="study-section study-section--wide">
                    <h4>Tech Stack</h4>
                    <div className="study-tech">
                      {selected.tech.map((t) => (
                        <span key={t} className="tech-tag tech-tag--lg">{t}</span>
                      ))}
                    </div>
                  </div>
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

