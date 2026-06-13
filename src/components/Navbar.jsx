import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  const linkStyle = ({ isActive }) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    color: isActive ? '#fff' : '#7F77DD',
    background: isActive ? '#7F77DD' : 'transparent',
    transition: 'all 0.15s',
  })

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.logo}>⌨️ DevLog</div>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/stats" style={linkStyle}>Stats</NavLink>
        <NavLink to="/goals" style={linkStyle}>Goals</NavLink>
      </div>
      <div style={styles.right}>
        <span style={styles.userName}>{user?.name}</span>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  )
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    maxWidth: '900px', margin: '0 auto', padding: '16px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  left: { display: 'flex', alignItems: 'center', gap: '8px' },
  logo: { fontSize: '18px', fontWeight: '700', color: '#3C3489', marginRight: '12px' },
  right: { display: 'flex', alignItems: 'center', gap: '14px' },
  userName: { fontSize: '13px', color: '#888' },
  logoutBtn: {
    padding: '8px 18px', background: '#fff', color: '#7F77DD',
    border: '1.5px solid #7F77DD', borderRadius: '8px',
    fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
}

export default Navbar