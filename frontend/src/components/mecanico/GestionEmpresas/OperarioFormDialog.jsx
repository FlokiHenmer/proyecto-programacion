import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";
import { TEXT, MUTED, GREEN, GREEN_DARK } from "../../../constants/EmpresasMecanico";

export default function OperarioFormDialog({ open, onClose, onSubmit, formData, setFormData, editingOperario }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 800, color: TEXT, pb: 1 }}>
          {editingOperario ? "Editar Operario " : "Registrar Nuevo Operario "}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <Typography variant="caption" sx={{ color: MUTED, mb: 1 }}>
            Ingresá los datos del operario o especialista asignado a las tareas técnicas.
          </Typography>
          <TextField
            label="Nombre y apellido"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
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
          </Box>
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
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button onClick={onClose} sx={{ color: MUTED, textTransform: "none", fontWeight: 700 }}>
            Cancelar
          </Button>
          <Button type="submit" sx={{ bgcolor: GREEN, color: TEXT, fontWeight: 700, textTransform: "none", px: 3, "&:hover": { bgcolor: GREEN_DARK } }}>
            {editingOperario ? "Guardar Cambios" : "Dar de Alta"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}