import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { DatePicker, Tabs } from 'antd';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const TicketsAnalytics = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('https://xn--urkupia-9za.store/tickets/getTickets');
        setTickets(response.data);
        setFilteredTickets(response.data); // Inicializa con todos los tickets
      } catch (err) {
        console.error('Error al obtener los tickets:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filterTicketsByDate = (range) => {
    if (!range || range.length !== 2) {
      setFilteredTickets(tickets);
      return;
    }

    const [start, end] = range;
    const filtered = tickets.filter((ticket) => {
      const ticketDate = moment(ticket.date_descarga);
      return ticketDate.isBetween(start, end, 'day', '[]');
    });

    setFilteredTickets(filtered);
  };

  const getTicketsByHour = () => {
    const hours = Array(24).fill(0);
    filteredTickets.forEach((ticket) => {
      const hour = moment(ticket.hora_descarga, 'HH:mm:ss').hour();
      hours[hour]++;
    });
    return hours;
  };

  const renderChart = (hours) => {
    return (
      <Bar
        data={{
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          datasets: [
            {
              label: 'Tickets por Hora',
              data: hours,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            x: { type: 'category', beginAtZero: true },
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
          },
        }}
      />
    );
  };

  const groupTicketsBy = (type) => {
    const grouped = {};
    filteredTickets.forEach((ticket) => {
      const key = moment(ticket.date_descarga).startOf(type).format('YYYY-MM-DD');
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });
    return grouped;
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Analítica de Tickets Descargados</h2>
      <RangePicker onChange={(dates) => filterTicketsByDate(dates)} style={{ marginBottom: '20px' }} />

      <Tabs defaultActiveKey="1">
        <TabPane tab="Por Mes" key="1">
          {Object.entries(groupTicketsBy('month')).map(([month, tickets]) => (
            <div key={month}>
              <h3>Mes: {month}</h3>
              <p>Total Tickets: {tickets.length}</p>
            </div>
          ))}
        </TabPane>

        <TabPane tab="Por Semana" key="2">
          {Object.entries(groupTicketsBy('week')).map(([week, tickets]) => (
            <div key={week}>
              <h3>Semana: {week}</h3>
              <p>Total Tickets: {tickets.length}</p>
            </div>
          ))}
        </TabPane>

        <TabPane tab="Por Día" key="3">
          {Object.entries(groupTicketsBy('day')).map(([day, tickets]) => (
            <div key={day}>
              <h3>Día: {day}</h3>
              <p>Total Tickets: {tickets.length}</p>
            </div>
          ))}
          <h3>Uso de Tickets por Hora</h3>
          {renderChart(getTicketsByHour())}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TicketsAnalytics;
