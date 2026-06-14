import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  const linkStyle = ({ isActive }) => ({
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    color: isActive ? '#fff' : '#7F77DD',
    background: isActive ? '#7F77DD' : 'transparent',
    whiteSpace: 'nowrap',
  })

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.logo}>⌨️ DevLog</div>
        <div style={styles.links}>
          <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/stats" style={linkStyle}>Stats</NavLink>
          <NavLink to="/goals" style={linkStyle}>Goals</NavLink>
        </div>
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
    maxWidth: '900px', margin: '0 auto', padding: '16px 16px',
    fontFamily: 'Arial, sans-serif', flexWrap: 'wrap', gap: '12px',
  },
  left: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  links: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  logo: { fontSize: '17px', fontWeight: '700', color: '#3C3489', marginRight: '4px' },
  right: { display: 'flex', alignItems: 'center', gap: '10px' },
  userName: { fontSize: '13px', color: '#888', display: 'none' },
  logoutBtn: {
    padding: '7px 14px', background: '#fff', color: '#7F77DD',
    border: '1.5px solid #7F77DD', borderRadius: '8px',
    fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
  },
}

export default Navbar