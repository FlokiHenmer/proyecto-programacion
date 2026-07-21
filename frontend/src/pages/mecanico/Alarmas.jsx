import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import AlertasCriticas from "../../components/mecanico/Alarmas/AlertasCriticas";
import TurnosTable from "../../components/mecanico/Alarmas/TurnosTable";
import AgendaSemanal from "../../components/mecanico/Alarmas/CardAgendaAlarma";
import ProponerTurnoDialog from "../../components/mecanico/Alarmas/ProponerTurnoDialog";

export default function AlertasMecanico() {
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaTurno, setHoraTurno] = useState("");

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      {/* Alertas Críticas */}
      <AlertasCriticas setSelectedAlert={setSelectedAlert} />

      {/* Sección Inferior: Turnos + Agenda */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "2fr 1fr" }, gap: 3 }}>
        <TurnosTable />
        <AgendaSemanal />           
      
      </Box>

      {/* Dialog Turno */}
      <ProponerTurnoDialog
        selectedAlert={selectedAlert}
        setSelectedAlert={setSelectedAlert}
        fechaTurno={fechaTurno}
        setFechaTurno={setFechaTurno}
      />

    </Box>
  );
}