import React from 'react'
import { MiLayout } from '../layout/MiLayout'


import { Row, Col,Card } from 'antd';
import Barchart from './Barchart';
import DineroGeneradoComponent from './DineroGenerado';
import ClientesCargadosComponent from './ClientesCargados';
import TicketsDelDia from './TicketsDelDia';
import Clima from './Clima';

export const Dashboard = () => {
  return (
    <MiLayout>
   
     <Row gutter={[16, 16]} style={{ minHeight: "300px",marginTop:"30px" }}>
        <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%",height:"300px",  backdropFilter: "blur(10px)", border: "none" }}>
            <h2>Tickets Generados</h2>
            <Barchart style={{with:"90px",height:"100%"}}/>
           
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%" , backdropFilter: "blur(10px)", border: "none",padding:"20px" }}>
           
            <DineroGeneradoComponent/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%",  backdropFilter: "blur(10px)", border: "none" }}>
            <ClientesCargadosComponent/>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ minHeight: "300px",marginTop:"150px" }}>
        <Col xs={24} sm={24} md={9} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%", backdropFilter: "blur(10px)", border: "none" }}>
            <h2>Clima en la Ciudad:</h2>
            <Clima/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%", backdropFilter: "blur(10px)", border: "none" }}>
            
            <TicketsDelDia/>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
       
        </Col>
      </Row>
  );
    </MiLayout>
  )
}
