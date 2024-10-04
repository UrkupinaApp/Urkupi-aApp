import React from 'react'
import {AuthContext} from './context/AuthContext'
import './App.css'

import { Router } from './routes/Router'
import { Router2 } from './routes/Router2'
const App = () => {
  return (
    <AuthContext>
     <Router/>
    </AuthContext>
  )
}

export default App