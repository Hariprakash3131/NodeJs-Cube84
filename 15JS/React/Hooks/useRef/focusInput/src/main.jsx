import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StorePrevious from './StorePrevious.jsx'
import Timer from './TimerId.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <StorePrevious />
    <Timer/>
  </StrictMode>
)