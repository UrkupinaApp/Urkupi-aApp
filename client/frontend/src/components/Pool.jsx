import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { BankOutlined, ClockCircleOutlined, DesktopOutlined } from '@ant-design/icons';
import { MiLayout } from '../layout/MiLayout';

const { Title } = Typography;

export const Pool = () => {
  return (
    <MiLayout>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Title level={2}>Pool de Sistemas</Title>
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: '30px' }}>
          {/* Botón Urkupiña Cajas */}
          <Col>
            <Button
              type="primary"
              icon={<BankOutlined />}
              size="large"
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
              href="http://xn--urkupiacajas-fhb.com/"
              target="_blank"
            >
              Cajas
            </Button>
          </Col>

          {/* Botón Urkupiña Turnos */}
          <Col>
            <Button
              type="primary"
              icon={<ClockCircleOutlined />}
              size="large"
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
              href="https://urkupinaturnos.store/"
              target="_blank"
            >
              Turnos
            </Button>
          </Col>

          {/* Botón Urkupiña Pantalla */}
          <Col>
            <Button
              type="primary"
              icon={<DesktopOutlined />}
              size="large"
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
              href="https://urkupinaturnos.store/pantalla"
              target="_blank"
            >
              Pantalla
            </Button>
          </Col>
        </Row>
      </div>
    </MiLayout>
  );
};
