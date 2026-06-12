import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  Divider,
  Stack,
  Card,
  CardContent,
  Snackbar,   // <-- Agregado para el mensaje
  Alert       // <-- Agregado para el mensaje
} from "@mui/material";

// Importaciones directas a prueba de fallos
import BuildIcon from "@mui/icons-material/Build";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"; 
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Paleta de Diseño Consolidada
const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const GREEN_SOFT = "#e8ffe4";
const GREEN_TEXT = "#166534";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const PANEL_BG = "#f8fafc";

const greenBtn = {
  backgroundColor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  boxShadow: "none",
  "&:hover": { backgroundColor: GREEN_DARK, boxShadow: "none" },
};

const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff"
};

export default function TrabajosMecanico() {
  // 1. Estado para controlar la visibilidad del mensaje
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [vehiculo, setVehiculo] = useState("");
  const [km, setKm] = useState("");
  const [problema, setProblema] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [repuestos, setRepuestos] = useState([
    { nombre: "Filtro de Aceite", cantidad: "1", obs: "" },
    { nombre: "Aceite Sintético 5W30", cantidad: "5L", obs: "Bidón de 5 litros" },
  ]);

  const addRepuesto = () =>
    setRepuestos([...repuestos, { nombre: "", cantidad: "", obs: "" }]);
    
  const removeRepuesto = (i) =>
    setRepuestos(repuestos.filter((_, idx) => idx !== i));
    
  const updateRepuesto = (i, key, value) => {
    const copy = [...repuestos];
    copy[i][key] = value;
    setRepuestos(copy);
  };

  // 2. Función para activar el cartel al hacer click
  const handleGuardar = () => {
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Encabezado de la Sección */}
      <Box>
        <Typography variant="caption" sx={{ color: MUTED, fontSize: 13 }}>
          Carga las intervenciones técnicas, reparaciones y repuestos utilizados en el vehículo.
        </Typography>
      </Box>

      {/* Grid Contenedor de Columnas */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", lg: "1fr 340px" }, 
        gap: 3, 
        alignItems: "start" 
      }}>
        
        {/* Columna Izquierda: Formulario Principal */}
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

            {/* Trabajo Realizado */}
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
                <Box
                  key={i}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr 2fr 40px" },
                    gap: 1.5,
                    alignItems: "end",
                    p: 2,
                    borderRadius: 2.5,
                    border: `1px solid ${BORDER}`,
                    bgcolor: PANEL_BG,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: TEXT, mb: 0.5 }}>Nombre del repuesto</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value={r.nombre}
                      onChange={(e) => updateRepuesto(i, "nombre", e.target.value)}
                      InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1.5 } }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: TEXT, mb: 0.5 }}>Cantidad</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value={r.cantidad}
                      onChange={(e) => updateRepuesto(i, "cantidad", e.target.value)}
                      InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1.5 } }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: TEXT, mb: 0.5 }}>Observaciones</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Opcional"
                      value={r.obs}
                      onChange={(e) => updateRepuesto(i, "obs", e.target.value)}
                      InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1.5 } }}
                    />
                  </Box>
                  <IconButton onClick={() => removeRepuesto(i)} sx={{ color: "#dc2626", mb: 0.2 }}>
                    <DeleteIcon sx={{ fontSize: 22 }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            {/* Botón de Guardado con la acción vinculada */}
            <Button 
              fullWidth 
              startIcon={<SaveIcon />} 
              sx={{ ...greenBtn, py: 1.4, fontSize: 15 }}
              onClick={handleGuardar} // <-- Vinculado aquí
            >
              Guardar Registro de Trabajo
            </Button>
          </CardContent>
        </Card>

        {/* Columna Derecha: Sidebar de Información Fija */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* Info del Vehículo */}
          <Card sx={{ ...cardSx, borderLeft: `5px solid ${GREEN}` }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 12, letterSpacing: 1, mb: 2, color: MUTED }}>
                INFORMACIÓN EN TIEMPO REAL
              </Typography>
              <Box
                sx={{
                  height: 140,
                  borderRadius: 2,
                  mb: 2,
                  backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {[
                ["Modelo", "Toyota Hilux 2023"],
                ["Placa / Patente", "ABC-123"],
                ["Último Servicio", "12/05/2023"],
              ].map(([k, v]) => (
                <Box key={k} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: `1px solid ${BORDER}` }}>
                  <Typography sx={{ color: MUTED, fontSize: 13 }}>{k}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{v}</Typography>
                </Box>
              ))}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5 }}>
                <Typography sx={{ color: MUTED, fontSize: 13 }}>Estado</Typography>
                <Chip label="ÓPTIMO" size="small" sx={{ bgcolor: GREEN_SOFT, color: GREEN_TEXT, fontWeight: 700, fontSize: 11 }} />
              </Box>
            </CardContent>
          </Card>

          {/* Recordatorios de Seguridad */}
          <Card sx={cardSx}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 12, letterSpacing: 1, mb: 2, color: MUTED }}>
                CHECKLIST DE SEGURIDAD
              </Typography>
              {[
                "Verificar torque de pernos tras intervención.",
                "Limpieza de residuos de aceite en motor.",
                "Actualizar carnet de mantenimiento digital.",
              ].map((t) => (
                <Box key={t} sx={{ display: "flex", gap: 1.2, alignItems: "flex-start", mb: 1.5 }}>
                  <CheckCircleIcon sx={{ color: GREEN_DARK, fontSize: 18, mt: 0.2 }} />
                  <Typography sx={{ fontSize: 13.5, color: TEXT, fontWeight: 500 }}>{t}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
          
        </Box>
      </Box>

      {/* 3. Componente de Alerta Visual (Snackbar) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", bgcolor: "#0f172a", color: "#fff", fontWeight: 600 }}
        >
          Registro de trabajo guardado exitosamente
        </Alert>
      </Snackbar>

    </Box>
  );
}