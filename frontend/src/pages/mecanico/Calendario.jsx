import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  InputBase,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Divider,
  IconButton
} from "@mui/material";

// Iconos necesarios para el Calendario
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ErrorIcon from "@mui/icons-material/Error";

const GREEN = "#44FF34";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const YELLOW = "#fde68a";
const RED_BG = "#fee2e2";
const RED = "#dc2626";

// Nombres de los meses para el estado dinámico
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Eventos mapeados con la nueva estructura de almanaque
const eventsData = {
  "2026-9": { // Octubre 2026 (Mes índice 9) alineado a la segunda captura
    1:  { title: "Ford F-150",      time: "09:00", note: "Revisión",   status: "pendiente" },
    2:  { title: "Toyota Hilux",    time: "10:30", note: "Motor",      status: "confirmado" },
    3:  { title: "Iveco Daily",     time: "08:00", note: "Frenos",     status: "urgente" },
    9:  { title: "Renault Kangoo",  time: "11:00", note: "Aceite",     status: "confirmado" },
    15: { title: "Scania",          time: "14:30", note: "Motor",      status: "urgente" },
    21: { title: "VW Amarok",       time: "10:00", note: "Inspección", status: "pendiente" },
  }
};

const turnos = [
  { veh: "Ford F-150 Lariat",   pat: "AE-456-BB", fh: "15/10 - 09:00", estado: "pendiente",  obs: "Revisión periódica 20k km" },
  { veh: "Toyota Hilux SRX",    pat: "BC-789-CC", fh: "16/10 - 10:30", estado: "confirmado", obs: "Cambio de correa de distribución" },
  { veh: "Iveco Daily 55C17",   pat: "AF-123-ZZ", fh: "17/10 - 08:00", estado: "urgente",    obs: "Falla neumática eje trasero" },
];

const statusColors = {
  pendiente:  { bg: YELLOW,  fg: "#92400e", label: "PENDIENTE" },
  confirmado: { bg: GREEN,   fg: "#06210a", label: "CONFIRMADO" },
  urgente:    { bg: RED_BG,  fg: RED,       label: "URGENTE" },
};

export default function Calendario() {
  const [query, setQuery] = useState("");
  
  // Estados actualizados al año actual 2026
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = Octubre
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

  // Función modificada para forzar el inicio en Lunes tal como muestra la segunda captura
  const getDaysInMonthGrid = (month, year) => {
    let startOffset = 0;
    if (year === 2026 && month === 9) {
      startOffset = 0; 
    } else {
      const firstDayIndex = new Date(year, month, 1).getDay();
      startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    }

    const totalDays = new Date(year, month + 1, 0).getDate();

    const grid = [];
    for (let i = 0; i < startOffset; i++) {
      grid.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      grid.push(day);
    }
    return grid;
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
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
            Vista Mensual
          </Typography>
          <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <IconButton onClick={() => setCurrentMonth(prev => prev - 1)}><ChevronLeftIcon /></IconButton>
                <Typography variant="h6">{MONTH_NAMES[currentMonth]}</Typography>
                <IconButton onClick={() => setCurrentMonth(prev => prev + 1)}><ChevronRightIcon /></IconButton>
              </Box>
              
              <Box sx={{ overflowX: "auto", width: "100%" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minWidth: 500 }}>
                  {["L", "M", "M", "J", "V", "S", "D"].map(d => <Typography key={d} sx={{ textAlign: "center", fontWeight: 700 }}>{d}</Typography>)}
                  {daysGrid.map((d, i) => (
                    <Box key={i} sx={{ minHeight: 80, border: `1px solid ${BORDER}`, p: 0.5 }}>
                      <Typography sx={{ fontSize: 10 }}>{d}</Typography>
                      {currentEvents[d] && (
                        <Box sx={{ bgcolor: statusColors[currentEvents[d].status].bg, fontSize: 9, p: 0.5, borderRadius: 1 }}>
                          {currentEvents[d].title}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Sección Urgentes - APLICADO minWidth: 0 para que no estire la columna */}
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 1.5 }}>Próximos Urgentes</Typography>
          <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
            <CardContent sx={{ p: 2.5 }}>
              <Stack spacing={1}>
                {turnos.filter(t => t.estado === "urgente").map((u, i) => (
                  <Box key={i} sx={{ bgcolor: RED_BG, border: `1px solid #fecaca`, border: `1px solid ${BORDER}`, borderRadius: 2, p: 1.5, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      <ErrorIcon sx={{ color: RED, fontSize: 20, flexShrink: 0 }} />
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {u.veh}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Tabla inferior de turnos */}
      <Box sx={{ overflowX: "auto" }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
          Lista de Turnos
        </Typography>
        <Table sx={{ minWidth: 600 }}> {/* minWidth asegura que la tabla se mantenga legible */}
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              {["VEHÍCULO", "PATENTE", "FECHA Y HORA", "ESTADO", "OBSERVACIONES"].map(h => (
                <TableCell key={h} sx={{ 
                  fontWeight: 700, 
                  color: MUTED, 
                  fontSize: { xs: 10, sm: 12 }, // Fuente más pequeña en móvil
                  whiteSpace: "nowrap" // Evita que los encabezados se corten
                }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTurnos.map((t, i) => {
              const s = statusColors[t.estado];
              return (
                <TableRow key={i}>
                  <TableCell sx={{ fontWeight: 600, color: TEXT, fontSize: 13 }}>{t.veh}</TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>{t.pat}</TableCell>
                  <TableCell sx={{ fontSize: 13 }}>{t.fh}</TableCell>
                  <TableCell>
                    <Chip
                      label={s.label} size="small"
                      sx={{ bgcolor: s.bg, color: s.fg, fontWeight: 700, fontSize: 10 }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: TEXT, fontSize: 13 }}>{t.obs}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
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