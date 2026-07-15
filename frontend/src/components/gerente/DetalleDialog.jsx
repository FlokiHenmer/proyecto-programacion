import React from "react";
import { Box, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { GREEN, BORDER, TEXT, MUTED, BG } from "../../constants/HistorialGerente";
import TipoChip from "./TipoChip";

function Row({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography sx={{ color: MUTED, fontSize: 13, fontWeight: 600 }}>{label}</Typography>
      <Box sx={{ color: TEXT, fontSize: 14, fontWeight: 600 }}>{value}</Box>
    </Stack>
  );
}

export default function DetalleDialog({ selected, setSelected }) {
  return (
    <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="xs">
      <DialogTitle sx={{ pb: 1, fontWeight: 800, color: TEXT }}>
        Detalle del Servicio
      </DialogTitle>
      
      <DialogContent dividers sx={{ bgcolor: BG }}>
        {selected && (
          <Stack spacing={2}>
            {/* Bloque Info */}
            <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2, border: `1px solid ${BORDER}` }}>
              <Stack spacing={1.5}>
                <Row label="Vehículo:" value={selected.vehiculo} />
                <Row label="Operario:" value={selected.operario} />
                <Row label="Fecha:" value={selected.fecha} />
                <Row 
                  label="Tipo:" 
                  value={<TipoChip tipo={selected.tipo} />} 
                />
              </Stack>
            </Box>
            {/* Bloque Observaciones */}
            <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2, border: `1px solid ${BORDER}` }}>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 800, display: 'block', mb: 1 }}>
                OBSERVACIONES Y RESULTADO
              </Typography>
              <Typography sx={{ color: TEXT, fontSize: 14, mb: 1 }}>
                {selected.observaciones || "Servicio realizado según protocolo. Checklist completo y firmado."}
              </Typography>
              
              <Stack direction="row" alignItems="center" spacing={1}>
                {selected.resultado === "ok" ? (
                  <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 20 }} />
                ) : (
                  <WarningAmberIcon sx={{ color: "#d97706", fontSize: 20 }} />
                )}
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: selected.resultado === "ok" ? "#16a34a" : "#d97706" }}>
                  {selected.resultado === "ok" ? "Sin incidencias" : "Con advertencias"}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={() => setSelected(null)} sx={{ color: MUTED, fontWeight: 600, textTransform: "none" }}>
          Cerrar
        </Button>
        <Button 
          variant="contained"
          onClick={() => console.log("Descargando...")}
          sx={{ bgcolor: GREEN, color: "#000", textTransform: "none", fontWeight: 600, px: 3, "&:hover": { bgcolor: "#36d629"} }}
        >
          Descargar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}
