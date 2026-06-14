import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getSessions, deleteSession, getStreaks, getWeeklyStats } from '../api/services'
import Navbar from '../components/Navbar'
import MetricCard from '../components/MetricCard'
import SessionItem from '../components/SessionItem'
import LogSessionForm from '../components/LogSessionForm'
import Spinner from '../components/Spinner'

const Dashboard = () => {
  const {user} = useAuth()
  const [sessions, setSessions] = useState([])
  const [streaks, setStreaks] = useState(null)
  const [weeklyStats, setWeeklyStats] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchAllData = async () => {
    try {
      const [sessionsRes, streaksRes, statsRes] = await Promise.all([
        getSessions(),
        getStreaks(),
        getWeeklyStats(),
      ])
      setSessions(sessionsRes.data.sessions)
      setStreaks(streaksRes.data.streaks)
      setWeeklyStats(statsRes.data.stats)
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteSession(id)
      fetchAllData()
    } catch (err) {
      console.error('Failed to delete session', err)
    }
  }

  const handleSessionAdded = () => {
    fetchAllData()
  }


// replace
if (loading) {
  return <div style={styles.loading}>Loading your dashboard...</div>
}
// with
if (loading) {
  return <Spinner message="Loading your dashboard... (this may take a moment if the server is waking up)" />
}

  // calculate today's minutes from sessions
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todaySessions = sessions.filter((s) => new Date(s.date) >= todayStart)
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.durationMinutes, 0)

  return (
    <div style={styles.page}>
      {/* Header */}
      <Navbar />
      <div style={styles.greeting}>Welcome back, {user?.name?.split(' ')[0]} 👋</div>

      {/* Metrics */}
      <div className="Metrics-grid" style={styles.metrics}>
        <MetricCard
          icon="🔥"
          label="Current streak"
          value={streaks?.currentStreak ?? 0}
          sub={streaks?.currentStreak === 1 ? 'day' : 'days'}
        />
        <MetricCard
          icon="⏱️"
          label="Today"
          value={`${(todayMinutes / 60).toFixed(1)}h`}
          sub={`${todaySessions.length} session${todaySessions.length !== 1 ? 's' : ''}`}
        />
        <MetricCard
          icon="📅"
          label="This week"
          value={`${weeklyStats?.totalHours ?? 0}h`}
          sub={`${weeklyStats?.totalSessions ?? 0} sessions`}
        />
        <MetricCard
          icon="🏆"
          label="Best streak"
          value={streaks?.longestStreak ?? 0}
          sub="personal best"
        />
      </div>

      {/* Recent sessions */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Recent sessions</h3>
          <button onClick={() => setShowForm(true)} style={styles.addBtn}>
            + Log session
          </button>
        </div>

        {sessions.length === 0 ? (
          <div style={styles.empty}>No sessions logged yet. Start your streak today!</div>
        ) : (
          <div>
            {sessions.slice(0, 8).map((session) => (
              <SessionItem key={session._id} session={session} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <LogSessionForm
          onSessionAdded={handleSessionAdded}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '900px', margin: '0 auto', padding: '24px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  loading: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#888', fontFamily: 'Arial',
  },
  metrics: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px', marginBottom: '24px',
  },
  card: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    boxShadow: '0 2px 12px rgba(127,119,221,0.08)',
  },
  cardHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '12px',
  },
  cardTitle: { fontSize: '15px', fontWeight: '600', color: '#1a1a1a' },
  addBtn: {
    padding: '8px 16px', background: '#7F77DD', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer',
  },
  empty: {
    textAlign: 'center', padding: '40px 20px', color: '#aaa', fontSize: '14px',
  },
}

export default Dashboard