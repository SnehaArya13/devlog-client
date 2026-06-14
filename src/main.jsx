import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { wakeUpServer } from './api/wakeup'

wakeUpServer()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)