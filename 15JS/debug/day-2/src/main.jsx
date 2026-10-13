import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Users from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Users />
  </StrictMode>,
)
