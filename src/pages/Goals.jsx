import { useState, useEffect } from 'react'
import { getGoal, setGoal, updateGoal } from '../api/services'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

const Goals = () => {
  const [goalData, setGoalData] = useState(null)
  const [hasGoal, setHasGoal] = useState(true)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchGoal = async () => {
    try {
      const res = await getGoal()
      setGoalData(res.data)
      setHasGoal(true)
      setInput(res.data.goal.dailyTargetMinutes)
    } catch (err) {
      if (err.response?.status === 404) {
        setHasGoal(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoal()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (hasGoal) {
        await updateGoal({ dailyTargetMinutes: Number(input) })
      } else {
        await setGoal({ dailyTargetMinutes: Number(input) })
      }
      await fetchGoal()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save goal')
    } finally {
      setSaving(false)
    }
  }

  

// replace
if (loading) {
  return <div style={styles.loading}>Loading your dashboard...</div>
}
// with
if (loading) {
  return <Spinner message="Loading your dashboard... (this may take a moment if the server is waking up)" />
}

  const progress = goalData?.today?.progressPercent ?? 0
  const goalMet = goalData?.today?.goalMet ?? false

  return (
    <div>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.pageTitle}>Daily Goal</h2>

        {hasGoal && goalData && (
          <div style={styles.card}>
            <div style={styles.progressHeader}>
              <div>
                <div style={styles.progressLabel}>Today's progress</div>
                <div style={styles.progressValue}>
                  {goalData.today.minutesLogged} / {goalData.today.targetMinutes} min
                </div>
              </div>
              <div style={{
                ...styles.statusBadge,
                background: goalMet ? '#EAF3DE' : '#FAEEDA',
                color: goalMet ? '#27500A' : '#633806',
              }}>
                {goalMet ? '🎉 Goal met!' : `${goalData.today.remaining} min to go`}
              </div>
            </div>

            <div style={styles.progressBarBg}>
              <div style={{
                ...styles.progressBarFill,
                width: `${progress}%`,
                background: goalMet ? '#1D9E75' : '#7F77DD',
              }} />
            </div>
            <div style={styles.progressPercent}>{progress}%</div>
          </div>
        )}

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>
            {hasGoal ? 'Update your daily target' : 'Set your daily target'}
          </h3>
          <p style={styles.cardSub}>
            How many minutes do you want to code each day?
          </p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="number"
              min="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 240"
              style={styles.input}
              required
            />
            <button type="submit" disabled={saving} style={styles.submitBtn}>
              {saving ? 'Saving...' : hasGoal ? 'Update goal' : 'Set goal'}
            </button>
          </form>

          <div style={styles.presets}>
            {[60, 120, 180, 240, 300].map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => setInput(minutes)}
                style={{
                  ...styles.presetBtn,
                  background: Number(input) === minutes ? '#EEEDFE' : '#fff',
                  borderColor: Number(input) === minutes ? '#7F77DD' : '#E0E0E0',
                }}
              >
                {minutes / 60}h
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { maxWidth: '600px', margin: '0 auto', padding: '0 20px 40px', fontFamily: 'Arial, sans-serif' },
  loading: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#888', fontFamily: 'Arial',
  },
  pageTitle: { fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px' },
  card: {
    background: '#fff', borderRadius: '12px', padding: '22px',
    boxShadow: '0 2px 12px rgba(127,119,221,0.08)', marginBottom: '16px',
  },
  progressHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: '14px',
  },
  progressLabel: { fontSize: '12px', color: '#888' },
  progressValue: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginTop: '4px' },
  statusBadge: {
    fontSize: '12px', fontWeight: '600', padding: '6px 12px', borderRadius: '20px',
  },
  progressBarBg: {
    height: '10px', background: '#F1EFE8', borderRadius: '20px', overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: '20px', transition: 'width 0.3s' },
  progressPercent: { fontSize: '12px', color: '#aaa', textAlign: 'right', marginTop: '6px' },
  cardTitle: { fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' },
  cardSub: { fontSize: '13px', color: '#888', marginBottom: '16px' },
  error: {
    background: '#FCEBEB', color: '#791F1F', borderRadius: '8px',
    padding: '10px 14px', fontSize: '13px', marginBottom: '14px'
  },
  form: { display: 'flex', gap: '10px' },
  input: {
    flex: 1, padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
    border: '1.5px solid #E0E0E0', outline: 'none',
  },
  submitBtn: {
    padding: '10px 20px', background: '#7F77DD', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer',
  },
  presets: { display: 'flex', gap: '8px', marginTop: '14px' },
  presetBtn: {
    flex: 1, padding: '8px', borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', color: '#7F77DD', border: '1.5px solid #E0E0E0',
    cursor: 'pointer', background: '#fff',
  },
}

export default Goals