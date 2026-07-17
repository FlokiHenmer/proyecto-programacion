import React from "react";
import { Typography, Button, Dialog, DialogContent, TextField } from "@mui/material";
import { greenBtn } from "../../constants/AlarmaMecanico";

export default function ProponerTurnoDialog({ selectedAlert, setSelectedAlert, fechaTurno, setFechaTurno }) {
  return (
    <Dialog open={Boolean(selectedAlert)} onClose={() => setSelectedAlert(null)} fullWidth maxWidth="xs">
      <DialogContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Proponer Turno</Typography>
        <TextField fullWidth margin="normal" label="Vehículo" value={selectedAlert?.vehiculo || ""} InputProps={{ readOnly: true }} />
        <TextField fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} label="Fecha" value={fechaTurno} onChange={(e) => setFechaTurno(e.target.value)} />
        <Button fullWidth sx={{ ...greenBtn, mt: 3 }} onClick={() => setSelectedAlert(null)}>Confirmar</Button>
      </DialogContent>
    </Dialog>
  );
}