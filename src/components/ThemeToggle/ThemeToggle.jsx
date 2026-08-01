import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to night mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to night mode'}
      role="switch"
      aria-checked={!isDark}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        className="theme-toggle-icon"
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
      </motion.span>
    </motion.button>
  )
}

export default ThemeToggle

