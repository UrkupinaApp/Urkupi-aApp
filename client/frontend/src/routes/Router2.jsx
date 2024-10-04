import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import { PublicRouter } from "./PublicRouter";
import { Home } from "../views/Home";
import { PrivateRouter } from "./PrivateRouter";
import { Dashboard } from "../components/Dashboard";
import { Tickets } from "../components/Tickets";
import { Clientes } from "../components/Clientes";
import { Settings } from "../components/Settings";
import { RoleRouter } from "./RoleRouter"; // Importa el RoleRouter

export const Router2 = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<PublicRouter />}>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rutas privadas con roles */}
      <Route path="/private" element={<PrivateRouter />}>
        {/* Rutas solo para usuarios "admin" */}
        <Route element={<RoleRouter allowedRoles={['admin']} />}>
          <Route path="/private/dashboard" element={<Dashboard />} />
          <Route path="/private/settings" element={<Settings />} />
        </Route>

        {/* Rutas solo para usuarios "empleado" o "cajero" */}
        <Route element={<RoleRouter allowedRoles={['empleado', 'cajero']} />}>
          <Route path="/private/tickets" element={<Tickets />} />
        </Route>

        {/* Rutas solo para usuarios "admin" o "empleado" */}
        <Route element={<RoleRouter allowedRoles={['admin', 'empleado']} />}>
          <Route path="/private/clientes" element={<Clientes />} />
        </Route>
      </Route>
    </Routes>
  );
};
