import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";

export default function VehiculoFormDialog({ open, onClose, onSubmit, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 700 }}>Nuevo Vehículo</DialogTitle>
      <Box component="form" onSubmit={onSubmit}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit" sx={{ textTransform: "none" }}>Cancelar</Button>
          <Button type="submit" variant="contained" sx={{ textTransform: "none", bgcolor: "#0f172a" }}>Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}