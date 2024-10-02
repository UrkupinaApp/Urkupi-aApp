import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const TicketsCortesiaTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Obtener los datos de tickets de cortesia al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la petición GET a /getticketscortesia
        const response = await axios.get('https://xn--urkupia-9za.store/tickets/getticketscortesia');
        console.log('Datos recibidos:', response.data); // Verificar los datos recibidos

        // Accede a response.data.data ya que los datos están anidados
        if (Array.isArray(response.data.data)) {
          setData(response.data.data); // Almacena los datos en el estado
        } else {
          throw new Error('Estructura de datos no válida'); // Arrojar error si no es un array
        }
      } catch (error) {
        console.error('Error al obtener los tickets de cortesia:', error);
        setError('Error al cargar los datos'); // Establecer el mensaje de error
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchData();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 288, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
    render: (text) => (searchedColumn === dataIndex ? <span>{text}</span> : text),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const onChange = (pagination, filters, sorter) => {
    console.log('Filtrado, clasificación:', filters, sorter);
  };

  // Definición de las columnas de la tabla
  const columns = [
    { title: 'Nº Ticket', dataIndex: 'N_ticket', key: 'N_ticket', ...getColumnSearchProps('N_ticket') },
    { title: 'Día', dataIndex: 'dia', key: 'dia', ...getColumnSearchProps('dia') },
    { title: 'Hora', dataIndex: 'hora', key: 'hora', ...getColumnSearchProps('hora') },
    { title: 'QR Code', dataIndex: 'qr_code', key: 'qr_code', ...getColumnSearchProps('qr_code') },
    { title: 'Caja', dataIndex: 'caja', key: 'caja', ...getColumnSearchProps('caja') },
    { title: 'Precio', dataIndex: 'precio', key: 'precio', ...getColumnSearchProps('precio') },
  ];

  if (loading) {
    return <p>Cargando datos...</p>; // Mostrar mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Mostrar mensaje de error
  }

  return (
    <Table
      dataSource={data}
      columns={columns}
      onChange={onChange}
      pagination={{ pageSize: 5 }}
      rowKey="N_ticket" // Asegura que cada fila tenga una key única
    />
  );
};

export default TicketsCortesiaTable;
