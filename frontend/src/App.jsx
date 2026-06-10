import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardMecanico from "./pages/mecanico/DashboardMecanico";
import DashboardGerente from "./pages/gerente/DashboardGerente";
import Operario from "./pages/operario/Operario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mecanico/*" element={<DashboardMecanico />} />
      <Route path="/gerente/*" element={<DashboardGerente />} />
      <Route path="/operario/*" element={<Operario />} />
    </Routes>
  );
}

export default App;
