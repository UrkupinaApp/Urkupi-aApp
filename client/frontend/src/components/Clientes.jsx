
import React from 'react'
import { MiLayout } from '../layout/MiLayout'
import { Container } from './Container'
import {Row,Col} from 'antd'
import ClientesTable from './CleintesTable'
import ClienteForm from './ClienteForm'

export const Clientes = () => {
  return (
    <MiLayout>

      <div style={{display:"flex",justifyContent:"center",alignItems:"center", width:"100%" ,height:"100%", flexDirection:"column"}}>

        <div style={{widht:"100vw",height:"500px", background:"rgba(255,255,255,0.5)" ,padding:"10px",marginTop:"5px",borderRadius:"10px"}}>
            <h2 style={{fontSize:"19px"}}>Inserta un Nuevo Cliente:</h2>
            <ClienteForm/>

          </div>
          <div style={{widht:"100vw",height:"400px", background:"rgba(255,255,255,0.4)" ,padding:"10px",marginTop:"9px",borderRadius:"20px"}}>

              <ClientesTable/>

          </div>


      </div>
   
   
    </MiLayout>
  )
}
