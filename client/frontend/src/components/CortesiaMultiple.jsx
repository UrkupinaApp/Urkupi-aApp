import React, { useState } from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { Canvg } from 'canvg';
import { useTicketContext } from '../context/TicketContext';
import svgLogo from '../assets/logo_64.svg'; // Ruta del SVG cargado

export const TicketCortesiaMultiple = () => {
  const AppUserData = "AppUserData";
  const userData = JSON.parse(localStorage.getItem(AppUserData));
  const { cortesiaCounter, incrementCortesiaCounter } = useTicketContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const obtenerFechaHoraActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const año = fechaActual.getFullYear();
    const hora = fechaActual.toLocaleTimeString();
    return { dia, mes, año, hora };
  };

  const Dia = obtenerFechaHoraActual();

  const renderSvgToCanvas = async (svgPath) => {
    const response = await fetch(svgPath);
    const svgText = await response.text();
    const canvas = document.createElement('canvas');
    canvas.width = 150; // Ajustar el ancho del SVG para que se vea más amplio
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    const v = await Canvg.fromString(ctx, svgText);
    await v.render();

    return canvas.toDataURL('image/png');
  };

  const generatePDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    setIsLoading(true);

    // Renderizar el SVG en una imagen PNG
    const logoData = await renderSvgToCanvas(svgLogo);

    for (let i = 0; i < 20; i++) {
      const ticketNumber = `Cortesia-${Dia.año}-${Dia.mes}-${Dia.dia}-${cortesiaCounter + i}`;
      const qrCodeData = await QRCode.toDataURL(ticketNumber);

      // Establecer márgenes y dimensiones del ticket
      const marginLeft = 20;
      const marginTop = 20;
      const ticketWidth = 170;
      const ticketHeight = 260;

      // Dibujar el marco del ticket
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(marginLeft, marginTop, ticketWidth, ticketHeight);

      // Añadir el logo de Urkupiña en la parte superior centrado
      doc.addImage(logoData, 'PNG', marginLeft + (ticketWidth / 2) - 37.5, marginTop + 10, 75, 50);

      // Línea separadora
      doc.line(marginLeft + 10, marginTop + 65, marginLeft + ticketWidth - 10, marginTop + 65);

      // Añadir la fecha y la hora en la siguiente línea
      doc.setFontSize(12);
      doc.text(`Dia: ${Dia.dia}/${Dia.mes}/${Dia.año}`, marginLeft + 10, marginTop + 80);
      doc.text(`Hora: ${Dia.hora}`, marginLeft + ticketWidth - 50, marginTop + 80);

      // Línea separadora
      doc.line(marginLeft + 10, marginTop + 85, marginLeft + ticketWidth - 10, marginTop + 85);

      // Añadir el número de ticket en un nuevo renglón, centrado
      doc.setFontSize(14);
      doc.text(`Nº de Ticket: ${ticketNumber}`, marginLeft + (ticketWidth / 2), marginTop + 100, { align: 'center' });

      // Línea separadora
      doc.line(marginLeft + 10, marginTop + 105, marginLeft + ticketWidth - 10, marginTop + 105);

      // Añadir el código QR centrado en el ticket y hacerlo un poco más grande
      doc.addImage(qrCodeData, 'PNG', marginLeft + (ticketWidth / 2) - 35, marginTop + 110, 70, 70);

      // Línea separadora
      doc.line(marginLeft + 10, marginTop + 185, marginLeft + ticketWidth - 10, marginTop + 185);

      // Añadir información adicional centrada en la parte inferior
      doc.setFontSize(10);
      doc.text('Valido por 1 uso Baño', marginLeft + (ticketWidth / 2), marginTop + 200, { align: 'center' });
      doc.text('https://urkupinaonline.com.ar', marginLeft + (ticketWidth / 2), marginTop + 215, { align: 'center' });

      if (i < 19) {
        doc.addPage(); // Añadir nueva página si no es la última
      }

      await sendPrintedTicket(ticketNumber);
    }

    doc.save('tickets_cortesia.pdf');
    setIsLoading(false);

    // Incrementar el contador en 20 una vez finalizado
    for (let i = 0; i < 20; i++) {
      incrementCortesiaCounter();
    }
  };

  const sendPrintedTicket = async (ticketNumber) => {
    try {
      const ticketData = {
        N_ticket: ticketNumber,
        id_cliente: userData.user_id,
        dia: `${Dia.año}-${Dia.mes}-${Dia.dia}`,
        qr_code: ticketNumber,
        id_molinete: userData.id_molinete || 1,
        precio: 0,
        id_caja: userData.caja,
        user_id: userData.user_id,
      };

      const response = await fetch('https://xn--urkupia-9za.store/tickets/ticketcortesia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        console.error('Error al enviar el ticket');
      }
    } catch (error) {
      console.error('Error al enviar el ticket:', error);
    }
  };

  const handleOk = () => setIsModalVisible(false);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <div style={{ width: '80%', textAlign: 'center', padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        style={{ marginTop: '10px' }}
        type="primary"
        size="large"
        shape="default"
        icon={<PrinterOutlined />}
        onClick={generatePDF}
      >
        Imprimir 20 Tickets
      </Button>

      <Modal title="Ticket enviado" open={isModalVisible} onOk={handleOk} onCancel={handleCloseModal}>
        <Spin spinning={isLoading} size="large" tip="Enviando...">
          <p style={{ fontSize: "18px" }}>¡Ticket enviado exitosamente!</p>
        </Spin>
      </Modal>
    </div>
  );
};
