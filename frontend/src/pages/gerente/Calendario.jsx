import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Divider,
  useMediaQuery,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";


const GREEN = "#44FF34";
const BORDER = "#e5e7eb";
const TEXT = "#334155";
const TITLE = "#0f172a";
const MUTED = "#64748b";
const BG = "#f8fafc";
const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff",
};
const TIPOS = [
  { value: "preventivo", label: "Preventivo", color: "#16a34a", bg: "#dcfce7" },
  { value: "correctivo", label: "Correctivo", color: "#b91c1c", bg: "#fee2e2" },
  { value: "revision", label: "Revisión", color: "#1d4ed8", bg: "#dbeafe" },
  { value: "urgente", label: "Urgente", color: "#dc2626", bg: "#fee2e2" },
  { value: "completado", label: "Completado", color: "#0f766e", bg: "#ccfbf1" },
];
const tipoMeta = (v) => TIPOS.find((t) => t.value === v) || TIPOS[0];
const EMPRESA_ID = "EMP-001";
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const iso = (yy, mm, dd) => new Date(yy, mm, dd).toISOString().slice(0, 10);
const EVENTOS_INICIALES = [
  { id: 1, empresaId: "EMP-001", titulo: "Cambio de aceite", vehiculo: "Scania R450 (ABC-123)", fecha: iso(y, m, 3), hora: "09:00", tipo: "preventivo" },
  { id: 2, empresaId: "EMP-001", titulo: "Revisión frenos", vehiculo: "Mercedes Actros (DEF-456)", fecha: iso(y, m, 8), hora: "11:30", tipo: "revision" },
  { id: 3, empresaId: "EMP-001", titulo: "Reparación motor", vehiculo: "Iveco Stralis (GHI-789)", fecha: iso(y, m, 12), hora: "08:00", tipo: "correctivo" },
  { id: 4, empresaId: "EMP-001", titulo: "VTV", vehiculo: "VW Constellation (JKL-012)", fecha: iso(y, m, 15), hora: "10:00", tipo: "urgente" },
  { id: 5, empresaId: "EMP-001", titulo: "Servicio 20.000 km", vehiculo: "Ford Cargo (MNO-345)", fecha: iso(y, m, 15), hora: "14:00", tipo: "preventivo" },
  { id: 6, empresaId: "EMP-001", titulo: "Inspección neumáticos", vehiculo: "Scania G410 (PQR-678)", fecha: iso(y, m, 22), hora: "09:30", tipo: "completado" },
  { id: 7, empresaId: "EMP-002", titulo: "Otro evento", vehiculo: "Otra empresa", fecha: iso(y, m, 5), hora: "10:00", tipo: "preventivo" },
];
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DIAS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysPrev = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysPrev - i), out: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), out: false });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, out: next.getMonth() !== month });
    if (cells.length >= 42) break;
  }
  return cells;
}

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const toISO = (d) => d.toISOString().slice(0, 10);

