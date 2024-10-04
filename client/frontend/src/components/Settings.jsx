import React from 'react';
import { MiLayout } from '../layout/MiLayout';
import Ajustes from './Ajustes';
import { TicketValue } from './TicketValue';
import { ValueTicketProvider } from '../context/ValueTicketContext'; // Importa el nuevo proveedor

export const Settings = () => {
  return (
    <ValueTicketProvider>
      <MiLayout>
        <Ajustes />
        
      </MiLayout>
    </ValueTicketProvider>
  );
};
