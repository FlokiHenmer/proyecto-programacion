import { Routes, Route } from "react-router-dom";
import GestionEmpresa from "./GestionEmpresa";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";

export default function DashboardGerente() {
  return (
    <Routes>
      <Route path="gestion-empresa" element={<GestionEmpresa />} />
      <Route path="alarmas" element={<Alarmas />} />
      <Route path="calendario" element={<Calendario />} />
      <Route path="historial" element={<Historial />} />
    </Routes>
  );
}
