import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

/* ============================================================
   Small centered toast shown inside/over the palette for
   text-only secret commands (quote, fortune, joke, coffee,
   hello, make me rich, rm -rf, 42, unknown, etc.)
   Also supports optional connect buttons (developer command).
   ============================================================ */
const SecretToast = ({ text, onClose, title, showConnect, onConnect }) => (
  <AnimatePresence>
    <motion.div
      className="secret-toast"
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      role="status"
    >
      {title && <div className="secret-toast-title">{title}</div>}
      <pre className="secret-toast-text">{text}</pre>
      {showConnect && (
        <div className="secret-toast-connect">
          <button className="secret-toast-connect-btn" onClick={() => onConnect?.('contact')}>Contact <FiArrowRight size={13} /></button>
          <button className="secret-toast-connect-btn" onClick={() => onConnect?.('linkedin')}>LinkedIn <FiArrowRight size={13} /></button>
        </div>
      )}
      <button className="secret-toast-close" onClick={onClose}>OK</button>
    </motion.div>
  </AnimatePresence>
)

export default SecretToast

