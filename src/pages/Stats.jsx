import { useState, useEffect } from 'react'
import { getWeeklyStats, getStreaks } from '../api/services'
import Navbar from '../components/Navbar'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import Spinner from '../components/Spinner'

const COLORS = ['#7F77DD', '#1D9E75', '#378ADD', '#BA7517', '#D4537E']
const DIFFICULTY_COLORS = { easy: '#5DCAA5', medium: '#EF9F27', hard: '#E66B6B' }

const Stats = () => {
  const [stats, setStats] = useState(null)
  const [streaks, setStreaks] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, streaksRes] = await Promise.all([
          getWeeklyStats(),
          getStreaks(),
        ])
        setStats(statsRes.data.stats)
        setStreaks(streaksRes.data.streaks)
      } catch (err) {
        console.error('Failed to fetch stats', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])


// replace
if (loading) {
  return <div style={styles.loading}>Loading your dashboard...</div>
}
// with
if (loading) {
  return <Spinner message="Loading your dashboard... (this may take a moment if the server is waking up)" />
}

  const topicData = (stats?.topicBreakdown || []).map((t) => ({
    name: t.topic,
    minutes: t.totalMinutes,
  }))

  const difficultyData = (stats?.difficultyBreakdown || []).map((d) => ({
    name: d.difficulty,
    value: d.count,
  }))

  // build streak dots — last 10 days
  const streakDots = []
  for (let i = 9; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    streakDots.push(date)
  }

  return (
    <div>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.pageTitle}>This week's stats</h2>

        {/* Summary cards */}
        <div style={styles.summaryRow}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{stats?.totalHours ?? 0}h</div>
            <div style={styles.summaryLabel}>Total hours this week</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{stats?.totalSessions ?? 0}</div>
            <div style={styles.summaryLabel}>Sessions logged</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryValue}>{stats?.avgSessionMinutes ?? 0} min</div>
            <div style={styles.summaryLabel}>Avg session length</div>
          </div>
        </div>

        <div className="stats-row" style={styles.row}>
          {/* Topic breakdown chart */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Time by topic</h3>
            {topicData.length === 0 ? (
              <div style={styles.empty}>No data yet this week</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={topicData} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} min`, 'Time']} />
                  <Bar dataKey="minutes" radius={[0, 6, 6, 0]}>
                    {topicData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Difficulty breakdown pie */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Difficulty distribution</h3>
            {difficultyData.length === 0 ? (
              <div style={styles.empty}>No data yet this week</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={index} fill={DIFFICULTY_COLORS[entry.name] || '#ccc'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Streak visualization */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Last 10 days</h3>
          <div style={styles.streakRow}>
            {streakDots.map((date, i) => {
              const isToday = date.toDateString() === new Date().toDateString()
              return (
                <div key={i} style={styles.streakDay}>
                  <div style={{
                    ...styles.streakDot,
                    background: i >= 10 - (streaks?.currentStreak || 0) ? '#7F77DD' : '#F1EFE8',
                    border: isToday ? '2px solid #3C3489' : 'none',
                  }} />
                  <div style={styles.streakLabel}>
                    {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={styles.streakSummary}>
            🔥 Current streak: <strong>{streaks?.currentStreak ?? 0} days</strong> &nbsp;|&nbsp;
            🏆 Best: <strong>{streaks?.longestStreak ?? 0} days</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { maxWidth: '900px', margin: '0 auto', padding: '0 20px 40px', fontFamily: 'Arial, sans-serif' },
  loading: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#888', fontFamily: 'Arial',
  },
  pageTitle: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' },
  summaryRow: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px', marginBottom: '20px',
  },
  summaryCard: {
    background: '#fff', borderRadius: '12px', padding: '18px',
    textAlign: 'center', boxShadow: '0 2px 12px rgba(127,119,221,0.08)',
  },
  summaryValue: { fontSize: '24px', fontWeight: '700', color: '#3C3489' },
  summaryLabel: { fontSize: '12px', color: '#888', marginTop: '4px' },
  row: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '14px', marginBottom: '14px',
  },
  card: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    boxShadow: '0 2px 12px rgba(127,119,221,0.08)',
  },
  cardTitle: { fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' },
  empty: { textAlign: 'center', padding: '60px 20px', color: '#aaa', fontSize: '13px' },
  streakRow: {
    display: 'flex', justifyContent: 'space-between', gap: '6px', marginBottom: '16px',
  },
  streakDay: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  streakDot: { width: '24px', height: '24px', borderRadius: '50%' },
  streakLabel: { fontSize: '10px', color: '#aaa' },
  streakSummary: { fontSize: '13px', color: '#666', textAlign: 'center', paddingTop: '8px', borderTop: '1px solid #F0F0F0' },
}

export default Stats