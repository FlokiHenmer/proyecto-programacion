import { useMemo, useState } from "react";
import { Box, Button, Alert, Snackbar, Stack, Typography } from "@mui/material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import SendIcon from "@mui/icons-material/Send";

import Navbar from "../../components/layout/Navbar";
import ScrollToTop from "../../components/layout/ScrollToTop";
import ChecklistCard from "../../components/operario/ChecklistCard";
import StatusSummary from "../../components/operario/BotonEstado";
import { SECCIONES, VERDE, TEXT, MUTED, BG, BORDER, cardSx, colorHex } from "../../constants/Operario";
import BotonEstado from "../../components/operario/BotonEstado";
import DatosControl from "../../components/operario/DatosControl";
import Estado from "../../components/operario/EstadoGeneral";

export default function PuestaEnMarcha() {
  const [km, setKm] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [tipoControl, setTipoControl] = useState("regular");
  const [secciones, setSecciones] = useState({});
  const [informadoA, setInformadoA] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fechaHoy = useMemo(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  }, []);

  // Estado general calculado en base a las selecciones
  const estadoGeneral = useMemo(() => {
    const colores = SECCIONES.map(s => secciones[s.key]?.color).filter(Boolean);
    if (colores.length < SECCIONES.length) return null;
    if (colores.includes("red")) return "red";
    if (colores.includes("yellow")) return "yellow";
    return "green";
  }, [secciones]);

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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f3ff" }}>
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
        <DatosControl
          fechaHoy={fechaHoy}
          km={km}
          setKm={setKm}
          vehiculo={vehiculo}
          setVehiculo={setVehiculo}
          tipoControl={tipoControl}
          setTipoControl={setTipoControl}
        />
        
         {/* Secciones */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18, color: TEXT, mb: 1.5 }}>
            Checklist de inspección
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: 13, mb: 3 }}>
            Completá cada sección para finalizar la puesta en marcha
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {SECCIONES.map((s) => (
              <ChecklistCard key={s.key} section={s} data={secciones[s.key]} onChange={(val) => setSecciones(prev => ({ ...prev, [s.key]: val }))} />
            ))}
          </Box>
        </Box>
        

        {/* Estado general */}
        <Estado
          estadoGeneral={estadoGeneral}
          informadoA={informadoA}
          setInformadoA={setInformadoA}
        />
        
        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}
        
        
        {/* Botón Enviar */}
        <Box sx={{ height: 40 }} />
        <Box display="flex" justifyContent="flex-end" mt={10} mb={2}>
           <Button onClick={handleEnviar} startIcon={<SendIcon />} sx={{ px: 4, py: 1.4, fontWeight: 800, textTransform: "none", fontSize: 14, color: TEXT, bgcolor: VERDE, borderRadius: 2 }}>
             Enviar Puesta en Marcha
           </Button>
        </Box>
      </Box>
      
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%", bgcolor: "#0f172a", color: "#fff" }}>Puesta en marcha enviada exitosamente</Alert>
      </Snackbar>

      {/* Botón flotante */}
      <ScrollToTop />

    </Box>
  );
}