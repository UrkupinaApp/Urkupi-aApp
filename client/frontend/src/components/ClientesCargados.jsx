import { Statistic, Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const ClientesCargadosComponent = () => {
  const [clientesCargados, setClientesCargados] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://xn--urkupia-9za.store/clientes/cargados');
        // Suponiendo que el servidor devuelve un objeto con una propiedad 'clientesCargados'
        //console.log(response)

        let data = response.data.clietnes[0].cantidad
        //let [clietnes] =data
        //console.log(clietnes)
        console.log(data)
        setClientesCargados(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Col xs={24} sm={24} md={24} style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: "90%",marginTop:"50px",  backdropFilter: "blur(10px)", border: "none" }}>
        <h2 style={{textAlign:"center"}}>Clientes Cargados</h2>
        <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <h4 style={{marginRight:"30px"}}><UserOutlined style={{ fontSize: '34px', color: '#08c' }} /></h4>
        <Statistic style={{fontSize:"44px"}} value={clientesCargados} />


        </div>
      </Card>
    </Col>
  );
};

export default ClientesCargadosComponent;
