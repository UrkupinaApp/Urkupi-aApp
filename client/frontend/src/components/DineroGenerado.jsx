import React, { useState, useEffect } from 'react';
import { Col, Card } from 'antd';
import axios from 'axios';
import { DollarCircleOutlined } from '@ant-design/icons';
const url = "https://xn--urkupia-9za.store"
const DineroGeneradoComponent = () => {
  const [totalMoneyGenerated, setTotalMoneyGenerated] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/tickets/calculoDinero`);

        setTotalMoneyGenerated(response.data.totalMoneyGenerated);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Col xs={24} sm={24} md={24} style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: "90%",padding:"10px", backdropFilter: "blur(10px)", border: "none" }}>
        <h2 style={{fontSize:"25px",marginTop:"20px"}}>Dinero Generado</h2>
        <p style={{fontSize:"20px"}}>  <DollarCircleOutlined style={{ fontSize: '24px', color: '#08c' }} />Total Dinero:  {totalMoneyGenerated}</p>
      </Card>
    </Col>
  );
};

export default DineroGeneradoComponent;
