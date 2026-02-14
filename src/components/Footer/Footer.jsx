import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi'
import './Footer.css'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/HanjalaShihab', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
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
        <div className="footer-content">
          <motion.div className="footer-brand reveal-item reveal-left">
            <a href="#home" className="footer-logo">
              <span className="logo-text">HANJALA</span>
              <span className="logo-dot">.</span>
            </a>
            <p>Creating extraordinary digital experiences</p>
          </motion.div>

          <motion.div className="footer-social reveal-item reveal-right">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div className="footer-bottom reveal-item reveal-up">
              <p>{new Date().getFullYear()}. Made with ❤️ by Hanjala</p>
          <motion.button 
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.85 }}
            aria-label="Back to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

