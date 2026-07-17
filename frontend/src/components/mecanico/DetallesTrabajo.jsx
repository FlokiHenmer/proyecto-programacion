import {
  Box,
  Typography,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Divider,
  Stack,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";

import { BORDER, GREEN_SOFT,  GREEN_TEXT,  MUTED,  PANEL_BG,  TEXT,  cardSx,  greenBtn } from "../../constants/Mecanico";
import RepuestoRow from "./RepuestoRow";

export default function DetallesTrabajo({
  vehiculo,
  setVehiculo,
  km,
  setKm,
  problema,
  setProblema,
  trabajo,
  setTrabajo,
  repuestos,
  addRepuesto,
  removeRepuesto,
  updateRepuesto,
  handleGuardar,
}) {
  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18, color: TEXT }}>
            Detalles del Trabajo
          </Typography>
          <Chip
            label="EN PROCESO"
            size="small"
            sx={{ bgcolor: GREEN_SOFT, color: GREEN_TEXT, fontWeight: 700, fontSize: 11 }}
          />
        </Box>

        {/* Inputs de Vehículo y Kilometraje */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5, mb: 2.5 }}>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, color: TEXT }}>
              Vehículo <span style={{ color: "#dc2626" }}>*</span>
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={vehiculo}
                onChange={(e) => setVehiculo(e.target.value)}
                sx={{ bgcolor: PANEL_BG, borderRadius: 2 }}
              >
                <MenuItem value=""><em style={{ color: MUTED }}>Seleccione un vehículo</em></MenuItem>
                <MenuItem value="ABC-123">Toyota Hilux — ABC-123</MenuItem>
                <MenuItem value="DEF-456">Ford Ranger — DEF-456</MenuItem>
                <MenuItem value="GHI-789">Iveco Daily — GHI-789</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, color: TEXT }}>
              Kilometraje actual
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Ej: 125400"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              InputProps={{ sx: { bgcolor: PANEL_BG, borderRadius: 2 } }}
            />
          </Box>
        </Box>

        {/* Problema Detectado */}
        <Box sx={{ mb: 2.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, color: TEXT }}>
            Problema detectado
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Describa el fallo o motivo del ingreso..."
            value={problema}
            onChange={(e) => setProblema(e.target.value)}
            InputProps={{ sx: { bgcolor: PANEL_BG, borderRadius: 2 } }}
          />
        </Box>

        {/* Trabajo realizado  */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, color: TEXT }}>
            Trabajo realizado
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Detalle las reparaciones efectuadas..."
            value={trabajo}
            onChange={(e) => setTrabajo(e.target.value)}
            InputProps={{ sx: { bgcolor: PANEL_BG, borderRadius: 2 } }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Sección de Repuestos */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 12, letterSpacing: 1, color: MUTED }}>
            REPUESTOS E INSUMOS
          </Typography>
          <Button
            onClick={addRepuesto}
            startIcon={<AddIcon />}
            sx={{ textTransform: "none", color: GREEN_TEXT, fontWeight: 700, fontSize: 13 }}
          >
            Agregar repuesto
          </Button>
        </Box>

        {/* Listado de Repuestos Dinámicos */}
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          {repuestos.map((r, i) => (
            <RepuestoRow
              key={i}
              repuesto={r}
              index={i}
              updateRepuesto={updateRepuesto}
              removeRepuesto={removeRepuesto}
            />
          ))}
        </Stack>

        {/* Botón de Guardado con la acción vinculada */}
        <Button
          fullWidth
          startIcon={<SaveIcon />}
          sx={{ ...greenBtn, py: 1.4, fontSize: 15 }}
          onClick={handleGuardar}
        >
          Guardar Registro de Trabajo
        </Button>
      </CardContent>
    </Card>
  );
}
