import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.code}>404</div>
      <div style={styles.text}>Page not found</div>
      <Link to="/dashboard" style={styles.link}>Go to Dashboard</Link>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '12px',
    fontFamily: 'Arial, sans-serif', background: '#F4F3FF',
  },
  code: { fontSize: '64px', fontWeight: '700', color: '#7F77DD' },
  text: { fontSize: '16px', color: '#888' },
  link: {
    marginTop: '8px', padding: '10px 24px', background: '#7F77DD',
    color: '#fff', borderRadius: '8px', textDecoration: 'none',
    fontSize: '14px', fontWeight: '600',
  },
}

export default NotFound