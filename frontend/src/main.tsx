import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAuthStore } from './stores/authStore.ts'
import { setupInterceptors } from './config/axios.ts'

setupInterceptors(
  ()=>useAuthStore.getState().token,
  useAuthStore.getState().setToken,
  useAuthStore.getState().updateUser
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
