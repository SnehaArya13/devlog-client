import API from './axios'

// Sessions
export const getSessions = () => API.get('/api/sessions')
export const createSession = (data) => API.post('/api/sessions', data)
export const deleteSession = (id) => API.delete(`/api/sessions/${id}`)

// Goals
export const getGoal = () => API.get('/api/goals')
export const setGoal = (data) => API.post('/api/goals', data)
export const updateGoal = (data) => API.put('/api/goals', data)

// Streaks
export const getStreaks = () => API.get('/api/streaks')

// Stats
export const getWeeklyStats = () => API.get('/api/stats/weekly')