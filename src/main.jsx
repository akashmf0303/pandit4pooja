import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </AuthProvider>
)
