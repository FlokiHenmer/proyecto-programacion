import { Box, TextField, MenuItem } from "@mui/material";
import { BORDER, CARD } from "../../constants/FormularioMecanico";

export default function DatosGenerales({ form, setForm }) {
  return (
    <Box sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: 3, p: 3, mb: 3, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2 }}>
      <TextField
        label="Fecha"
        type="date"
        value={form.fecha}
        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="Kilómetros"
        placeholder="000.000"
        value={form.km}
        onChange={(e) => setForm({ ...form, km: e.target.value })}
        fullWidth
      />
      <TextField
        label="Vehículo"
        select
        value={form.vehiculo}
        onChange={(e) => setForm({ ...form, vehiculo: e.target.value })}
        fullWidth
      >
        <MenuItem value="">Seleccionar...</MenuItem>
        <MenuItem value="hilux">Toyota Hilux - ABC123</MenuItem>
        <MenuItem value="ranger">Ford Ranger - DEF456</MenuItem>
        <MenuItem value="iveco">Iveco Daily - GHI789</MenuItem>
      </TextField>
    </Box>
  );
}