import React from 'react';
import { MiLayout } from '../layout/MiLayout';
import { Row, Col, Card, Tabs } from 'antd';
import Barchart from './Barchart';
import DineroGeneradoComponent from './DineroGenerado';
import ClientesCargadosComponent from './ClientesCargados';
import TicketsDelDia from './TicketsDelDia';
import Clima from './Clima';
import SetTable from './Table'; // Importa la tabla SetTable
import TicketsCortesiaTable from './TableCortesia'; // Importa la tabla TicketsCortesiaTable

const { TabPane } = Tabs;

export const Dashboard = () => {
  return (
    <MiLayout>
      {/* Primera fila con los tres componentes superiores */}
      <Row gutter={[16, 16]} style={{ minHeight: "300px", marginTop: "30px" }}>
        <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%", height: "300px", backdropFilter: "blur(10px)", border: "none" }}>
            <h2>Tickets Generados</h2>
            <Barchart style={{ with: "90px", height: "100%" }} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%", backdropFilter: "blur(10px)", border: "none", padding: "20px" }}>
            <DineroGeneradoComponent />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "80%", backdropFilter: "blur(10px)", border: "none" }}>
            <ClientesCargadosComponent />
          </Card>
        </Col>
      </Row>

      {/* Segunda fila con los componentes inferiores */}
   
      {/* Pestañas para las tablas */}
      <Row gutter={[16, 16]} style={{ marginTop: "50px" }}>
        <Col xs={24} sm={24} md={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: "90%", backdropFilter: "blur(10px)", border: "none" }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Tabla SetTable" key="1">
                {/* Renderiza la tabla SetTable */}
                <SetTable/>
              </TabPane>
              <TabPane tab="Tabla TicketsCortesiaTable" key="2">
                {/* Renderiza la tabla TicketsCortesiaTable */}
                <TicketsCortesiaTable />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </MiLayout>
  );
};
