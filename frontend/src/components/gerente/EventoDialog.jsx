import React from "react";
import { Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from "@mui/material";
import { TITLE, TEXT, GREEN, TIPOS } from "../../constants/CalendarioGerente";

export default function EventoDialog({ dialogOpen, setDialogOpen, editing, form, setForm, saveEvent, deleteEvent }) {
  return (
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
        <Box>{editing && (<Button onClick={deleteEvent} sx={{ color: "#b91c1c", textTransform: "none", fontWeight: 700 }}>Eliminar</Button>)}</Box>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: TEXT, textTransform: "none" }}>Cancelar</Button>
          <Button variant="contained" onClick={saveEvent} sx={{ bgcolor: GREEN, color: "#000", fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "#36d629" } }}>{editing ? "Guardar cambios" : "Crear turno"}</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
