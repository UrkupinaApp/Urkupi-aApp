import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Dashboard } from '../components/Dashboard'
import { Private } from '../views/Private'

export const AppRoutes = () => {
  return (
   
        <Routes>
           
            <Route path='/private/dashboard' element={<Dashboard/>}/>

        </Routes>
    
 
  )
}
