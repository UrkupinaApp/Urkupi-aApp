import { createContext, useState, useContext } from "react";

// Crear el contexto para el valor del ticket
export const ValueTicketContext = createContext();

// Proveedor del contexto para manejar el valor del ticket
export const ValueTicketProvider = ({ children }) => {
  const [ticketValue, setTicketValue] = useState(300); // Valor por defecto de 300

  // Función para actualizar el valor del ticket
  const updateTicketValue = (value) => {
    setTicketValue(value);
  };

  return (
    <ValueTicketContext.Provider value={{ ticketValue, updateTicketValue }}>
      {children}
    </ValueTicketContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useValueTicketContext = () => useContext(ValueTicketContext);
