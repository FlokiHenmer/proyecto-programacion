import { useMemo, useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, MenuItem,
  Radio, RadioGroup, FormControlLabel, Button, Stack, Grid, Alert, Divider, Snackbar,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import LightModeIcon from "@mui/icons-material/LightMode";
import AdjustIcon from "@mui/icons-material/Adjust";
import HelpIcon from "@mui/icons-material/Help";
import SendIcon from "@mui/icons-material/Send";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import Navbar from "../../components/layout/Navbar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VERDE = "#44FF34";
const AMARILLO = "#FFC107";
const ROJO = "#FF3B30";
// Tokens visuales consistentes con el resto del dashboard
const GREEN = VERDE;
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const BG = "#f8fafc";
const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
  bgcolor: "#fff",
  transition: "box-shadow .25s ease, transform .25s ease",
};
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    setOpenSnackbar(true);
  };
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG }}>
      <Navbar />
      <Box sx={{ maxWidth: 1280, mx: "auto", p: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 3 }}
        >
          <Box sx={{
            width: 48, height: 48, borderRadius: 2.5,
            bgcolor: BG, border: `1px solid ${BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <BuildCircleIcon sx={{ color: TEXT }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 800, color: TEXT, lineHeight: 1.1 }}>
              Puesta en Marcha del Vehículo
            </Typography>
            <Typography sx={{ color: MUTED, fontSize: 14, mt: 0.5 }}>
              Verificación previa al inicio de operaciones · {fechaHoy}
            </Typography>
          </Box>
        </Stack>
        
        {/* Encabezado / Datos generales */}
        <Card sx={{ ...cardSx, borderLeft: `4px solid ${GREEN}`, mb: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Typography sx={{ fontWeight: 800, fontSize: 16, color: TEXT, mb: 0.5 }}>
              Datos del control
            </Typography>
            <Typography sx={{ color: MUTED, fontSize: 13, mb: 2.5 }}>
              Información general del vehículo y tipo de inspección
            </Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" label="Fecha Actual" value={fechaHoy} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" label="Kilómetros" type="number" placeholder="Ej: 125400"
                  value={km} onChange={(e) => setKm(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" select label="Vehículo" value={vehiculo}
                  onChange={(e) => setVehiculo(e.target.value)}>
                  <MenuItem value="">Seleccionar...</MenuItem>
                  <MenuItem value="AAA111">AAA111 - Ford Ranger</MenuItem>
                  <MenuItem value="BBB222">BBB222 - Toyota Hilux</MenuItem>
                  <MenuItem value="CCC333">CCC333 - VW Amarok</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography sx={{ color: MUTED, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", mb: 0.5 }}>
                  Tipo de control
                </Typography>
                <RadioGroup row value={tipoControl} onChange={(e) => setTipoControl(e.target.value)}>
                  <FormControlLabel value="regular" control={<Radio sx={{ color: MUTED, "&.Mui-checked": { color: GREEN } }} />} label={<Typography sx={{ fontSize: 14, color: TEXT }}>Regular</Typography>} />
                  <FormControlLabel value="previaje" control={<Radio sx={{ color: MUTED, "&.Mui-checked": { color: GREEN } }} />} label={<Typography sx={{ fontSize: 14, color: TEXT }}>Previaje</Typography>} />
                </RadioGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/* Secciones en formato Flexbox (más estable que Grid) */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18, color: TEXT, mb: 1.5 }}>
            Checklist de inspección
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: 13, mb: 3 }}>
            Completá cada sección para finalizar la puesta en marcha
          </Typography>
          
          {/* Contenedor Flex para centrar y envolver tarjetas */}
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 2, 
            justifyContent: "center" 
          }}>
            {SECCIONES.map((s) => {
              // Lógica estricta de color: solo toma color si hay opción seleccionada
              const currentColor = secciones[s.key]?.color;
              const iconColor = currentColor ? colorHex(currentColor) : MUTED;
              
              return (
                <Box key={s.key} sx={{ 
                  width: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.3% - 16px)" },
                  maxWidth: 400 
                }}>
                  <Card sx={{ ...cardSx, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                        <Box sx={{ 
                          color: iconColor, 
                          bgcolor: `${iconColor}15`, 
                          p: 1, 
                          borderRadius: 2,
                          display: "flex",         
                          alignItems: "center",    
                          justifyContent: "center",
                          transition: "all 0.3s ease" 
                        }}>
                          {s.icon}
                        </Box>
                        {/* Agregamos alignSelf: 'center' para asegurar que el texto no suba ni baje */}
                        <Typography sx={{ 
                          fontWeight: 700, 
                          color: TEXT, 
                          alignSelf: "center",
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {s.titulo}
                        </Typography>
                      </Stack>

                      {s.subtitulo && (
                        <Typography sx={{ fontSize: 12, color: MUTED, mb: 1.5 }}>{s.subtitulo}</Typography>
                      )}

                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        {s.opciones.map((op) => {
                          const isSelected = secciones[s.key]?.opcion === op.label;
                          const color = colorHex(op.color);
                          return (
                            <Button
                              key={op.label}
                              onClick={() => setSecciones(prev => ({ ...prev, [s.key]: { ...prev[s.key], opcion: op.label, color: op.color } }))}
                              sx={{
                                border: `1px solid ${isSelected ? color : BORDER}`,
                                bgcolor: isSelected ? `${color}20` : "transparent",
                                color: isSelected ? color : TEXT,
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: 12,
                                px: 2,
                                "&:hover": { bgcolor: `${color}10`, border: `1px solid ${color}` }
                              }}
                            >
                              {op.label}
                            </Button>
                          );
                        })}
                      </Stack>

                      <TextField
                        fullWidth 
                        size="small" 
                        multiline 
                        rows={2}
                        placeholder="Observaciones..."
                        value={secciones[s.key]?.obs || ""}
                        onChange={(e) => setSecciones(prev => ({ ...prev, [s.key]: { ...prev[s.key], obs: e.target.value } }))}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, bgcolor: "#f9fafb" }}
                      />
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
                
        {/* Estado general */}
        <Card sx={{
          ...cardSx,
          mt: 3,
          borderLeft: estadoGeneral ? `5px solid ${colorHex(estadoGeneral)}` : `4px solid ${BORDER}`,
          bgcolor: estadoGeneral ? colorHex(estadoGeneral) : "#fff",
          color: estadoGeneral ? "#fff" : TEXT,
          boxShadow: estadoGeneral
            ? `0 8px 30px ${colorHex(estadoGeneral)}40`
            : "0 2px 10px rgba(15, 23, 42, 0.04)",
          transition: "all .35s ease",
        }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{
                width: 44, height: 44, borderRadius: 2,
                bgcolor: estadoGeneral ? "rgba(255,255,255,0.18)" : BG,
                border: estadoGeneral ? "1px solid rgba(255,255,255,0.3)" : `1px solid ${BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <HelpIcon sx={{ color: estadoGeneral ? "#fff" : TEXT }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
                  {estadoGeneral ? textoEstado[estadoGeneral] : "Completá el checklist"}
                </Typography>
                <Typography sx={{ fontSize: 13, opacity: estadoGeneral ? 0.95 : 1, color: estadoGeneral ? "#fff" : MUTED, mt: 0.25 }}>
                  {estadoGeneral
                    ? "Estado general calculado en base a las selecciones."
                    : "Seleccioná una opción en cada sección para conocer el estado general."}
                </Typography>
              </Box>
            </Stack>
            {(estadoGeneral === "yellow" || estadoGeneral === "red") && (
              <>
                <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.4)" }} />
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
       
        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box sx={{ height: 40 }} />
        <Box display="flex" justifyContent="flex-end" mt={10} mb={2}>
          <Button
            onClick={handleEnviar}
            startIcon={<SendIcon />}
            sx={{
              px: 4, py: 1.4,
              fontWeight: 800, textTransform: "none", fontSize: 14,
              color: TEXT, bgcolor: GREEN, borderRadius: 2,
              boxShadow: `0 6px 18px ${GREEN}55`,
              transition: "all .2s ease",
              "&:hover": {
                bgcolor: "#36e028",
                boxShadow: `0 10px 24px ${GREEN}80`,
                transform: "translateY(-1px)",
              },
            }}
          >
            Enviar Puesta en Marcha
          </Button>
        </Box>
      </Box>
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
          Puesta en marcha enviada exitosamente
        </Alert>
      </Snackbar>

    </Box>
  );
}