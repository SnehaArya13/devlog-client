import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await API.post('/api/auth/register', form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>⌨️ DevLog</div>
        <h2 style={styles.title}>Create your account</h2>
        <p style={styles.sub}>Start tracking your coding journey</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Sneha Arya"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="sneha@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="min 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={styles.switch}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F4F3FF',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(127,119,221,0.12)',
  },
  logo: { fontSize: '24px', fontWeight: '700', color: '#3C3489', marginBottom: '20px' },
  title: { fontSize: '22px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 6px' },
  sub: { fontSize: '14px', color: '#888', marginBottom: '24px' },
  error: {
    background: '#FCEBEB', color: '#791F1F', borderRadius: '8px',
    padding: '10px 14px', fontSize: '13px', marginBottom: '16px'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '500', color: '#444' },
  input: {
    padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
    border: '1.5px solid #E0E0E0', outline: 'none', transition: 'border 0.2s',
  },
  btn: {
    padding: '12px', background: '#7F77DD', color: '#fff', border: 'none',
    borderRadius: '8px', fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', marginTop: '8px',
  },
  switch: { textAlign: 'center', fontSize: '13px', color: '#888', marginTop: '20px' },
  link: { color: '#7F77DD', fontWeight: '600', textDecoration: 'none' },
}

export default Register