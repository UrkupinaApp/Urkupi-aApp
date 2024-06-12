/* import {useState} from 'react'
import { Form, Input, Button, Select,Modal } from 'antd';

import { Link,useNavigate} from 'react-router-dom'; // Asegúrate de importar correctamente el componente Link de tu enrutador
import urkupinaLogo from '../assets/logo_64.png'
const { Option } = Select;



import { Container } from '../components/Container'


export const Register = () => {

const [isModalVisible, setIsModalVisible] = useState(false);
const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Register form values:', values);
    abrirModal()
    // Aquí podrías enviar los datos a tu backend para registrar al usuario
  };  

  
  const abrirModal =()=>{
      
    setIsModalVisible(true);
  
}
const handleOk = () => {
  setIsModalVisible(false);
  console.log("se ejecuta");

  navigate('/login')

};

const handleCancel = () => {
  setIsModalVisible(false);
};

  return (
    <div>
       <Container>
       <img style={{widht:"120px",height:"60px",marginBottom:"22px"}} src={urkupinaLogo} alt="urkupinalogo.png"/>
       <Form
      name="registerForm"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Nombre de usuario"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa un nombre de usuario',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu contraseña',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Rol"
        rules={[
          {
            required: true,
            message: 'Por favor selecciona un rol',
          },
        ]}
      >
        <Select placeholder="Selecciona un rol">
          <Option value="admin">Admin</Option>
          <Option value="empleado">Empleado</Option>
          <Option value="cajero">Cajero</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form.Item>

      <Form.Item>
      <div style={{display:"flex"}}>
        <p style={{marginRight:"10px",fontSize:"16px"}}>¿Ya tienes Cuenta?</p>
        <Link to="/login" style={{fontSize:"17px",textDecoration:"none",color:"blue"}}>¡Has Login!</Link>


        </div>
      </Form.Item>
    </Form>
    <Modal
        title="Registro Exitoso!"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p style={{fontSize:"18px"}}>👏 ¡Usuario Registrado con exito!</p>
      </Modal>

       </Container>
    </div>
  )
}
 */

import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import urkupinaLogo from '../assets/logo_64.png';
import { Container } from '../components/Container';

const { Option } = Select;

export const Register = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values)
    try {
      const response = await fetch('http://192.168.0.40:3002/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        abrirModal();
      } else {
        console.error('Algo salió mal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const abrirModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Container>
      <img style={{ widht: "120px", height: "60px", marginBottom: "22px" }} src={urkupinaLogo} alt="urkupinalogo.png" />
    
        <Form name="registerForm" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="username"
            label="Nombre de usuario"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa un nombre de usuario',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu contraseña',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="rol"
            label="Rol"
            rules={[
              {
                required: true,
                message: 'Por favor selecciona un rol',
              },
            ]}
          >
            <Select placeholder="Selecciona un rol">
              <Option value="admin">Admin</Option>
              <Option value="empleado">Empleado</Option>
              <Option value="cajero">Cajero</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrarse
            </Button>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex' }}>
              <p style={{ marginRight: '10px', fontSize: '16px' }}>¿Ya tienes Cuenta?</p>
              <Link to="/login" style={{ fontSize: '17px', textDecoration: 'none', color: 'blue' }}>
                ¡Has Login!
              </Link>
            </div>
          </Form.Item>

          <Modal
            title="Registro Exitoso!"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p style={{ fontSize: '18px' }}>👏 ¡Usuario Registrado con éxito!</p>
          </Modal>
        </Form>
      </Container>
    </div>
  );
};

