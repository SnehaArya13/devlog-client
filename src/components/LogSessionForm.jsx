import { useState } from 'react'
import { createSession } from '../api/services'

const LogSessionForm = ({ onSessionAdded, onClose }) => {
  const [form, setForm] = useState({
    topic: '',
    durationMinutes: '',
    difficulty: 'medium',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await createSession({
        ...form,
        durationMinutes: Number(form.durationMinutes),
      })
      onSessionAdded()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Log a coding session</h3>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Topic</label>
            <input
              style={styles.input}
              type="text"
              name="topic"
              placeholder="e.g. DSA, Node.js, React"
              value={form.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Duration (minutes)</label>
            <input
              style={styles.input}
              type="number"
              name="durationMinutes"
              placeholder="60"
              value={form.durationMinutes}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Difficulty</label>
            <select
              style={styles.input}
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Notes (optional)</label>
            <textarea
              style={{ ...styles.input, resize: 'vertical', minHeight: '70px' }}
              name="notes"
              placeholder="What did you work on?"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Saving...' : 'Log session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.4)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  modal: {
    background: '#fff', borderRadius: '12px', padding: '28px',
    width: '100%', maxWidth: '420px', maxHeight: '90vh', overflowY: 'auto',
  },
  title: { fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' },
  error: {
    background: '#FCEBEB', color: '#791F1F', borderRadius: '8px',
    padding: '10px 14px', fontSize: '13px', marginBottom: '14px'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '500', color: '#444' },
  input: {
    padding: '10px 12px', borderRadius: '8px', fontSize: '14px',
    border: '1.5px solid #E0E0E0', outline: 'none', fontFamily: 'Arial',
  },
  actions: { display: 'flex', gap: '10px', marginTop: '8px' },
  cancelBtn: {
    flex: 1, padding: '10px', background: '#F1EFE8', color: '#444',
    border: 'none', borderRadius: '8px', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer',
  },
  submitBtn: {
    flex: 1, padding: '10px', background: '#7F77DD', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer',
  },
}

export default LogSessionForm