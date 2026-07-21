import React from "react";
import { Box, Typography, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BORDER, TITLE, MUTED, TEXT, GREEN } from "../../../constants/CalendarioGerente";

export default function CalendarioHeader({ view, setView }) {
  return (
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
  );
}
