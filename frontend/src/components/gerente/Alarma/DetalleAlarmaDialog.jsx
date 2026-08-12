import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography, Chip } from "@mui/material";
import { COLORS, EXTRA_COLORS, cardSx } from "../../../constants/Gerente";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function DetalleAlarmaDialog({ open, onClose, alarma }) {
  if (!alarma) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, fontSize: 20, pb: 1 }}>
        Detalle de Incidencia: {alarma.id}
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "#fcfcfc", p: 3 }}>
        <Stack spacing={2.5}>
          
          {/* Tarjeta 1: Información General y Vehículo */}
          <Box sx={{ ...cardSx, p: 2.5, boxShadow: "none", border: `1px solid ${COLORS.BORDER}` }}>
            <Stack spacing={1.5}>
              <Box>
                <Typography component="span" sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 13, mr: 1 }}>
                  Vehículo:
                </Typography>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {alarma.vehiculo} ({alarma.patente})
                </Typography>
              </Box>

              <Box>
                <Typography component="span" sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 13, mr: 1 }}>
                  Tipo de Alarma:
                </Typography>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {alarma.tipo}
                </Typography>
              </Box>

              <Box>
                <Typography component="span" sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 13, mr: 1 }}>
                  Esatdo:
                </Typography>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: 14, color: alarma.impacto.includes("No apto") ? COLORS.RED : COLORS.GREEN }}>
                  {alarma.impacto}
                </Typography>
              </Box>

              <Box>
                <Typography component="span" sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 13, mr: 1 }}>
                  Personal Notificado:
                </Typography>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {alarma.notificadoA}
                </Typography>
              </Box>

              <Box>
                <Typography component="span" sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 13, mr: 1 }}>
                  Turno Asignado:
                </Typography>
                <Typography component="span" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {alarma.turno}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Tarjeta 2: Observaciones y Estado (Similar al diseño de la imagen) */}
          <Box sx={{ ...cardSx, p: 2.5, boxShadow: "none", border: `1px solid ${COLORS.BORDER}` }}>
            <Typography sx={{ color: COLORS.MUTED, fontWeight: 800, fontSize: 12, mb: 1, letterSpacing: 0.5 }}>
              OBSERVACIONES Y RESULTADO
            </Typography>
            <Typography sx={{ fontSize: 13, color: COLORS.TEXT, mb: 2 }}>
              Incidencia registrada y derivada correctamente para su revisión técnica y control de flota.
            </Typography>
          </Box>

        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 700, color: COLORS.TEXT, bgcolor: COLORS.GREEN, textTransform: "none" }}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}