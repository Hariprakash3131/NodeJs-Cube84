import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Users from './App.jsx'
import DayTwo from './components/useEffect.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Users />,
    <DayTwo/>
  </StrictMode>,
)
