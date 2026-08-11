import React from "react";
import { Box, Card, CardContent, IconButton, Typography, Stack, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BORDER, MUTED, TEXT, cardSx, MONTH_NAMES, statusColors } from "../../../constants/CalendarioMecanico";

export default function CalendarioMensual({ 
  currentMonth,
  currentYear, 
  handlePrevMonth, 
  handleNextMonth, 
  daysGrid = [], 
  currentEvents = {},
  selectedDay,
  setSelectedDay,
  openEdit,
  isMobile 
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 1 }}>
        Vista Mensual
      </Typography>

      <Card sx={cardSx}>
        <CardContent>
          {/* Cabecera de Mes y Navegación */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handlePrevMonth}><ChevronLeftIcon /></IconButton>
            
            {/* 2. Muestra el mes y el año juntos */}
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </Typography>
            
            <IconButton onClick={handleNextMonth}><ChevronRightIcon /></IconButton>
          </Box>

          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <Box sx={{ minWidth: 500 }}>
              {/* Días de la semana */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mb: 1, gap: 1 }}>
                {["L", "M", "M", "J", "V", "S", "D"].map((d, index) => (
                  <Typography key={index} sx={{ textAlign: "center", fontWeight: 700, fontSize: 12, color: MUTED }}>
                    {d}
                  </Typography>
                ))}
              </Box>

              {/* Cuadrícula de días del mecánico */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
                {daysGrid.map((d, i) => {
                  // Si una celda viene vacía (espacio de relleno)
                  if (!d) {
                    return <Box key={i} sx={{ height: 120, bgcolor: "#fafafa", borderRadius: 2, border: `1px solid ${BORDER}`, opacity: 0.5 }} />;
                  }

                  const event = currentEvents[d];
                  const isSelected = selectedDay === d;

                  return (
                    <Box
                      key={i}
                      onClick={() => setSelectedDay?.(d)}
                      sx={{
                        cursor: "pointer",
                        height: 120,
                        p: 0.75,
                        borderRadius: 2,
                        border: `1px solid ${isSelected ? "#166534" : BORDER}`,
                        bgcolor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        overflow: "hidden",
                        transition: "all .15s",
                        "&:hover": { borderColor: "#166534", bgcolor: "#f8fafc" },
                      }}
                    >
                      {/* Número del día */}
                      <Box sx={{ alignSelf: "flex-end", fontSize: 12, fontWeight: 700, color: TEXT }}>
                        {d}
                      </Box>

                      {/* Evento asignado al día */}
                      <Stack spacing={0.3} sx={{ overflow: "hidden" }}>
                        {event && (
                          <Tooltip title={`${event.hora || ""} · ${event.title || event.titulo}`}>
                            <Box 
                              onClick={(ev) => { 
                                ev.stopPropagation(); 
                                openEdit?.(event); 
                              }} 
                              sx={{ 
                                fontSize: 10.5, 
                                px: 0.6, 
                                py: 0.2, 
                                borderRadius: 0.8, 
                                bgcolor: statusColors[event.status]?.bg || "#f1f5f9", 
                                color: statusColors[event.status]?.fg || "#475569", 
                                fontWeight: 700, 
                                whiteSpace: "nowrap", 
                                overflow: "hidden", 
                                textOverflow: "ellipsis" 
                              }}
                            >
                              {event.title || event.titulo}
                            </Box>
                          </Tooltip>
                        )}
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
          
        </CardContent>
      </Card>
    </Box>
  );
}