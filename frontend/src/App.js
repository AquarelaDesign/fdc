import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import './App.css'

import logo from './assets/logo.png'

import Routes from './routes'

function App() {
  return (
    <div className="container">
      
      <img src={logo} alt="Ficha do Carro"/>
      
      <div className="content">
        <ToastProvider>
          <Routes />
        </ToastProvider>    
      </div>
    
    </div>

  )
}

export default App
