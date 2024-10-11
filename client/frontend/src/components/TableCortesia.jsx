import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as XLSX from 'xlsx';

const TicketsCortesiaTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://xn--urkupia-9za.store/tickets/getticketscortesia');
        console.log('Datos recibidos:', response.data);

        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
          setCurrentPage(Math.ceil(response.data.data.length / 5)); // Configura la página para que sea la última
        } else {
          throw new Error('Estructura de datos no válida');
        }
      } catch (error) {
        console.error('Error al obtener los tickets de cortesia:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TicketsCortesia');
    XLSX.writeFile(workbook, 'tickets_cortesia.xlsx');
  };

  const onChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const columns = [
    { title: 'Nº Ticket', dataIndex: 'N_ticket', key: 'N_ticket', ...getColumnSearchProps('N_ticket') },
    { title: 'Día', dataIndex: 'dia', key: 'dia', ...getColumnSearchProps('dia') },
    { title: 'Hora', dataIndex: 'hora', key: 'hora', ...getColumnSearchProps('hora') },
    { title: 'QR Code', dataIndex: 'qr_code', key: 'qr_code', ...getColumnSearchProps('qr_code') },
    { title: 'Caja', dataIndex: 'caja', key: 'caja', ...getColumnSearchProps('caja') },
    { title: 'Precio', dataIndex: 'precio', key: 'precio', ...getColumnSearchProps('precio') },
  ];

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Button onClick={exportToExcel} style={{ marginBottom: '10px' }}>
        Exportar a Excel
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        onChange={onChange}
        pagination={{
          pageSize: 5,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="N_ticket"
      />
    </div>
  );
};

export default TicketsCortesiaTable;
