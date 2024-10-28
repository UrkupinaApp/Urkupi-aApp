import React, { useRef, useState } from 'react';
import urkupiña from '../assets/logo_64.png';
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import Qr from '../components/Qr';
import { useReactToPrint } from 'react-to-print';
import { useTicketContext } from '../context/TicketContext';
import Clock from './Clock';

export const TicketCortesia = () => {
  const AppUserData = "AppUserData";
  const userData = JSON.parse(localStorage.getItem(AppUserData));
  console.log("userDAta del ticket", userData);

  const { updateTicketData } = useTicketContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const obtenerFechaHoraActual = () => {
    const fechaActual = new Date();

    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();

    return {
      dia,
      mes,
      año,
      hora,
      minutos,
      segundos,
    };
  };

  const Dia = obtenerFechaHoraActual();
  const componentRef = useRef();

  // Función para generar un número de ticket único y corto
  const generarNumeroTicket = () => {
    const randomNum = Math.floor(Math.random() * 1000000) + 1;
    return `COR${Dia.año}${Dia.mes}${Dia.dia}${Dia.hora}${Dia.minutos}${Dia.segundos}${randomNum}`;
  };

  const numeroTicket = generarNumeroTicket();

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRef.current;
    },
    onAfterPrint: () => {
      sendPrintedTicket(numeroTicket); // Enviar el ticket con el número único generado
    },
  });

  const sendPrintedTicket = async (ticketNumber) => {
    setIsLoading(true);

    try {
      const ticketData = {
        N_ticket: ticketNumber, 
        id_cliente: userData.user_id, 
        dia: `${Dia.año}-${Dia.mes}-${Dia.dia}`, 
        qr_code: ticketNumber, // Usamos el mismo número único para el QR
        id_molinete: userData.id_molinete || 1, 
        precio: 0,
        id_caja: userData.caja,
        user_id: userData.user_id, 
      };

      const response = await fetch('https://xn--urkupia-9za.store/tickets/ticketcortesia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        setIsModalVisible(true);
        console.log(response)
        setTimeout(() => {
          setIsModalVisible(false);
        }, 3000);
      } else {
        console.error('Error al enviar el ticket');
      }
    } catch (error) {
      console.error('Error al enviar el ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ width: '80%', background: "", textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ border: '2px solid rgba(0,0,0,0.4)', borderRadius: '5px', background: 'rgba(255,255,255,0.9)', width: '270px', marginLeft: '30px' }} ref={componentRef}>
        <img src={urkupiña} alt='urkupiña logo' />
        <hr style={{ height: '3px', background: 'black' }} />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '350px', height: '60px', justifyContent: 'center', alignItems: 'center', padding: '10px', fontSize: "10px" }}>
            <h2>Dia: {Dia.dia}/{Dia.mes}/{Dia.año}</h2>
          </div>

          <div style={{ display: 'flex', width: '150px', height: '60px', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <p style={{ marginRight: '9px', fontSize: '18px', fontWeight: '600', width: '50%', height: '100%' }}>Hora:</p>
              <div>{<Clock />}</div>
            </div>
          </div>
        </div>
        <hr style={{ height: '3px', background: 'black' }} />
        <div>
          <h3>{userData.tipoBaño}</h3>
          <h5>caja: {userData.caja}</h5>
        </div>
        <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
          <div style={{ padding: '10px', margin: '5px 5px 5px' }}>
            <h2 style={{ fontSize: "14px" }}>Ticket Nº {numeroTicket}</h2>
          </div>
          <Qr textoQr={numeroTicket} />
        </div>
        <div>
          <h3>Valido por 1 uso Baño </h3>
        </div>
        <hr style={{ height: '3px', background: 'black' }} />
        <div style={{ margin: '10px 5px', width: "100%", fontSize: "11px" }}>
          <h2>https://urkupinaonline.com.ar</h2>
        </div>
      </div>
      <div>
        <Button style={{ marginTop: '10px' }} type="primary" size="large" shape="default" icon={<PrinterOutlined />} onClick={handlePrint}>
          Imprimir
        </Button>
      </div>

      <Modal
        title="Ticket enviado"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCloseModal}
      >
        <Spin spinning={isLoading} size="large" tip="Enviando...">
          <p style={{ fontSize: "18px" }}>¡Ticket enviado exitosamente!</p>
        </Spin>
      </Modal>
    </div>
  );
};
