import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/css/main.css'

const isInDevelopment = import.meta.env.DEV;

createRoot(document.getElementById('root')!).render(
  isInDevelopment ?
    <StrictMode>
      <App />
    </StrictMode>
    :
    <App />
)
