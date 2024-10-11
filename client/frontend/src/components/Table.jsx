/* 
import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Search } = Input;

const SetTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef(null);
  
  
  const [data, setData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://103.195.100.76:3002/tickets/getTickets');
        setData(response.data);
        updateTicketData(response.data)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
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

  const columns = [
    { title: 'Nº Ticket', dataIndex: 'N_ticket', key: 'N_ticket', ...getColumnSearchProps('N_ticket') },
    { title: 'Día', dataIndex: 'dia', key: 'dia', ...getColumnSearchProps('dia') },
    { title: 'Hora', dataIndex: 'hora', key: 'hora', ...getColumnSearchProps('hora') },
    { title: 'QR Code', dataIndex: 'qr_code', key: 'qr_code', ...getColumnSearchProps('qr_code') },
    { title: 'Baño', dataIndex: 'baño', key: 'baño', ...getColumnSearchProps('baño') },
    { title: 'Caja', dataIndex: 'caja', key: 'caja', ...getColumnSearchProps('caja') },
    { title: 'Precio', dataIndex: 'precio', key: 'precio', ...getColumnSearchProps('precio') },
  ];

  return <Table dataSource={data} columns={columns} onChange={onChange} pagination={{ pageSize: 5 }} />;
};

export default SetTable;

 */
import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as XLSX from 'xlsx';

const SetTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://xn--urkupia-9za.store/tickets/getTickets');
        setData(response.data);
        setCurrentPage(Math.ceil(response.data.length / 5)); // Configura la página para que sea la última
      } catch (error) {
        console.error('Error al obtener los datos:', error);
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
    XLSX.writeFile(workbook, 'tickets.xlsx');
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
      />
    </div>
  );
};

export default SetTable;
