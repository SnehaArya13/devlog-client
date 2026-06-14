const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <div style={styles.message}>{message}</div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '60vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  spinner: {
    width: '36px', height: '36px', border: '3px solid #EEEDFE',
    borderTop: '3px solid #7F77DD', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  message: { color: '#888', fontSize: '14px' },
}

export default Spinner