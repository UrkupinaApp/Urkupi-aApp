import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../views/Login";
import { Register } from "../views/Register";
import { PublicRouter } from "./PublicRouter";
import { Home } from "../views/Home";
import { PrivateRouter } from "./PrivateRouter";
import { Private } from "../views/Private";
import { Dashboard } from "../components/Dashboard";
import { Tickets } from "../components/Tickets";
import { Clientes } from "../components/Clientes";
import { Settings } from "../components/Settings";
import { Analithycs } from "../components/Analithycs";
import { Pool } from "../components/Pool"; // Importa el componente Pool

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRouter />}>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/private" element={<PrivateRouter />}>
        {/* <Route index path="/private" element={<Private/>}/> */}
        <Route path="/private/pool" element={<Pool />} /> {/* Nueva ruta */}
        <Route path="/private/dashboard" element={<Dashboard />} />
        <Route path="/private/tickets" element={<Tickets />} />
        <Route path="/private/analytics" element={<Analithycs />} />
        <Route path="/private/clientes" element={<Clientes />} />
        <Route path="/private/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
