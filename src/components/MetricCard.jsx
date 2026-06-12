const MetricCard = ({ icon, label, value, sub }) => {
  return (
    <div style={styles.card}>
      <div style={styles.label}>
        <span style={styles.icon}>{icon}</span> {label}
      </div>
      <div style={styles.value}>{value}</div>
      {sub && <div style={styles.sub}>{sub}</div>}
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '16px 18px',
    boxShadow: '0 2px 12px rgba(127,119,221,0.08)',
  },
  label: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  icon: { fontSize: '16px' },
  value: { fontSize: '26px', fontWeight: '600', color: '#1a1a1a' },
  sub: { fontSize: '12px', color: '#aaa', marginTop: '4px' },
}

export default MetricCard