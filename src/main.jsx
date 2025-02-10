import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CookiesProvider>
    <App />
    </CookiesProvider>
    </BrowserRouter>
  </StrictMode>,
)
