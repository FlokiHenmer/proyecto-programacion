import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";
import { TEXT, MUTED, GREEN, GREEN_DARK } from "../../../constants/EmpresasMecanico";

export default function VehiculoFormDialog({ open, onClose, onSubmit, formData, setFormData, editingVehiculo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 800, color: TEXT, pb: 1 }}>
          {editingVehiculo ? "Editar Vehículo" : "Registrar Nuevo Vehículo"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <Typography variant="caption" sx={{ color: MUTED, mb: 1 }}>
            Completá los datos de la unidad y su asignación dentro de la flota corporativa.
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Modelo"
              name="modelo"
              value={formData.modelo || ""}
              onChange={handleChange}
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Patente"
              name="patente"
              value={formData.patente || ""}
              onChange={handleChange}
              required
              fullWidth
              size="small"
            />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Kilometraje"
              name="km"
              value={formData.km || ""}
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button onClick={onClose} sx={{ color: MUTED, textTransform: "none", fontWeight: 700 }}>
            Cancelar
          </Button>
          <Button type="submit" sx={{ bgcolor: GREEN, color: TEXT, fontWeight: 700, textTransform: "none", px: 3, "&:hover": { bgcolor: GREEN_DARK } }}>
            {editingVehiculo ? "Guardar Cambios" : "Dar de Alta"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}