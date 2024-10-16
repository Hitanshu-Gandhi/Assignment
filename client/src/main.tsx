import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://assignment-uoyn.onrender.com'
axios.defaults.headers.common['token'] = localStorage.getItem('token') ;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
