import React from "react";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { cardSx, TEXT, MUTED, BORDER, statusColors } from "../../../constants/CalendarioMecanico";

export default function TurnosDelDia({ selectedDay, event, currentMonth, currentYear }) {
  const formattedDate = selectedDay && currentMonth !== undefined && currentYear !== undefined
    ? new Date(currentYear, currentMonth, selectedDay).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
    : "";

  return (
    <Card sx={{ ...cardSx, mt: 2.5 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <EventNoteIcon sx={{ color: TEXT }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: MUTED, letterSpacing: 0.5 }}>
            DÍA SELECCIONADO
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 0.5 }}>
          {selectedDay ? formattedDate : "Selecciona un día"}
        </Typography>

        <Typography variant="caption" sx={{ color: MUTED, display: "block", mb: 2 }}>
          {selectedDay && event ? "1 turno programado" : selectedDay ? "Sin turnos programados" : "Haz clic en una fecha del calendario"}
        </Typography>

        {selectedDay && event && (
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              border: `1px solid ${BORDER}`,
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
          >
            {/* Cabecera del turno: Título y Hora */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography sx={{ fontWeight: 800, fontSize: 14, color: TEXT }}>
                {event.title}
              </Typography>
              {event.hora && (
                <Chip 
                  label={event.hora} 
                  size="small" 
                  sx={{ bgcolor: "#f1f5f9", fontWeight: 700, fontSize: 11, color: MUTED, height: 22 }} 
                />
              )}
            </Box>

            {/* Vehículo */}
            {event.vehiculo && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocalShippingIcon sx={{ fontSize: 16, color: MUTED }} />
                <Typography sx={{ fontSize: 13, color: TEXT, fontWeight: 600 }}>
                  {event.vehiculo}
                </Typography>
              </Stack>
            )}

            {/* Pie de tarjeta: Categoría (neutral sin azul) y Estado */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              {event.note && (
                <Chip 
                  label={event.note} 
                  size="small" 
                  sx={{ bgcolor: "#f1f5f9", color: MUTED, fontWeight: 700, fontSize: 11, height: 20 }} 
                />
              )}
              {event.status && (
                <Chip 
                  label={statusColors[event.status]?.label || event.status.toUpperCase()} 
                  size="small" 
                  sx={{ 
                    bgcolor: statusColors[event.status]?.bg || "#e2e8f0", 
                    color: statusColors[event.status]?.fg || "#334155", 
                    fontWeight: 700, 
                    fontSize: 10,
                    height: 20
                  }} 
                />
              )}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}