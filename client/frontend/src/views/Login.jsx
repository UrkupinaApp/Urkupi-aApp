/* 
import React, { useState } from 'react';
import urkupinaLogo from '../assets/logo_64.png';
import { Form, Input, Button, Modal, Spin, Select } from 'antd';
import { Container } from "../components/Container";
import { useAuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const { Option } = Select;

export function Login() {
  const { Login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    console.log(values)
    try {
      const response = await fetch('http://103.195.100.76:3002/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsModalVisible(true);
        setIsLoading(false);
        setTimeout(() => {
          Login(values);
        }, 3000);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Container>
        <img style={{ width: "120px", height: "60px", marginBottom: "22px" }} src={urkupinaLogo} alt="urkupinalogo.png" />
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Tipo de Caja"
            name="caja"
            rules={[{ required: true, message: 'Por favor selecciona el tipo de caja' }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tipo de Baño"
            name="tipoBaño"
            rules={[{ required: true, message: 'Por favor selecciona el tipo de baño' }]}
          >
            <Select>
              <Option value="Baño Mujer">Baño Mujer</Option>
              <Option value="Baño Hombre">Baño Hombre</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
        <p>No Tienes una Cuenta?</p>
        <Link to="/register">Regístrate!</Link>
        <Modal
          title="Login exitoso"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCloseModal}
        >
          <Spin spinning={isLoading} size="large" tip="Cargando...">
            <p style={{ fontSize: "18px" }}>👍 ¡Bienvenido!</p>
          </Spin>
        </Modal>
        {loginError && (
          <p style={{ color: 'red' }}>Usuario o contraseña inválidos</p>
        )}
      </Container>
    </div>
  );
}
 */

import React, { useState } from 'react';
import urkupinaLogo from '../assets/logo_64.png';
import { Form, Input, Button, Modal, Spin, Select } from 'antd';
import { Container } from "../components/Container";
import { useAuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const { Option } = Select;

export function Login() {
  const { Login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    console.log(values)
    try {
      const response = await fetch('https://xn--urkupia-9za.store/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsModalVisible(true);
        setIsLoading(false);
        setTimeout(() => {
          Login(values);
        }, 3000);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Container>
        <img style={{ width: "120px", height: "60px", marginBottom: "22px" }} src={urkupinaLogo} alt="urkupinalogo.png" />
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Tipo de Caja"
            name="caja"
            rules={[{ required: true, message: 'Por favor selecciona el tipo de caja' }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
        <p>No Tienes una Cuenta?</p>
        <Link to="/register">Regístrate!</Link>
        <Modal
          title="Login exitoso"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCloseModal}
        >
          <Spin spinning={isLoading} size="large" tip="Cargando...">
            <p style={{ fontSize: "18px" }}>👍 ¡Bienvenido!</p>
          </Spin>
        </Modal>
        {loginError && (
          <p style={{ color: 'red' }}>Usuario o contraseña inválidos</p>
        )}
      </Container>
    </div>
  );
}
