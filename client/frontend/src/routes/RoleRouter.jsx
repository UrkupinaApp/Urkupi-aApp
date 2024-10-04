import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export const RoleRouter = ({ allowedRoles }) => {
  const [redirectPath, setRedirectPath] = useState(null);

  // Obtener los datos del usuario desde localStorage
  const storedUser = JSON.parse(localStorage.getItem('AppUserData'));

  // Obtener el rol del usuario
  const userRole = storedUser?.data?.userData?.rol;

  useEffect(() => {
    // Redirigir solo si el rol del usuario es empleado o cajero y aún no se ha establecido la redirección
    if ((userRole === 'empleado' || userRole === 'cajero') && !redirectPath) {
      setRedirectPath('/private/tickets');
    }
  }, [userRole, redirectPath]); // Se ejecuta cuando el rol o la redirección cambian

  // Si el rol está permitido y el usuario es empleado o cajero, redirigir a /private/tickets
  if (allowedRoles.includes(userRole)) {
    // Redirigir a /private/tickets para roles empleados o cajeros
    if (redirectPath && (userRole === 'empleado' || userRole === 'cajero')) {
      return <Navigate to={redirectPath} />;
    }
    // Si no hay redirección o el rol es admin, continuar con las rutas permitidas
    return <Outlet />;
  }

  // Si el rol no está permitido, redirigir al login
  return <Navigate to="/home" />;
};
