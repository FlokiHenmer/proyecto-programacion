import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardMecanico from "./pages/mecanico/DashboardMecanico";
import DashboardGerente from "./pages/gerente/DashboardGerente";
import Operario from "./pages/operario/Operario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rutas del mecánico */}
      <Route path="/dashboard-mecanico/*" element={<DashboardMecanico />} />

      {/* Rutas del gerente */}
      <Route path="/dashboard-gerente/*" element={<DashboardGerente />} />

      {/* Rutas del operario */}
      <Route path="/operario" element={<Operario />} />
    </Routes>
  );
}

export default App;
