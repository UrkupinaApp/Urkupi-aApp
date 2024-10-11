import React from 'react';
import { MiLayout } from '../layout/MiLayout';
import TicketsAnalytics from "./TicketsAnalitycs"
import { Row, Col, Card } from 'antd';

export const Analithycs = () => {
  return (
    <MiLayout>
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: '100vh', padding: '20px' }}
      >
        <Col xs={24} sm={24} md={20} lg={16} xl={12}>
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TicketsAnalytics />
          </Card>
        </Col>
      </Row>
    </MiLayout>
  );
};
