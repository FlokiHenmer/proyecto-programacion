import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DetallesTrabajo from "../../components/mecanico/Trabajos/DetallesTrabajo";
import InfoVehiculo from "../../components/mecanico/Trabajos/InfoVehiculo";
import { MUTED, GREEN_DARK, TEXT, cardSx, repuestosIniciales } from "../../constants/Mecanico"

export default function TrabajosMecanico() {
  // 1. Estado para controlar la visibilidad del mensaje
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [vehiculo, setVehiculo] = useState("");
  const [km, setKm] = useState("");
  const [problema, setProblema] = useState("");
  const [trabajo, setTrabajo] = useState("");

  const [repuestos, setRepuestos] = useState(repuestosIniciales);

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
        <DetallesTrabajo
          vehiculo={vehiculo}
          setVehiculo={setVehiculo}
          km={km}
          setKm={setKm}
          problema={problema}
          setProblema={setProblema}
          trabajo={trabajo}
          setTrabajo={setTrabajo}
          repuestos={repuestos}
          addRepuesto={addRepuesto}
          removeRepuesto={removeRepuesto}
          updateRepuesto={updateRepuesto}
          handleGuardar={handleGuardar}
        />

        {/* Columna Derecha: Sidebar de Información Fija */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* Info del Vehículo */}
          <InfoVehiculo />

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