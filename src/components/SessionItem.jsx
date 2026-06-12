const difficultyColors = {
  easy: { bg: '#EAF3DE', text: '#27500A' },
  medium: { bg: '#FAEEDA', text: '#633806' },
  hard: { bg: '#FCEBEB', text: '#791F1F' },
}

const SessionItem = ({ session, onDelete }) => {
  const colors = difficultyColors[session.difficulty] || difficultyColors.medium
  const date = new Date(session.date)
  const timeStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) +
    ', ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={styles.item}>
      <div style={styles.info}>
        <div style={styles.topic}>{session.topic}</div>
        <div style={styles.meta}>{timeStr}</div>
        {session.notes && <div style={styles.notes}>{session.notes}</div>}
      </div>
      <div style={styles.right}>
        <span style={{ ...styles.badge, background: colors.bg, color: colors.text }}>
          {session.difficulty}
        </span>
        <span style={styles.duration}>{session.durationMinutes} min</span>
        <button onClick={() => onDelete(session._id)} style={styles.deleteBtn}>✕</button>
      </div>
    </div>
  )
}

const styles = {
  item: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '12px 0', borderBottom: '1px solid #F0F0F0',
  },
  info: { flex: 1 },
  topic: { fontSize: '14px', fontWeight: '600', color: '#1a1a1a' },
  meta: { fontSize: '12px', color: '#aaa', marginTop: '2px' },
  notes: { fontSize: '12px', color: '#888', marginTop: '4px' },
  right: { display: 'flex', alignItems: 'center', gap: '10px' },
  badge: {
    fontSize: '11px', fontWeight: '600', padding: '3px 10px',
    borderRadius: '20px', textTransform: 'capitalize',
  },
  duration: { fontSize: '13px', fontWeight: '600', color: '#888', minWidth: '50px', textAlign: 'right' },
  deleteBtn: {
    background: 'none', border: 'none', color: '#ccc',
    cursor: 'pointer', fontSize: '14px', padding: '0 4px',
  },
}

export default SessionItem