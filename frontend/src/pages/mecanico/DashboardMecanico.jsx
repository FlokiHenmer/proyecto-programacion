import { Routes, Route } from "react-router-dom";
import GestionEmpresas from "./GestionEmpresas";
import FormularioTecnico from "./FormularioTecnico";
import Trabajos from "./Trabajos";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";

export default function DashboardMecanico() {
  return (
    <Routes>
      <Route path="gestion-empresas" element={<GestionEmpresas />} />
      <Route path="formulario-tecnico" element={<FormularioTecnico />} />
      <Route path="trabajos" element={<Trabajos />} />
      <Route path="alarmas" element={<Alarmas />} />
      <Route path="calendario" element={<Calendario />} />
      <Route path="historial" element={<Historial />} />
    </Routes>
  );
}
