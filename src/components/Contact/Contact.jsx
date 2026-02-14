import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck, FiCopy } from 'react-icons/fi'
import './Contact.css'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/HanjalaShihab', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiMail, href: 'mailto:shihab2305341402@diu.edu.bd', label: 'Email' }
]

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
        <motion.div className="section-header reveal-item reveal-down">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's create something extraordinary together
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div className="contact-info reveal-item reveal-left">
            <h3>Let's Talk</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your visions. Feel free to reach out through any of the 
              platforms below.
            </p>

            <div className="contact-details">
              <motion.div 
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div className="contact-text">
                  <span>Email</span>
                  <button className="email-btn" onClick={copyEmail}>
                    shihab2305341402@diu.edu.bd
                    {copied ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ x: 10 }}
              >
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <div className="contact-text">
                  <span>Location</span>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ x: 10 }}
              >
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <div className="contact-text">
                  <span>Phone</span>
                  <p>01306249460</p>
                </div>
              </motion.div>
            </div>

            <div className="social-links">
              <span>Follow Me</span>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -8, boxShadow: '0 10px 25px rgba(0, 255, 136, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-form-container reveal-item reveal-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
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
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
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
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''} ${isSubmitted ? 'submitted' : ''}`}
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(0, 255, 136, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <span className="loading-spinner" />
                ) : isSubmitted ? (
                  <>
                    <FiCheck /> Message Sent!
                  </>
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

