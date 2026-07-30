import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material";
import { TEXT, MUTED, GREEN, GREEN_DARK } from "../../../constants/EmpresasMecanico";

export default function EmpresaFormDialog({ open, onClose, onSubmit, formData, setFormData, editingEmpresa }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <form onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 800, color: TEXT, pb: 1 }}>
          {editingEmpresa ? "Editar Empresa" : "Registrar Nueva Empresa"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <Typography variant="caption" sx={{ color: MUTED, mb: 1 }}>
            Completá los datos fiscales y el contacto principal corporativo (Gerente de Flota).
          </Typography>
          <TextField
            label="Razón Social / Nombre de Empresa" required fullWidth size="small"
            value={formData.razonSocial} onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
          />
          <TextField
            label="CUIT" required fullWidth size="small" placeholder="30-XXXXXXXX-X"
            value={formData.cuit} onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
          />
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField
              label="Nombre del Gerente" required fullWidth size="small"
              value={formData.gerente} onChange={(e) => setFormData({ ...formData, gerente: e.target.value })}
            />
            <TextField
              label="Email Corporativo" required fullWidth size="small" type="email"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Box>
          <TextField
            label="Vehículos Iniciales en Flota" fullWidth size="small" type="number"
            value={formData.vehiculos} onChange={(e) => setFormData({ ...formData, vehiculos: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button onClick={onClose} sx={{ color: MUTED, textTransform: "none", fontWeight: 700 }}>
            Cancelar
          </Button>
          <Button type="submit" sx={{ bgcolor: GREEN, color: TEXT, fontWeight: 700, textTransform: "none", px: 3, "&:hover": { bgcolor: GREEN_DARK } }}>
            {editingEmpresa ? "Guardar Cambios" : "Dar de Alta"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
