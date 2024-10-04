import React, { useState } from 'react';
import { useValueTicketContext } from '../context/ValueTicketContext';
import { Button, Input, Modal } from 'antd';

export const TicketValue = () => {
  const { ticketValue, updateTicketValue } = useValueTicketContext(); // Usamos el nuevo contexto
  const [inputValue, setInputValue] = useState(ticketValue);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value) && value > 0) {
      updateTicketValue(value);
      setIsError(false);
      setIsModalVisible(true);
    } else {
      setIsError(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Update Ticket Value</h3>
      <Input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        style={{ marginBottom: '10px', width: '200px' }}
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <Modal
        title={isError ? "Error" : "Success"}
        visible={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <p>{isError ? "Please enter a valid ticket value." : "Ticket value updated successfully!"}</p>
      </Modal>
    </div>
  );
};
