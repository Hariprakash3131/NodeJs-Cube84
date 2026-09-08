import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Like from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Like/>
  </StrictMode>,
)
