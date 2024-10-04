import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  
  // Obtener los datos iniciales de los tickets
  const getInitialData = async () => {
    const response = await axios.get('https://xn--urkupia-9za.store/tickets/getTickets');
    console.log(response.data);
    return response.data;
  };

  const data = getInitialData();

  // Estado para los datos de los tickets normales
  const [ticketData, setTicketData] = useState(data);

  // Estado para el contador de tickets de cortesía
  const [cortesiaCounter, setCortesiaCounter] = useState(Number(localStorage.getItem('CortesiaCounter')) || 0);

  // Estado para el valor del ticket
  const [ticketValue, setTicketValue] = useState(300);  // Valor por defecto de 300

  // Actualizar los datos de los tickets normales
  const updateTicketData = (data) => {
    setTicketData(data);
  };

  // Incrementar el contador de tickets de cortesía
  const incrementCortesiaCounter = () => {
    setCortesiaCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      localStorage.setItem('CortesiaCounter', newCounter.toString());
      return newCounter;
    });
  };

  // Restablecer o modificar el contador de cortesía
  const resetCortesiaCounter = (value = 0) => {
    setCortesiaCounter(value);
    localStorage.setItem('CortesiaCounter', value.toString());
  };

  // Función para actualizar el valor del ticket
  const updateTicketValue = (value) => {
    setTicketValue(value);
  };

  return (
    <TicketContext.Provider value={{
      ticketData,
      updateTicketData,
      getInitialData,
      cortesiaCounter,
      incrementCortesiaCounter,
      resetCortesiaCounter,
      ticketValue,  // Proveer el valor del ticket
      updateTicketValue,  // Proveer la función para actualizar el valor del ticket
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
