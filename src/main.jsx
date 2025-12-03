import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD
import { ThemeProvider } from './lib/theme-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="honorink-theme">
      <App />
    </ThemeProvider>
=======

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
  </StrictMode>,
)
