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

// Eventos mapeados por mes, año y día
const eventsData = {
  "2023-9": { // Octubre es mes índice 9 (0-indexed)
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
  
  // Estados para controlar dinámicamente el mes y año
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = Octubre
  const [currentYear, setCurrentYear] = useState(2023);

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

  // Función para calcular la grilla real de días del mes
  const getDaysInMonthGrid = (month, year) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
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
      }}>
        
        {/* Sección Calendario */}
        <Box>
          {/* Título por encima de la tarjeta */}
          <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 1.5 }}>
            Vista Mensual
          </Typography>

          <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
            <CardContent sx={{ p: 2.5 }}>
              
              {/* Selector de meses alineado a la derecha */}
              <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 2.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton size="small" onClick={handlePrevMonth}>
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography sx={{ fontWeight: 700, color: TEXT, minWidth: 140, textAlign: "center", textTransform: "capitalize" }}>
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </Typography>
                  <IconButton size="small" onClick={handleNextMonth}>
                    <ChevronRightIcon />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Cabecera de días de la semana */}
              <Box sx={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
                border: `1px solid ${BORDER}`, borderBottom: 0,
                bgcolor: "#f8fafc",
              }}>
                {["LUN","MAR","MIÉ","JUE","VIE","SÁB","DOM"].map(d => (
                  <Box key={d} sx={{
                    p: 1.2, textAlign: "center", fontSize: 12, fontWeight: 700,
                    color: MUTED, borderRight: `1px solid ${BORDER}`,
                    "&:last-child": { borderRight: "none" }
                  }}>
                    {d}
                  </Box>
                ))}
              </Box>

              {/* Celdas del Calendario (Grid de días) */}
              <Box sx={{
                display: "grid", 
                gridTemplateColumns: "repeat(7, 1fr)",
                borderTop: `1px solid ${BORDER}`,
                borderLeft: `1px solid ${BORDER}`,
              }}>
                {daysGrid.map((d, i) => {
                  const ev = d ? currentEvents[d] : null;
                  return (
                    <Box key={i} sx={{
                      minHeight: 110,
                      p: 1,
                      borderRight: `1px solid ${BORDER}`,
                      borderBottom: `1px solid ${BORDER}`,
                      bgcolor: d ? "#fff" : "#f8fafc",
                      display: "flex", 
                      flexDirection: "column", 
                      justifyContent: "flex-start",
                      gap: 0.8,
                    }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: d ? TEXT : "transparent" }}>
                        {d || ""}
                      </Typography>
                      {ev && (
                        <Box sx={{
                          bgcolor: statusColors[ev.status].bg,
                          color: statusColors[ev.status].fg,
                          borderRadius: 1.5, 
                          p: 1,
                          fontSize: 11, 
                          lineHeight: 1.3,
                          border: `1px solid rgba(0,0,0,0.05)`,
                          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)"
                        }}>
                          <Box sx={{ fontWeight: 700 }}>{ev.title}</Box>
                          <Box sx={{ opacity: 0.9, fontSize: 10 }}>{ev.time} - {ev.note}</Box>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Columna derecha: Alertas */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 1.5 }}>
            Próximos Urgentes
          </Typography>
          <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none", height: "calc(100% - 38px)" }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{
                bgcolor: RED_BG, border: `1px solid #fecaca`,
                borderRadius: 2, p: 2, position: "relative",
              }}>
                <Chip
                  label="URGENTE" size="small"
                  sx={{
                    position: "absolute", top: 12, right: 12,
                    bgcolor: RED, color: "#fff", fontWeight: 700, fontSize: 10,
                  }}
                />
                <Typography sx={{ color: RED, fontWeight: 800, fontSize: 15 }}>AF-123-ZZ</Typography>
                <Typography sx={{ fontWeight: 700, color: TEXT, mt: 0.5 }}>Iveco Daily 3.0</Typography>
                <Typography variant="caption" sx={{ color: MUTED, display: "block", mt: 0.5 }}>
                  Hoy - 08:30 HS
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Tabla inferior de turnos */}
      <Card sx={{ mt: 2.5, borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
              Lista de Turnos
            </Typography>
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1,
              border: `1px solid ${BORDER}`, borderRadius: 2, px: 1.5, py: 0.5,
              bgcolor: "#fff", minWidth: 260,
            }}>
              <SearchIcon sx={{ color: MUTED, fontSize: 18 }} />
              <InputBase
                placeholder="Buscar patente…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ fontSize: 14, flex: 1 }}
              />
            </Box>
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                {["VEHÍCULO", "PATENTE", "FECHA Y HORA", "ESTADO", "OBSERVACIONES"].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: MUTED, fontSize: 12 }}>
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
                    <TableCell sx={{ fontWeight: 600, color: TEXT }}>{t.veh}</TableCell>
                    <TableCell sx={{ fontFamily: "monospace", letterSpacing: 1, fontSize: 13 }}>
                      {t.pat}
                    </TableCell>
                    <TableCell>{t.fh}</TableCell>
                    <TableCell>
                      <Chip
                        label={s.label} size="small"
                        sx={{
                          bgcolor: s.bg, color: s.fg, fontWeight: 700, fontSize: 11,
                          border: t.estado === "pendiente" ? "1px solid #f59e0b" : "none",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: TEXT }}>{t.obs}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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