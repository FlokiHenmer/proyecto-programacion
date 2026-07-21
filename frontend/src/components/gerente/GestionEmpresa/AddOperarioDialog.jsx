import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button } from "@mui/material";
import { buttonStyles } from "../../../constants/Gerente";

export default function AddOperarioDialog({ open, onClose, onSave, nuevoOperario, setNuevoOperario }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 800 }}>Nuevo Operario</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Nombre" fullWidth size="small" onChange={(e) => setNuevoOperario({...nuevoOperario, nombre: e.target.value})} />
          <TextField label="Ocupación" fullWidth size="small" onChange={(e) => setNuevoOperario({...nuevoOperario, rol: e.target.value})} />
          <TextField label="Correo" fullWidth size="small" onChange={(e) => setNuevoOperario({...nuevoOperario, email: e.target.value})} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none", color: "#64748b" }}>Cancelar</Button>
        <Button variant="contained" onClick={onSave} sx={{ ...buttonStyles.greenBtn, fontWeight: 600 }}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}