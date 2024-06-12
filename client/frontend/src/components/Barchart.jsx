import { Bar } from '@ant-design/charts';

const Barchart = () => {
    const data = [
        {
          id: 1,
          n_ticket: 71,
          id_cliente: 28,
          dia: "8/25/2023",
          qr: 67,
          id_molinete: 84,
          precio: 93,
          id_caja: 4,
          user_id: 1
        },{
          "id": 4,
          "nº_ticket": 25,
          "id_cliente": 21,
          "dia": "10/16/2023",
          "qr": 44,
          "id_molinete": 70,
          "precio": 15,
          "id_caja": 69,
          "user_id": 4
        },
        {
          "id": 5,
          "nº_ticket": 10,
          "id_cliente": 73,
          "dia": "5/16/2023",
          "qr": 58,
          "id_molinete": 33,
          "precio": 21,
          "id_caja": 45,
          "user_id": 5
        },
        {
          "id": 6,
          "nº_ticket": 37,
          "id_cliente": 87,
          "dia": "1/13/2023",
          "qr": 50,
          "id_molinete": 88,
          "precio": 23,
          "id_caja": 97,
          "user_id": 6
        },
        
  {
    "id": 2,
    "nº_ticket": 61,
    "id_cliente": 46,
    "dia": "2/20/2023",
    "qr": 80,
    "id_molinete": 62,
    "precio": 77,
    "id_caja": 79,
    "user_id": 2
  },
  {
    "id": 3,
    "nº_ticket": 30,
    "id_cliente": 83,
    "dia": "4/27/2023",
    "qr": 77,
    "id_molinete": 25,
    "precio": 24,
    "id_caja": 5,
    "user_id": 3
  },
        // ... otros datos
      ];
    
      // Convertir la fecha al día de la semana
      const getDayOfWeek = (dateStr) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateStr);
        const dayIndex = date.getDay();
        return days[dayIndex];
      };
    
      // Contar la cantidad de tickets por día de la semana
      const ticketsPorDia = data.reduce((acc, item) => {
        const dayOfWeek = getDayOfWeek(item.dia);
        acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
        return acc;
      }, {});
    
      // Formatear los datos para el gráfico de barras
      const chartData = Object.keys(ticketsPorDia).map((day) => ({
        dayOfWeek: day,
        ticketsGenerados: ticketsPorDia[day],
      }));
    
      // Configuración del gráfico de barras
      const config = {
        data: chartData,
        xField: 'dayOfWeek',
        yField: 'ticketsGenerados',
        height: 200,
        label: {
          position: 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
      };
    
      return <Bar {...config} />;
};

export default Barchart;

/* import { Bar } from '@ant-design/charts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Barchart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/tickets/getTickets');
        setData(response.data);
        console.log(response.
          
          
          data)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const getDayOfWeek = (dateStr) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const [month, day, year] = dateStr.split('/');
    const formattedDate = `${month}/${day}/${year}`;
    const date = new Date(formattedDate);
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  const ticketsPorDia = data.reduce((acc, item) => {
    const dayOfWeek = getDayOfWeek(item.dia);
    acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(ticketsPorDia).map((day) => ({
    dayOfWeek: day,
    ticketsGenerados: ticketsPorDia[day],
  }));

  const config = {
    data: chartData,
    xField: 'dayOfWeek',
    yField: 'ticketsGenerados',
    height: 200,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  return <Bar {...config} />;
};

export default Barchart; */
