

import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';


const ClienteForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch('https://xn--urkupia-9za.store/clientes/insertCliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error al insertar cliente');
      }

      message.success('Cliente insertado exitosamente');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Error al insertar cliente');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
 
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: '1400px',borderRadius:'50px'}}
      >
        <Row gutter={[26, 26]}>
          <Col span={16}>
            <div>
                
            </div>
            <Form.Item label="Nombre Completo" name="fullname" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Form.Item label="Correo Electrónico" name="mail" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Fila" name="fila" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Form.Item label="Puesto" name="puesto" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Metros" name="metros" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item label="Créditos" name="creditos" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item label="DNI" name="dni" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form.Item label="Número de Tarjeta" name="numero_tarjeta" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Insertar Cliente
          </Button>
        </Form.Item>
      </Form>
   
  );
};

export default ClienteForm;

