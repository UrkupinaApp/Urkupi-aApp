
import React, { useState } from 'react'
import { TicketProvider } from '../context/TicketContext'


import { MiLayout } from '../layout/MiLayout'
import SetTable from './Table'
import {Row, Col} from 'antd'



import { Ticket } from './Ticket'
import { TicketCortesia } from './TicketCortesia'


export const Tickets = () => {



  const [user,SetUser] = useState("")
  const [numTicket,setNumTicket] = useState(0)


 
    const HandlerUserChange =(e)=>{
      e.preventDefault()
      SetUser(e.target.value)
    }
  return (

    <MiLayout>
      <TicketProvider>
      <div style={{width:"100%" ,marginTop:"110px",height:"100vh"}}>

    
        <Row style={{background:"rgba(255,255,255,0.4)" , backdropFilter:"blur(10px)",marginTop:"20px"}}> 
          <Col span={12} style={{textAlign:"center"}}>
            
        <TicketCortesia></TicketCortesia>

          </Col>
          <Col span={12} style={{background:"transparent"}}>
            <Ticket style={{background:"transparent",width:"300PX"}} />
           
          </Col>
        </Row>
      </div>
    </TicketProvider>
    </MiLayout>
  )
}
