import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiSend,
  FiCheck,
  FiCopy,
  FiClock
} from 'react-icons/fi'
import './Contact.css'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/HanjalaShihab', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/h-m-shihab-a98039350/', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiMail, href: 'mailto:shihab2305341402@diu.edu.bd', label: 'Email' }
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
          message: formData.message
        })
      })

      if (response.ok) {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', message: '' })
        }, 3000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      setIsSubmitting(false)
      alert('Failed to send message. Please try again.')
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
            Let's build <span className="text-gradient">something solid</span>
          </h2>
          <p className="section-subtitle">
            Open to backend roles, full stack projects and interesting engineering problems.
          </p>
        </motion.div>

        <motion.div
          className="contact-layout"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left: contact card */}
          <motion.div className="contact-card glass-card" variants={item}>
            <div className="contact-card-glow" />
            <h3 className="contact-card-title">Contact Information</h3>
            <p className="contact-card-desc">
              I usually respond within 24 hours. For the fastest reply, use the form or
              email me directly.
            </p>

            <div className="contact-availability">
              <span className="pulse-dot" />
              <span>Currently available for freelance &amp; full-time</span>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon"><FiMail /></span>
                <div className="contact-text">
                  <span>Email</span>
                  <button className="email-btn" onClick={copyEmail} aria-label="Copy email address">
                    <span className="email-value">shihab2305341402@diu.edu.bd</span>
                    <span className={`copy-state ${copied ? 'copied' : ''}`}>
                      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    </span>
                    <span className="copy-tip">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon"><FiMapPin /></span>
                <div className="contact-text">
                  <span>Location</span>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon"><FiPhone /></span>
                <div className="contact-text">
                  <span>Phone</span>
                  <p>01306249460</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-icon"><FiClock /></span>
                <div className="contact-text">
                  <span>Response Time</span>
                  <p>Within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <span className="contact-social-label">Follow me</span>
              <div className="contact-social-icons">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="contact-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -6, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div className="contact-form-wrap" variants={item}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-header">
                <h3>Send a message</h3>
                <span className="form-status">
                  <span className="pulse-dot" /> All systems operational
                </span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, role, or idea…"
                  rows="5"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''} ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? (
                  <span className="loading-spinner" />
                ) : isSubmitted ? (
                  <>
                    <FiCheck size={18} /> Message Sent!
                  </>
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </motion.button>

              <p className="form-note">
                Built with Laravel-grade reliability — your message goes straight to my inbox.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

