import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#3C3489' }}>Welcome, {user?.name}! 👋</h1>
      <p style={{ color: '#888' }}>Dashboard coming in Day 12.</p>
      <button
        onClick={logout}
        style={{
          marginTop: '1rem', padding: '8px 20px',
          background: '#7F77DD', color: '#fff',
          border: 'none', borderRadius: '8px', cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard