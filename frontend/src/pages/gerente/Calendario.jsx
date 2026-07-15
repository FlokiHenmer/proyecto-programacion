import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { BORDER, TITLE, MUTED, BG, cardSx, EMPRESA_ID, EVENTOS_INICIALES, MESES, DIAS, buildMonthGrid, toISO, today } from "../../constants/CalendarioGerente";
import CalendarioHeader from "../../components/gerente/CalendarioHeader";
import MonthView from "../../components/gerente/MonthView";
import WeekView from "../../components/gerente/WeekView";
import DaySidebar from "../../components/gerente/DaySidebar";
import EventoDialog from "../../components/gerente/EventoDialog";


export default function CalendarioGerente() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
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
      
      {/* Calendario */}
      <CalendarioHeader view={view} setView={setView} />
      
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
                  <MonthView
                    grid={grid}
                    eventsByDay={eventsByDay}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    openEdit={openEdit}
                    isMobile={isMobile}
                  />
                ) : (
                  <WeekView
                    weekDays={weekDays}
                    eventsByDay={eventsByDay}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    openEdit={openEdit}
                  />
                )}
              </Box>
            </Box>
              
          </CardContent>
        </Card>

        <DaySidebar
          selectedDay={selectedDay}
          eventosDelDia={eventosDelDia}
          openCreate={openCreate}
          openEdit={openEdit}
        />
      </Box> 

      <EventoDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        editing={editing}
        form={form}
        setForm={setForm}
        saveEvent={saveEvent}
        deleteEvent={deleteEvent}
      />

    </Box>
      
  );
}