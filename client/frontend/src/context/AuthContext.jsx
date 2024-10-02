
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';

export const miContext = createContext();
const AppAuth = "AppAuth";
const AppUserData = "AppUserData";
const AppCounter = "AppCounter"; // Nuevo identificador para el contador

export function AuthContext({ children }) {
  const [Authenticated, setAuthenticated] = useState(window.localStorage.getItem(AppAuth) ?? false);
  const [user, SetUser] = useState(null);
  const [counter, setCounter] = useState(Number(window.localStorage.getItem(AppCounter)) || 0); // Nuevo estado para el contador
  const saludo = "hola desde context";

  const Login = useCallback(function (values) {
    localStorage.setItem(AppAuth, true);
    console.log(values)
    localStorage.setItem(AppUserData, JSON.stringify(values));
    setAuthenticated(true);
  }, []);

  const Logout = useCallback(function () {
    localStorage.removeItem(AppAuth);
    setAuthenticated(false);
  }, []);

  // Efecto para resetear el contador diariamente
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const storedDate = window.localStorage.getItem('AppCounterDate');
    if (!storedDate || currentDate !== storedDate) {
      localStorage.setItem(AppCounter, '0');
      localStorage.setItem('AppCounterDate', currentDate);
      setCounter(0);
    }
  }, []);

  // Función para incrementar el contador
  const incrementCounter = useCallback(() => {
    setCounter((prevCounter) => {
      const newCounter = prevCounter + 1;
      localStorage.setItem(AppCounter, newCounter.toString());
      return newCounter;
    });
  }, []);

  const Value = useMemo(() => ({
    Login,
    Logout,
    Authenticated,
    saludo,
    user, // Puedes agregar el usuario al contexto si lo necesitas en otros componentes
    counter,
    incrementCounter,
  }), [Login, Logout, Authenticated, saludo, user, counter, incrementCounter]);

  return <miContext.Provider value={Value}>{children}</miContext.Provider>;
}

// Custom Hook para consumir el contexto
export function useAuthContext() {
  return useContext(miContext);
}