export default function CalendarioGerente() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  const [cursor, setCursor] = useState(new Date(y, m, 1));
  const [view, setView] = useState("month");
  const [selectedDay, setSelectedDay] = useState(today);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    vehiculo: "",
    fecha: toISO(today),
    hora: "09:00",
    tipo: "preventivo",
  });

  const eventosEmpresa = useMemo(() => eventos.filter((e) => e.empresaId === EMPRESA_ID), [eventos]);
  const grid = useMemo(() => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()), [cursor]);
  const eventsByDay = useMemo(() => {
    const map = new Map();
    eventosEmpresa.forEach((e) => {
      const key = e.fecha;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(e);
    });
    return map;
  }, [eventosEmpresa]);
  
  const weekDays = useMemo(() => {
    const base = new Date(selectedDay);
    const dow = (base.getDay() + 6) % 7;
    base.setDate(base.getDate() - dow);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, [selectedDay]);

  const eventosDelDia = eventsByDay.get(toISO(selectedDay)) || [];
  
  const openCreate = (date) => {
    setEditing(null);
    setForm({ titulo: "", vehiculo: "", fecha: toISO(date || selectedDay), hora: "09:00", tipo: "preventivo" });
    setDialogOpen(true);
  };
  
  const openEdit = (ev) => {
    setEditing(ev);
    setForm({ titulo: ev.titulo, vehiculo: ev.vehiculo, fecha: ev.fecha, hora: ev.hora, tipo: ev.tipo });
    setDialogOpen(true);
  };
  
  const saveEvent = () => {
    if (!form.titulo || !form.vehiculo) return;
    if (editing) {
      setEventos((prev) => prev.map((e) => (e.id === editing.id ? { ...editing, ...form } : e)));
    } else {
      setEventos((prev) => [...prev, { id: Date.now(), empresaId: EMPRESA_ID, ...form }]);
    }
    setDialogOpen(false);
  };

  const deleteEvent = () => {
    if (!editing) return;
    setEventos((prev) => prev.filter((e) => e.id !== editing.id));
    setDialogOpen(false);
  };

  const navigate = (dir) => {
    const next = new Date(cursor);
    if (view === "month") next.setMonth(next.getMonth() + dir);
    else next.setDate(next.getDate() + dir * 7);
    setCursor(next);
    setSelectedDay(next);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: BG, minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        {/* Fila 1: Título y descripción */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: "#fff", border: `1px solid ${BORDER}`, color: TITLE, display: "flex" }}>
            <CalendarMonthIcon />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: TITLE }}>
              Calendario de Mantenimientos
            </Typography>
            <Typography variant="body2" sx={{ color: MUTED }}>
              Gestioná turnos y revisiones de la flota de tu empresa
            </Typography>
          </Box>
        </Stack>

        {/* Fila 2: Filtros y Botón Nuevo turno */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ width: "100%" }}
        >
          {/* Controles de Vista */}
          <ToggleButtonGroup
            size="small"
            exclusive
            value={view}
            onChange={(_, v) => v && setView(v)}
            sx={{
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 700,
                color: TEXT,
                border: `1px solid ${BORDER}`,
                px: 3,
              },
              "& .Mui-selected": { bgcolor: `${GREEN} !important`, color: "#000 !important" },
            }}
          >
            <ToggleButton value="month">Mes</ToggleButton>
            <ToggleButton value="week">Semana</ToggleButton>
          </ToggleButtonGroup>

          
        </Stack>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" }, gap: 3 }}>
        <Card sx={cardSx}>
          <CardContent>

            {/* 1. NAVEGACIÓN CENTRADA */}
            <Box sx={{ 
              display: "grid", 
              gridTemplateColumns: "auto 1fr auto", // <-- ESTO es lo que centra el título
              alignItems: "center", 
              mb: 2, 
              width: '100%' 
            }}>
              
              <IconButton onClick={() => navigate(-1)} sx={{ border: `1px solid ${BORDER}`, borderRadius: 1.5 }}>
                <ChevronLeftIcon />
              </IconButton>

              <Typography sx={{ 
                fontWeight: 800, 
                color: TITLE, 
                fontSize: 18, 
                textAlign: 'center', // Asegura que el texto esté centrado en su columna
                px: 1                // Un poco de margen para que no choque con los botones
              }}>
                {view === "month" 
                  ? `${MESES[cursor.getMonth()]} ${cursor.getFullYear()}` 
                  : `Semana del ${weekDays[0].getDate()} ${MESES[weekDays[0].getMonth()].slice(0, 3)}.`}
              </Typography>

              <IconButton onClick={() => navigate(1)} sx={{ border: `1px solid ${BORDER}`, borderRadius: 1.5 }}>
                <ChevronRightIcon />
              </IconButton>
            </Box>

            {/* 2. GRID UNIFICADO: Aquí ocurre la magia del responsive */}
            <Box sx={{ overflowX: "auto", width: "100%", pb: 2 }}>
              <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(7, 1fr)", // Garantiza 7 columnas perfectas
                minWidth: { xs: 600, md: "100%" },    // Fuerza el scroll en móvil y ocupa 100% en PC
                gap: 0.5 
              }}>
                
                {/* A. ENCABEZADO (Lun, Mar, Mie...) */}
                {DIAS.map((d) => (
                  <Typography key={d} sx={{ color: MUTED, fontWeight: 700, fontSize: 12, textAlign: "center", textTransform: "uppercase" }}>
                    {d}
                  </Typography>
                ))}

                {/* B. CUERPO (Mes o Semana) */}
                {view === "month" ? (
                  grid.map((cell, i) => {
                    const evs = eventsByDay.get(toISO(cell.date)) || [];
                    const isToday = sameDay(cell.date, today);
                    const isSelected = sameDay(cell.date, selectedDay);
                    return (
                      <Box
                        key={i}
                        onClick={() => setSelectedDay(cell.date)}
                        sx={{
                          cursor: "pointer",
                          height: 120,
                          p: 0.75,
                          borderRadius: 2,
                          border: `1px solid ${isSelected ? GREEN : BORDER}`,
                          bgcolor: cell.out ? "#fafafa" : "#fff",
                          opacity: cell.out ? 0.5 : 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          overflow: "hidden",
                          transition: "all .15s",
                          "&:hover": { borderColor: GREEN, bgcolor: "#f8fafc" },
                        }}
                      >
                        <Box sx={{ alignSelf: "flex-end", fontSize: 12, fontWeight: 700, color: isToday ? "#000" : TEXT, bgcolor: isToday ? GREEN : "transparent", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {cell.date.getDate()}
                        </Box>
                        <Stack spacing={0.3} sx={{ overflow: "hidden" }}>
                          {evs.slice(0, isMobile ? 1 : 2).map((e) => (
                            <Tooltip key={e.id} title={`${e.hora} · ${e.titulo}`}>
                              <Box onClick={(ev) => { ev.stopPropagation(); openEdit(e); }} sx={{ fontSize: 10.5, px: 0.6, py: 0.2, borderRadius: 0.8, bgcolor: tipoMeta(e.tipo).bg, color: tipoMeta(e.tipo).color, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {e.titulo}
                              </Box>
                            </Tooltip>
                          ))}
                        </Stack>
                      </Box>
                    );
                  })
                ) : (
                  weekDays.map((d, i) => {
                    const evs = eventsByDay.get(toISO(d)) || [];
                    const isToday = sameDay(d, today);
                    const isSelected = sameDay(d, selectedDay);
                    return (
                      <Box key={i} onClick={() => setSelectedDay(d)} sx={{ cursor: "pointer", minHeight: 220, p: 1, borderRadius: 2, border: `1px solid ${isSelected ? GREEN : BORDER}`, bgcolor: "#fff", display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {/* Aquí eliminamos el Typography del nombre del día */}
                        <Box sx={{ alignSelf: "flex-end", fontSize: 12, fontWeight: 800, color: isToday ? "#000" : TEXT, bgcolor: isToday ? GREEN : "transparent", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {d.getDate()}
                        </Box>
                        <Divider />
                        <Stack spacing={0.5} sx={{ overflow: "auto" }}>
                          {evs.map((e) => (
                            <Box key={e.id} onClick={(ev) => { ev.stopPropagation(); openEdit(e); }} sx={{ p: 0.6, borderRadius: 1, bgcolor: tipoMeta(e.tipo).bg, color: tipoMeta(e.tipo).color, borderLeft: `3px solid ${tipoMeta(e.tipo).color}`, cursor: "pointer" }}>
                              <Typography sx={{ fontSize: 11, fontWeight: 800 }}>{e.hora}</Typography>
                              <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{e.titulo}</Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        <Card sx={cardSx}>
          <CardContent>

            {/* Botón Nuevo turno  */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openCreate()}
              sx={{ 
                bgcolor: GREEN, 
                color: "#000", 
                fontWeight: 800, 
                textTransform: "none",
                "&:hover": { bgcolor: "#36d629" },
                px: 3
              }}
            >
              Nuevo turno
            </Button>

            {/* Separador visual para dar claridad */}
            <Divider sx={{ mb: 2 }} />

            <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700 }}>DÍA SELECCIONADO</Typography>
            <Typography sx={{ fontWeight: 800, color: TITLE, fontSize: 18, mb: 0.5 }}>{selectedDay.getDate()} de {MESES[selectedDay.getMonth()]}</Typography>
            <Typography sx={{ color: MUTED, fontSize: 12, mb: 2 }}>{eventosDelDia.length} turno{eventosDelDia.length !== 1 ? "s" : ""} programado{eventosDelDia.length !== 1 ? "s" : ""}</Typography>
            <Stack spacing={1.5}>
              {eventosDelDia.length === 0 && (<Box sx={{ p: 2, textAlign: "center", border: `1px dashed ${BORDER}`, borderRadius: 2, color: MUTED, fontSize: 13 }}>Sin turnos para este día.</Box>)}
              {eventosDelDia.map((e) => (
                <Box key={e.id} onClick={() => openEdit(e)} sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${tipoMeta(e.tipo).color}`, cursor: "pointer", "&:hover": { bgcolor: "#f8fafc" } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 800, color: TITLE, fontSize: 14 }}>{e.titulo}</Typography>
                    <Chip size="small" label={e.hora} sx={{ bgcolor: "#f1f5f9", fontWeight: 700, color: TEXT }} />
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                    <LocalShippingIcon sx={{ fontSize: 14, color: MUTED }} />
                    <Typography sx={{ fontSize: 12, color: MUTED }}>{e.vehiculo}</Typography>
                  </Stack>
                  <Chip size="small" label={tipoMeta(e.tipo).label} sx={{ mt: 1, bgcolor: tipoMeta(e.tipo).bg, color: tipoMeta(e.tipo).color, fontWeight: 700, borderRadius: 1.5 }} />
                </Box>
              ))}
            </Stack>
            
          </CardContent>
        </Card>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800, color: TITLE }}>{editing ? "Editar turno" : "Nuevo turno"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Título / servicio" size="small" fullWidth value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            <TextField label="Vehículo" size="small" fullWidth placeholder="Ej: Scania R450 (ABC-123)" value={form.vehiculo} onChange={(e) => setForm({ ...form, vehiculo: e.target.value })} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label="Fecha" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
              <TextField label="Hora" type="time" size="small" fullWidth InputLabelProps={{ shrink: true }} value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} />
            </Stack>
            <TextField select label="Tipo" size="small" fullWidth value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              {TIPOS.map((t) => (<MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
          <Box>{editing && (<Button onClick={deleteEvent} startIcon={<DeleteOutlineIcon />} sx={{ color: "#b91c1c", textTransform: "none", fontWeight: 700 }}>Eliminar</Button>)}</Box>
          <Stack direction="row" spacing={1}>
            <Button onClick={() => setDialogOpen(false)} sx={{ color: TEXT, textTransform: "none" }}>Cancelar</Button>
            <Button variant="contained" onClick={saveEvent} sx={{ bgcolor: GREEN, color: "#000", fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "#36d629" } }}>{editing ? "Guardar cambios" : "Crear turno"}</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
}