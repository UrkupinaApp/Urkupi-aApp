import React from 'react';
import { MiLayout } from '../layout/MiLayout';
import { Tabs } from 'antd';
import ClientesTable from './CleintesTable';
import ClienteForm from './ClienteForm';

const { TabPane } = Tabs;

export const Clientes = () => {
  return (
    <MiLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100",
            height: "600px",
            background: "rgba(255,255,255,0.5)",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Insertar Cliente" key="1">
              <h2 style={{ fontSize: "19px" }}>Inserta un Nuevo Cliente:</h2>
              <ClienteForm />
            </TabPane>
            <TabPane tab="Ver Clientes" key="2">
              <ClientesTable />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </MiLayout>
  );
};
