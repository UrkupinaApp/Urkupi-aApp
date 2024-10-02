// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { Authenticated, user } = useAuthContext();

  if (!Authenticated) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    // Si está autenticado pero no tiene el rol adecuado, redirigir a "No Acceso"
    return <Navigate to="/no-access" replace />;
  }

  // Si está autenticado y tiene el rol adecuado, renderizar los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;
