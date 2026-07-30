import React from "react";
import { Box, Typography, Stack, Card, CardContent, Button, Divider, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { cardSx, GREEN, BORDER, TITLE, TEXT, MUTED, MESES, tipoMeta } from "../../../constants/CalendarioGerente";

export default function DaySidebar({ selectedDay, eventosDelDia, openCreate, openEdit }) {
  return (
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
  );
}