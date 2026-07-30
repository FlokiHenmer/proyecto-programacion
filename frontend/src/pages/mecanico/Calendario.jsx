import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import CalendarioMensual from "../../components/mecanico/Calendario/CalendarioMensual";
import ProximosUrgentes from "../../components/mecanico/Calendario/ProximosUrgentes";
import TurnosTable from "../../components/mecanico/Calendario/ListaTurnosCalendario";
import { GREEN, RED, BORDER,MUTED, TEXT, eventsData, turnos, getDaysInMonthGrid } from "../../constants/CalendarioMecanico";

export default function Calendario() {
  const [query, setQuery] = useState("");
  
  // Estados actualizados al año actual 2026
  const [currentMonth, setCurrentMonth] = useState(6); // 
  const [currentYear, setCurrentYear] = useState(2026);

  // Manejadores de navegación de fechas
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const daysGrid = getDaysInMonthGrid(currentMonth, currentYear);
  const currentEvents = eventsData[`${currentYear}-${currentMonth}`] || {};

  const filteredTurnos = turnos.filter(t =>
    t.pat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box>
      {/* KPIs superiores */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: 2, mb: 2.5,
      }}>
        <KpiCard label="CONFIRMADOS" value="12" borderColor={GREEN} />
        <KpiCard label="PENDIENTES"  value="5"  borderColor="#facc15" />
        <KpiCard label="URGENTES"    value="2"  borderColor={RED} />
      </Box>

      {/* Grid principal: Calendario + Alertas */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
        gap: 2.5,
        width: "100%", // Asegura que no se desborde del padre
        minWidth: 0,   // Crucial: Permite que el grid se encoja si es necesario
      }}>
        
        {/* Sección Calendario */}
        <CalendarioMensual
          currentMonth={currentMonth}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          daysGrid={daysGrid}
          currentEvents={currentEvents}
        />

        {/* Sección Urgentes - APLICADO minWidth: 0 para que no estire la columna */}
        <ProximosUrgentes />
        
      </Box>

      {/* Tabla inferior de turnos */}
      <TurnosTable filteredTurnos={filteredTurnos} />

    </Box>
  );
}

function KpiCard({ label, value, borderColor }) {
  return (
    <Card sx={{
      borderRadius: 3, border: `1px solid ${BORDER}`,
      borderLeft: `4px solid ${borderColor}`, boxShadow: "none",
    }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, letterSpacing: 1 }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: TEXT, mt: 0.5 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}