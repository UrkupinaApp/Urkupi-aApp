import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Ajustes = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener la información del usuario desde localStorage
  const storedUserData = localStorage.getItem('AppUserData');
  let userId = null;

  if (storedUserData) {
    try {
      const parsedUserData = JSON.parse(storedUserData);
      console.log('Datos del usuario desde localStorage:', parsedUserData); // Verificar los datos
      userId = parsedUserData.user_id; // Extraemos el user_id
    } catch (error) {
      console.error('Error al parsear los datos del usuario desde localStorage:', error);
      message.error('Hubo un error al obtener la información del usuario.');
    }
  } else {
    message.error('No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      message.error('Las contraseñas no coinciden');
      return;
    }

    if (!userId) {
      message.error('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://xn--urkupia-9za.store/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message || 'Contraseña cambiada con éxito');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        message.error(data.message || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      message.error('Hubo un error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <SettingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        </div>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
          Configuración de la cuenta
        </Title>
        <Form layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            label="Contraseña actual"
            name="currentPassword"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña actual' }]}
          >
            <Input.Password
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Nueva contraseña"
            name="newPassword"
            rules={[{ required: true, message: 'Por favor ingresa tu nueva contraseña' }]}
          >
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirmar nueva contraseña"
            name="confirmNewPassword"
            rules={[{ required: true, message: 'Por favor confirma tu nueva contraseña' }]}
          >
            <Input.Password
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Cambiar contraseña
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Ajustes;
