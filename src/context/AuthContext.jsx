import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // on app load — if token exists, fetch the user
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await API.get('/api/me')
          setUser(res.data.user)
        } catch (_err) {
          // token invalid or expired
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [token])

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken)
    setToken(userToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook — any component can call useAuth() to get auth state
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)