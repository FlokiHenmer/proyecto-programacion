// src/pages/operario/PuestaEnMarcha.jsx
import { useMemo, useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, MenuItem,
  Radio, RadioGroup, FormControlLabel, Button, Stack, Grid, Alert, Divider
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import LightModeIcon from "@mui/icons-material/LightMode";
import AdjustIcon from "@mui/icons-material/Adjust";
import HelpIcon from "@mui/icons-material/Help";
import SendIcon from "@mui/icons-material/Send";

import SeccionCard from "../../components/operario/SeccionCard";

const VERDE = "#44FF34";
const AMARILLO = "#FFC107";
const ROJO = "#FF3B30";

// Definición de secciones y lógica de colores
const SECCIONES = [
  { key: "aceite", titulo: "Nivel de aceite", icon: <OpacityIcon />, opciones: [
      { label: "Bien", color: "green" }, { label: "Regular", color: "yellow" }, { label: "Bajo", color: "red" } ] },
  { key: "refrigerante", titulo: "Nivel de refrigerante", icon: <ThermostatIcon />, subtitulo: "Medir siempre en frío", opciones: [
      { label: "Bien", color: "green" }, { label: "Regular", color: "yellow" }, { label: "Vacío", color: "red" } ] },
  { key: "cubiertas", titulo: "Estado cubiertas", icon: <TripOriginIcon />, opciones: [
      { label: "Bueno", color: "green" }, { label: "Malo", color: "yellow" } ] },
  { key: "luces", titulo: "Luces", icon: <LightModeIcon />, opciones: [
      { label: "Funcionales", color: "green" }, { label: "Falla detectada", color: "yellow" } ] },
  { key: "frenos", titulo: "Frenos", icon: <AdjustIcon />, opciones: [
      { label: "Funcionales", color: "green" }, { label: "Falla detectada", color: "red" } ] },
];

const colorHex = (c) => c === "green" ? VERDE : c === "yellow" ? AMARILLO : ROJO;

export default function PuestaEnMarcha() {
  const fechaHoy = useMemo(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
  }, []);

  const [km, setKm] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [tipoControl, setTipoControl] = useState("regular");
  const [secciones, setSecciones] = useState({});
  const [informadoA, setInformadoA] = useState("");
  const [error, setError] = useState("");

  // Estado general calculado en base a las selecciones
  const estadoGeneral = useMemo(() => {
    const colores = SECCIONES.map(s => secciones[s.key]?.color).filter(Boolean);
    if (colores.length < SECCIONES.length) return null;
    if (colores.includes("red")) return "red";
    if (colores.includes("yellow")) return "yellow";
    return "green";
  }, [secciones]);

  const textoEstado = {
    green: "Apto para trabajar",
    yellow: "Operar con precaución",
    red: "No apto para conducir",
  };

  const handleEnviar = () => {
    if (!km || !vehiculo) return setError("Completá kilómetros y vehículo.");
    if (SECCIONES.some(s => !secciones[s.key]?.opcion))
      return setError("Seleccioná una opción en cada sección.");
    if ((estadoGeneral === "yellow" || estadoGeneral === "red") && !informadoA.trim())
      return setError("Indicá a quién se informó la falla.");
    setError("");
    console.log({ fechaHoy, km, vehiculo, tipoControl, secciones, estadoGeneral, informadoA });
    alert("Puesta en marcha enviada ✅");
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#F4F6F8", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Puesta en Marcha del Vehículo
      </Typography>

      {/* Encabezado */}
      <Card sx={{ borderLeft: `5px solid ${VERDE}`, borderRadius: 3, mb: 3, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Fecha Actual" value={fechaHoy} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="Kilómetros" type="number" placeholder="Ej: 125400"
                value={km} onChange={(e) => setKm(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth select label="Vehículo" value={vehiculo}
                onChange={(e) => setVehiculo(e.target.value)}>
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="AAA111">AAA111 - Ford Ranger</MenuItem>
                <MenuItem value="BBB222">BBB222 - Toyota Hilux</MenuItem>
                <MenuItem value="CCC333">CCC333 - VW Amarok</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary" mb={0.5}>Tipo de control</Typography>
              <RadioGroup row value={tipoControl} onChange={(e) => setTipoControl(e.target.value)}>
                <FormControlLabel value="regular" control={<Radio sx={{ color: VERDE, "&.Mui-checked": { color: VERDE } }} />} label="Regular" />
                <FormControlLabel value="previaje" control={<Radio />} label="Previaje" />
              </RadioGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Secciones */}
      <Grid container spacing={2.5} justifyContent="center" alignItems="stretch">
        {SECCIONES.map((s) => (
          <Grid item xs={12} md={6} key={s.key}>
            <SeccionCard
              seccion={s}
              valor={secciones[s.key]}
              onChange={(v) => setSecciones((prev) => ({ ...prev, [s.key]: v }))}
            />
          </Grid>
        ))}
      </Grid>

      {/* Estado general */}
      <Card sx={{
        mt: 3, borderRadius: 3,
        boxShadow: estadoGeneral ? `0 0 24px ${colorHex(estadoGeneral)}55` : "0 4px 18px rgba(0,0,0,0.06)",
        bgcolor: estadoGeneral ? colorHex(estadoGeneral) : "#fff",
        color: estadoGeneral ? "#fff" : "text.primary",
        transition: "all .35s ease",
      }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <HelpIcon />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {estadoGeneral ? textoEstado[estadoGeneral] : "Completá el checklist"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {estadoGeneral
                  ? "Estado general calculado en base a las selecciones."
                  : "Seleccioná una opción en cada sección para conocer el estado general."}
              </Typography>
            </Box>
          </Stack>

          {(estadoGeneral === "yellow" || estadoGeneral === "red") && (
            <>
              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.4)" }} />
              <TextField
                fullWidth required label="¿A quién se informó la falla?"
                placeholder="Nombre de la persona informada"
                value={informadoA} onChange={(e) => setInformadoA(e.target.value)}
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
              />
            </>
          )}
        </CardContent>
      </Card>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          onClick={handleEnviar}
          startIcon={<SendIcon />}
          sx={{
            px: 5, py: 1.5, fontWeight: 700, textTransform: "uppercase",
            color: "#000", bgcolor: VERDE, borderRadius: 2,
            boxShadow: `0 0 18px ${VERDE}88`,
            "&:hover": { bgcolor: "#36e028", boxShadow: `0 0 26px ${VERDE}` },
          }}
        >
          Enviar Puesta en Marcha
        </Button>
      </Box>
    </Box>
  );
}