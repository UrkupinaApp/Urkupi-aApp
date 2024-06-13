
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ClientesTable = () => {
  const [clientes, setClientes] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://103.195.100.76:3002/clientes/clientes');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de clientes');
        }

        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (record) => {
    setEditingRecord(record);
    setEditModalVisible(true);
    form.setFieldsValue({
      fullname: record.fullname,
      telefono: record.telefono,
      mail: record.mail,
      fila: record.fila,
      puesto: record.puesto,
      metros: record.metros,
      creditos: record.creditos,
      dni: record.dni,
      numero_tarjeta: record.numero_tarjeta,
    });
  };

  const handleDelete = (record) => {
    setDeleteRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!deleteRecord || !deleteRecord.id) {
        throw new Error('Registro de eliminación no válido');
      }

      await fetch(`http://localhost:3002/clientes/deleteUser?fullname=${encodeURIComponent(deleteRecord.fullname)}&dni=${encodeURIComponent(deleteRecord.dni)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== deleteRecord.id));
    } catch (error) {
      console.error('Error al eliminar el cliente', error);
    } finally {
      setDeleteModalVisible(false);
      setDeleteRecord(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeleteRecord(null);
  };

  const handleEditSave = async () => {
    try {
      if (!editingRecord || !editingRecord.id) {
        throw new Error('Registro de edición no válido');
      }

      const updatedRecord = form.getFieldsValue();
      if (
        updatedRecord.creditos !== editingRecord.creditos ||
        updatedRecord.dni !== editingRecord.dni
      ) {
        throw new Error('No se permiten cambios en los campos de créditos y DNI');
      }

      await fetch('http://localhost:3002/clientes/updateCliente', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingRecord.id,
          ...updatedRecord,
        }),
      });

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === editingRecord.id ? { ...cliente, ...updatedRecord } : cliente
        )
      );
    } catch (error) {
      console.error('Error al editar el cliente', error);
    } finally {
      setEditingRecord(null);
      setEditModalVisible(false);
      form.resetFields();
    }
  };

  const handleEditCancel = () => {
    setEditingRecord(null);
    setEditModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre Completo', dataIndex: 'fullname', key: 'fullname' },
    { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
    { title: 'Correo Electrónico', dataIndex: 'mail', key: 'mail' },
    { title: 'Fila', dataIndex: 'fila', key: 'fila' },
    { title: 'Puesto', dataIndex: 'puesto', key: 'puesto' },
    { title: 'Metros', dataIndex: 'metros', key: 'metros' },
    { title: 'Créditos', dataIndex: 'creditos', key: 'creditos' },
    { title: 'DNI', dataIndex: 'dni', key: 'dni' },
    { title: 'Número de Tarjeta', dataIndex: 'numero_tarjeta', key: 'numero_tarjeta' },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={!record.id}
          >
            Borrar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Clientes Almacenados en Base de datos:</h2>
      <Table dataSource={clientes} columns={columns} pagination={{ pageSize: 3 }} />

      <Modal
        title="Editar Cliente"
        visible={editModalVisible}
        onOk={handleEditSave}
        onCancel={handleEditCancel}
      >
        <Form form={form}>
          <Form.Item label="Nombre Completo" name="fullname">
            <Input />
          </Form.Item>
          <Form.Item label="Teléfono" name="telefono">
            <Input />
          </Form.Item>
          <Form.Item label="Correo Electrónico" name="mail">
            <Input />
          </Form.Item>
          <Form.Item label="Fila" name="fila">
            <Input />
          </Form.Item>
          <Form.Item label="Puesto" name="puesto">
            <Input />
          </Form.Item>
          <Form.Item label="Metros" name="metros">
            <Input />
          </Form.Item>
          <Form.Item label="Créditos" name="creditos">
            <Input disabled />
          </Form.Item>
          <Form.Item label="DNI" name="dni">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Número de Tarjeta" name="numero_tarjeta">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirmar Eliminación"
        visible={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>¿Está seguro de que desea eliminar este cliente?</p>
        <p>Nombre: {deleteRecord?.fullname}</p>
        <p>DNI: {deleteRecord?.dni}</p>
      </Modal>
    </div>
  );
};

export default ClientesTable;
