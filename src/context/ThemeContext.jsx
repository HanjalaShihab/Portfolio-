import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)

const STORAGE_KEY = 'portfolio-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage unavailable — fall through to system preference
  }

  // No saved preference → respect the OS setting
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  // Apply `data-theme` to <html> + keep <meta name="theme-color"> in sync
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)

    const meta = document.getElementById('theme-color-meta') || document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#F6F6F9' : '#08080C')
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Ignore persistence errors (private mode, etc.)
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

