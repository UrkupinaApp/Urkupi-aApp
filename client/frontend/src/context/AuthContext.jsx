import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';

export const miContext = createContext();
const AppAuth = "AppAuth";
const AppUserData = "AppUserData";
const AppCounter = "AppCounter"; // Identificador para el contador normal
const AppCortesiaCounter = "AppCortesiaCounter"; // Identificador para el contador de cortesía

export function AuthContext({ children }) {
  const [Authenticated, setAuthenticated] = useState(window.localStorage.getItem(AppAuth) ?? false);
  const [user, SetUser] = useState(null);
  
  // Contador normal
  const [counter, setCounter] = useState(Number(window.localStorage.getItem(AppCounter)) || 0);
  
  // Contador de cortesía
  const [cortesiaCounter, setCortesiaCounter] = useState(Number(window.localStorage.getItem(AppCortesiaCounter)) || 0);
  
  const saludo = "hola desde context";

  const Login = useCallback(function (values) {
    localStorage.setItem(AppAuth, true);
    console.log(values);
    localStorage.setItem(AppUserData, JSON.stringify(values));
    setAuthenticated(true);
  }, []);

  const Logout = useCallback(function () {
    localStorage.removeItem(AppAuth);
    setAuthenticated(false);
  }, []);

  // Efecto para resetear los contadores diariamente
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const storedDate = window.localStorage.getItem('AppCounterDate');
    
    // Resetea el contador normal si es un nuevo día
    if (!storedDate || currentDate !== storedDate) {
      localStorage.setItem(AppCounter, '0');
      localStorage.setItem('AppCounterDate', currentDate);
      setCounter(0);
    }
    
    // Resetea el contador de cortesía si es un nuevo día
    const storedCortesiaDate = window.localStorage.getItem('AppCortesiaCounterDate');
    if (!storedCortesiaDate || currentDate !== storedCortesiaDate) {
      localStorage.setItem(AppCortesiaCounter, '0');
      localStorage.setItem('AppCortesiaCounterDate', currentDate);
      setCortesiaCounter(0);
    }
  }, []);

  // Función para incrementar el contador normal
  const incrementCounter = useCallback(() => {
    setCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      localStorage.setItem(AppCounter, newCounter.toString());
      return newCounter;
    });
  }, []);

  // Función para incrementar el contador de cortesía
  const incrementCortesiaCounter = useCallback(() => {
    setCortesiaCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      localStorage.setItem(AppCortesiaCounter, newCounter.toString());
      return newCounter;
    });
  }, []);

  // Valor del contexto
  const Value = useMemo(() => ({
    Login,
    Logout,
    Authenticated,
    saludo,
    user, // Puedes agregar el usuario al contexto si lo necesitas en otros componentes
    counter, // Contador normal
    incrementCounter,
    cortesiaCounter, // Contador de cortesía
    incrementCortesiaCounter,
  }), [Login, Logout, Authenticated, saludo, user, counter, incrementCounter, cortesiaCounter, incrementCortesiaCounter]);

  return <miContext.Provider value={Value}>{children}</miContext.Provider>;
}

// Custom Hook para consumir el contexto
export function useAuthContext() {
  return useContext(miContext);
}
