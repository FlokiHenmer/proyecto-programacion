import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import CalendarioMensual from "../../components/mecanico/Calendario/CalendarioMensual";
import ProximosUrgentes from "../../components/mecanico/Calendario/ProximosUrgentes";
import TurnosDelDia from "../../components/mecanico/Calendario/TurnosDelDia"; // <--- Nuevo componente importado
import TurnosTable from "../../components/mecanico/Calendario/ListaTurnosCalendario";
import { GREEN, RED, BORDER, MUTED, TEXT, eventsData, turnos, getDaysInMonthGrid } from "../../constants/CalendarioMecanico";

export default function Calendario() {
  const [query, setQuery] = useState("");
  
  // Estados de fecha y del día seleccionado
  const [currentMonth, setCurrentMonth] = useState(6); 
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(null); // <--- Estado para el día seleccionado

  // Manejadores de navegación de fechas
  const handlePrevMonth = () => {
    setSelectedDay(null); // Limpiamos selección al cambiar de mes
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDay(null); // Limpiamos selección al cambiar de mes
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

      {/* Grid principal: Calendario + Columna Derecha (Urgentes + Turnos del Día) */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
        gap: 2.5,
        width: "100%", 
        minWidth: 0,   
      }}>
        
        {/* Sección Calendario */}
        <CalendarioMensual
          currentMonth={currentMonth}
          currentYear={currentYear}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          daysGrid={daysGrid}
          currentEvents={currentEvents}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        {/* Columna Derecha: Próximos Urgentes + Turnos del Día */}
        <Box sx={{ minWidth: 0 }}>
          <ProximosUrgentes />
          <TurnosDelDia 
            selectedDay={selectedDay} 
            event={selectedDay ? currentEvents[selectedDay] : null} 
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </Box>
        
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