
import React, { useState, useEffect } from 'react';
import { Statistic, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { TagOutlined } from '@ant-design/icons';


const TicketCounter = () => {
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        // Hacer la solicitud para obtener datos de la tabla de tickets
        const response = await axios.get('https://xn--urkupia-9za.store/tickets/getTickets'); // Ajusta la ruta según tu configuración
        const tickets = response.data;
        console.log(tickets)

        // Contar los tickets para el día actual
        const today = moment().format('YYYY-MM-DD');
        const todayTickets = tickets.filter(ticket => moment(ticket.dia, 'DD/MM/YYYY').format('YYYY-MM-DD') === today);
        console.log(todayTickets)
        const count = todayTickets.length;

        // Actualizar el estado con el resultado del conteo
        setTicketCount(count);
      } catch (error) {
        console.error('Error al obtener datos de los tickets', error);
      }
    };

    // Llamar a la función para obtener datos cuando se monta el componente
    fetchTicketData();
  }, []); // La dependencia vacía asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div style={{background:"white",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <h3 style={{fontSize:"18px",margin:"10px"}}>Tickets Generados Hoy</h3>
        <div style={{display:"flex",margin:"20px",padding:"20px 20px 20px",fontSize:"24px"}}>

            <TagOutlined style={{marginRigth:"12px"}}/>
            <Statistic value={ticketCount} />

        </div>
      {/* Otros componentes, como DatePicker, según tus necesidades */}
    </div>
  );
};

export default TicketCounter;
