import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCopy,
  FiCheck
} from 'react-icons/fi'
import './Contact.css'

const socialLinks = [
  { icon: FiGithub, cmd: 'github', href: 'https://github.com/HanjalaShihab', handle: 'github.com/HanjalaShihab', label: 'GitHub' },
  { icon: FiLinkedin, cmd: 'linkedin', href: 'https://www.linkedin.com/in/h-m-shihab-a98039350/', handle: 'linkedin.com/in/h-m-shihab', label: 'LinkedIn' },
  { icon: FiMail, cmd: 'email', href: 'mailto:shihab2305341402@diu.edu.bd', handle: 'shihab2305341402@diu.edu.bd', label: 'Email' }
]

const TYPING_SPEED = 34

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)
  const [typedHeader, setTypedHeader] = useState('')

  // Typing effect for the terminal header title only
  useEffect(() => {
    let i = 0
    const text = 'contact.sh'
    const id = window.setInterval(() => {
      i += 1
      setTypedHeader(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, TYPING_SPEED)
    return () => window.clearInterval(id)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/xaqdonwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      if (response.ok) {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      setIsSubmitting(false)
      setSubmitError('Failed to send message. Please try again.')
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('shihab2305341402@diu.edu.bd')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">04 — Contact</span>
          <h2 className="section-title">
            Let's build <span className="text-gradient">something great</span>
          </h2>
          <p className="section-subtitle">
            Whether you have a Laravel project, backend opportunity, startup idea, or just
            want to connect, I'd love to hear from you.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          className="term-contact"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Terminal header */}
          <div className="term-contact-header">
            <div className="term-contact-dots">
              <span className="tc-dot tc-dot--r" />
              <span className="tc-dot tc-dot--y" />
              <span className="tc-dot tc-dot--g" />
            </div>
            <span className="term-contact-title">
              {typedHeader}
              <span className="tc-caret" aria-hidden="true" />
            </span>
            <span className="term-contact-actions" aria-hidden="true">⌘ K</span>
          </div>

          {/* Terminal body */}
          <div className="term-contact-body">
            {/* whoami */}
            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">whoami</span>
            </div>
            <div className="tc-output tc-output--block">
              <div className="tc-output-name">Hanjala Shihab</div>
              <div className="tc-output-sub">Backend Developer</div>
              <div className="tc-output-sub">Laravel Specialist</div>
            </div>

            <div className="tc-divider" />

            {/* status */}
            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">status</span>
            </div>
            <div className="tc-output tc-status">
              <span className="tc-status-item">
                <span className="tc-dot-green" /> Available for Internship
              </span>
              <span className="tc-status-item">
                <span className="tc-dot-green" /> Open for Freelance
              </span>
              <span className="tc-status-item">
                <span className="tc-dot-green" /> Open to Collaboration
              </span>
            </div>

            <div className="tc-divider" />

            {/* location + response time */}
            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">location</span>
            </div>
            <div className="tc-output">Dhaka, Bangladesh</div>

            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">response_time</span>
            </div>
            <div className="tc-output">Usually within 24 hours</div>

            <div className="tc-divider" />

            {/* socials as commands */}
            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">socials</span>
            </div>
            <div className="tc-output tc-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.cmd}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tc-social"
                  aria-label={social.label}
                >
                  <span className="tc-social-cmd">$ {social.cmd}</span>
                  <span className="tc-social-value">{social.handle}</span>
                </a>
              ))}
            </div>

            <div className="tc-divider" />

            {/* send_message form */}
            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">send_message</span>
            </div>

            <form className="tc-form" onSubmit={handleSubmit} noValidate>
              <div className="tc-form-field">
                <label htmlFor="name" className="tc-form-prompt">{'>'} Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="tc-form-field">
                <label htmlFor="email" className="tc-form-prompt">{'>'} Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="tc-form-field">
                <label htmlFor="subject" className="tc-form-prompt">{'>'} Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project, role, idea…"
                  autoComplete="off"
                />
              </div>

              <div className="tc-form-field tc-form-field--message">
                <label htmlFor="message" className="tc-form-prompt">{'>'} Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, role, or idea…"
                  rows="4"
                  required
                />
              </div>

              {/* Terminal output messages */}
              {isSubmitted && (
                <motion.div
                  className="tc-form-success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  role="status"
                >
                  <span className="tc-success-check">✓</span>
                  <span>
                    <strong>Transmission complete.</strong> Your message has been delivered.
                  </span>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  className="tc-form-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  role="alert"
                >
                  <span className="tc-error-x">✕</span>
                  {submitError}
                </motion.div>
              )}

              <div className="tc-form-actions">
                <motion.button
                  type="submit"
                  className="tc-submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Send message"
                >
                  {isSubmitting ? (
                    <>
                      <span className="tc-spinner" /> executing…
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FiCheck size={16} /> delivered ✓
                    </>
                  ) : (
                    <>
                      $ ./send-message <span className="tc-submit-arrow">→</span>
                    </>
                  )}
                </motion.button>
                <span className="tc-form-note">enter ↵ to transmit</span>
              </div>
            </form>

            {/* Email copy command */}
            <div className="tc-divider" />

            <div className="tc-line">
              <span className="tc-prompt">$</span>
              <span className="tc-cmd">direct_email</span>
            </div>
            <div className="tc-output">
              <button className="tc-email" onClick={copyEmail} aria-label="Copy email address">
                <span className="tc-email-value">shihab2305341402@diu.edu.bd</span>
                <span className={`tc-copy ${copied ? 'tc-copy--done' : ''}`}>
                  {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                </span>
                <span className="tc-copy-tip">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="tc-divider tc-divider--signoff" />

            {/* Sign-off */}
            <div className="tc-signoff">
              <p>Thanks for visiting.</p>
              <p>
                See you{' '}
                <a
                  href="https://github.com/HanjalaShihab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tc-signoff-link"
                >
                  :)<span className="tc-signoff-caret" aria-hidden="true" />
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact


