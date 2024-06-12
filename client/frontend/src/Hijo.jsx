import React, { useContext } from 'react'
import { miContext } from './context/AuthContext'

export const Hijo = () => {
    const Authcontext = useContext(miContext)
    //console.log(Authcontext)
  return (
    <>
    <h1>Valor del context:{Authcontext.saludo}</h1>
    <button onClick={Authcontext.Login}>Login</button>
    
    </>
  )
}

