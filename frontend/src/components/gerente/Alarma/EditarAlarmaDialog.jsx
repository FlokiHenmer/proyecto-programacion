import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { COLORS } from "../../../constants/Gerente";

export default function EditarAlarmaDialog({ open, onClose, alarma }) {
  if (!alarma) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>Editar Alarma y Asignar Turno</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField 
            label="Estado de la Alarma" 
            fullWidth 
            size="small" 
            defaultValue={alarma.estado} 
          />
          <TextField 
            label="Impacto Operativo" 
            fullWidth 
            size="small" 
            defaultValue={alarma.impacto} 
          />
          <TextField 
            label="Responsable Notificado" 
            fullWidth 
            size="small" 
            defaultValue={alarma.notificadoA} 
          />
          <TextField 
            label="Fecha de Turno para Taller" 
            type="date"
            fullWidth 
            size="small" 
            InputLabelProps={{ shrink: true }}
            defaultValue="2026-06-10"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: COLORS.MUTED, fontWeight: 700 , textTransform: "none" }}>Cancelar</Button>
        <Button variant="contained" onClick={onClose} sx={{ bgcolor: COLORS.GREEN, color: "#06210a", fontWeight: 700 , textTransform: "none" }}>Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  );
}