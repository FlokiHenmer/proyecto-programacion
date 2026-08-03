import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";

export default function OperarioFormDialog({ open, onClose, onSubmit, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700 }}>Nuevo Operario / Mecánico</DialogTitle>
      <Box component="form" onSubmit={onSubmit}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Nombre y apellido"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Rol / Especialidad"
            name="rol"
            value={formData.rol || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Empresa"
            name="empresa"
            value={formData.empresa || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit" sx={{ textTransform: "none" }}>Cancelar</Button>
          <Button type="submit" variant="contained" sx={{ textTransform: "none", bgcolor: "#0f172a" }}>Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}