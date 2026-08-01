import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp, FiHeart, FiTerminal } from 'react-icons/fi'
import './Footer.css'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/HanjalaShihab', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/h-m-shihab-a98039350/', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiMail, href: 'mailto:shihab2305341402@diu.edu.bd', label: 'Email' }
]

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Go to home">
              <span className="footer-logo-mark">{'</>'}</span>
              <span className="footer-logo-text">hanjala</span>
              <span className="footer-logo-dot">_</span>
            </a>
            <p className="footer-tagline">
              Backend / Laravel / Full Stack engineer crafting robust digital products.
            </p>
          </div>

          <div className="footer-social">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.12, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="footer-copy">
            © {new Date().getFullYear()} Hanjala Shihab. Crafted with{' '}
            <FiHeart size={13} className="footer-heart" /> &amp; Laravel-grade discipline.
          </p>
          <p className="footer-term">
            <FiTerminal size={13} /> <span className="term-text">press ⌘K anytime</span>
          </p>
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.12, y: -5 }}
            whileTap={{ scale: 0.85 }}
            aria-label="Back to top"
          >
            <FiArrowUp size={18} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

