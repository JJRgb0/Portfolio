import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/css/main.css'

const isInDevelopment = import.meta.env.DEV;

createRoot(document.getElementById('root')!).render(
  isInDevelopment ?
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
    :
    <Provider store={store}>
      <App />
    </Provider>
)
