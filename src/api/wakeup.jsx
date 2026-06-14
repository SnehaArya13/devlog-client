import API from './axios'

// pings the backend to wake it up if it's sleeping
export const wakeUpServer = () => {
  return API.get('/').catch(() => {
    // ignore errors — this is just a wake-up call
  })
}