import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";

// USAMOS ÚNICAMENTE LOS ÍCONOS QUE YA TENÍAS INSTALADOS Y FUNCIONANDO
import VerifiedIcon from "@mui/icons-material/Verified";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings"; 
import BuildIcon from "@mui/icons-material/Build"; 
import DiscFullIcon from "@mui/icons-material/DiscFull"; 
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; 
import BoltIcon from "@mui/icons-material/Bolt";
import AdjustIcon from "@mui/icons-material/Adjust"; 
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus"; 
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 

const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const BG = "#f7f8fa";
const CARD = "#ffffff";

const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  px: 3,
  py: 1.2,
  boxShadow: "none",
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
};

const diagnosticBtnStyle = (active, activeColor) => ({
  borderRadius: 4,
  textTransform: "none",
  fontWeight: 600,
  px: 2.5,
  py: 1,
  border: `1px solid ${active ? activeColor : BORDER}`,
  bgcolor: active ? `${activeColor}10` : "transparent",
  color: active ? activeColor : TEXT,
  "&:hover": {
    bgcolor: active ? `${activeColor}20` : "#f1f5f9",
    borderColor: active ? activeColor : MUTED,
  },
});

export default function ChecklistMecanico() {
  const [expanded, setExpanded] = useState("motor");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const [form, setForm] = useState({
    fecha: "2026-06-12",
    km: "",
    vehiculo: "",
  });

  // Estado con todas las variables específicas de cada captura
  const [checklist, setChecklist] = useState({
    motor: {
      nivelAceite: "", estadoAceite: "", perdidasAceite: "",
      nivelRefrigerante: "", estadoRefrigerante: "", obsRefrigerante: "",
      temperaturaTrabajo: "", observaciones: ""
    },
    transmision: {
      embrague: "", cajaCambios: "", perdidas: "", obsPerdidas: "", observaciones: ""
    },
    frenos: {
      pastillasDelanteras: "", desgastePastillas: "", discos: "", obsDiscos: "",
      liquidoNivel: "", liquidoEstado: "", liquidoObs: "",
      frenoTrasero: "", obsFrenoTrasero: "", observaciones: ""
    },
    suspension: {
      amortiguadores: "", obsAmortiguadores: "",
      rotulas: "", obsRotulas: "",
      bujes: "", obsBujes: "",
      extremos: "", obsExtremos: "",
      barra: "", obsBarra: "",
      observaciones: ""
    },
    electrico: {
      bateria: "", obsBateria: "",
      sistemaCarga: "", obsSistemaCarga: "",
      luces: "", obsLuces: "",
      observaciones: ""
    },
    correas: {
      correasAuxiliares: "", obsCorreasAuxiliares: "",
      distribucionObs: "", bombaAguaObs: "", observaciones: ""
    },
    neumaticos: {
      dibujoEstado: "", dibujoMm: "",
      presionEstado: "", presionPsi: "", obsPresion: "",
      observaciones: ""
    },
    diagnostico: {
      resultado: "", accionesRecomendadas: ""
    }
  });

  const handleUpdate = (section, field, value) => {
    setChecklist((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  return (
    <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, bgcolor: BG, fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: TEXT }}>
          Formulario Técnico Periódico
        </Typography>
      </Box>

      {/* Hero + Calidad */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3, mb: 3 }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            minHeight: 140,
            backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%), url('https://images.unsplash.com/photo-1632823471565-1ecdf5c6da77?w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            p: 3,
          }}
        >
          <Box>
            <Typography sx={{ color: GREEN, fontWeight: 700, letterSpacing: 1, fontSize: 12, mb: 0.5 }}>
              MÓDULO DE INSPECCIÓN
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 800 }}>
              Reporte de Estado Operativo
            </Typography>
          </Box>
        </Box>

        <Box sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: 3, p: 2.5, display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
          <VerifiedIcon sx={{ fontSize: 40, color: TEXT }} />
          <Box sx={{ textAlign: "left" }}>
            <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 15 }}>
              Control de Calidad ISO
            </Typography>
            <Typography variant="caption" sx={{ color: MUTED }}>
              Cumplimiento de estándares de seguridad industrial.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Datos generales */}
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

      {/* SECCIONES ACORDEÓN */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        
        {/* ==================== 1. MOTOR ==================== */}
        <Accordion expanded={expanded === "motor"} onChange={(_, isExp) => setExpanded(isExp ? "motor" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <SettingsIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>1. Motor</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Nivel de aceite</Typography>
                <RadioGroup row value={checklist.motor.nivelAceite} onChange={(e) => handleUpdate("motor", "nivelAceite", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="bajo" control={<Radio size="small" />} label="Bajo" />
                  <FormControlLabel value="exceso" control={<Radio size="small" />} label="Exceso" />
                </RadioGroup>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Estado del aceite</Typography>
                <RadioGroup row value={checklist.motor.estadoAceite} onChange={(e) => handleUpdate("motor", "estadoAceite", e.target.value)}>
                  <FormControlLabel value="normal" control={<Radio size="small" />} label="Normal" />
                  <FormControlLabel value="contaminado" control={<Radio size="small" />} label="Contaminado" />
                  <FormControlLabel value="quemado" control={<Radio size="small" />} label="Quemado" />
                </RadioGroup>
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Pérdidas de aceite</Typography>
                <RadioGroup row value={checklist.motor.perdidasAceite} onChange={(e) => handleUpdate("motor", "perdidasAceite", e.target.value)}>
                  <FormControlLabel value="si" control={<Radio size="small" />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Nivel del refrigerante</Typography>
                <RadioGroup row value={checklist.motor.nivelRefrigerante} onChange={(e) => handleUpdate("motor", "nivelRefrigerante", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="bajo" control={<Radio size="small" />} label="Bajo" />
                </RadioGroup>
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Estado del refrigerante</Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, gap: 2, mt: 0.5 }}>
                <RadioGroup row value={checklist.motor.estadoRefrigerante} onChange={(e) => handleUpdate("motor", "estadoRefrigerante", e.target.value)} sx={{ flexShrink: 0 }}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="contaminado" control={<Radio size="small" />} label="Contaminado" />
                  <FormControlLabel value="otro" control={<Radio size="small" />} label="Otro" />
                </RadioGroup>
                <TextField placeholder="Observaciones refrigerante" size="small" fullWidth value={checklist.motor.obsRefrigerante} onChange={(e) => handleUpdate("motor", "obsRefrigerante", e.target.value)} />
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Temperatura de trabajo</Typography>
              <RadioGroup row value={checklist.motor.temperaturaTrabajo} onChange={(e) => handleUpdate("motor", "temperaturaTrabajo", e.target.value)}>
                <FormControlLabel value="normal" control={<Radio size="small" />} label="Normal" />
                <FormControlLabel value="alta" control={<Radio size="small" />} label="Alta" />
              </RadioGroup>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Observaciones</Typography>
              <TextField fullWidth multiline minRows={3} placeholder="Detalles adicionales del motor..." value={checklist.motor.observaciones} onChange={(e) => handleUpdate("motor", "observaciones", e.target.value)} sx={{ mt: 0.5 }} />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* ==================== 2. TRANSMISIÓN ==================== */}
        <Accordion expanded={expanded === "transmision"} onChange={(_, isExp) => setExpanded(isExp ? "transmision" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <BuildIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>2. Transmisión</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Embrague</Typography>
                <RadioGroup row value={checklist.transmision.embrague} onChange={(e) => handleUpdate("transmision", "embrague", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="desgaste" control={<Radio size="small" />} label="Desgaste" />
                </RadioGroup>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Caja de cambios</Typography>
                <RadioGroup row value={checklist.transmision.cajaCambios} onChange={(e) => handleUpdate("transmision", "cajaCambios", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="ruidos" control={<Radio size="small" />} label="Ruidos" />
                  <FormControlLabel value="dura" control={<Radio size="small" />} label="Dura" />
                </RadioGroup>
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Pérdidas</Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, gap: 2, mt: 0.5 }}>
                <RadioGroup row value={checklist.transmision.perdidas} onChange={(e) => handleUpdate("transmision", "perdidas", e.target.value)} sx={{ flexShrink: 0 }}>
                  <FormControlLabel value="si" control={<Radio size="small" />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
                <TextField placeholder="Observaciones pérdidas" size="small" fullWidth value={checklist.transmision.obsPerdidas} onChange={(e) => handleUpdate("transmision", "obsPerdidas", e.target.value)} />
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Observaciones</Typography>
              <TextField fullWidth multiline minRows={3} placeholder="Detalles de transmisión..." value={checklist.transmision.observaciones} onChange={(e) => handleUpdate("transmision", "observaciones", e.target.value)} sx={{ mt: 0.5 }} />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* ==================== 3. SISTEMA DE FRENOS ==================== */}
        <Accordion expanded={expanded === "frenos"} onChange={(_, isExp) => setExpanded(isExp ? "frenos" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <DiscFullIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>3. Sistema de frenos</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, alignItems: "center" }}>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Pastillas delanteras</Typography>
                <RadioGroup row value={checklist.frenos.pastillasDelanteras} onChange={(e) => handleUpdate("frenos", "pastillasDelanteras", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="cambiar" control={<Radio size="small" />} label="Cambiar" />
                </RadioGroup>
              </Box>
              <TextField label="% Desgaste" size="small" type="number" placeholder="0" value={checklist.frenos.desgastePastillas} onChange={(e) => handleUpdate("frenos", "desgastePastillas", e.target.value)} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, gap: 2 }}>
              <Box sx={{ flexShrink: 0 }}>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Discos</Typography>
                <RadioGroup row value={checklist.frenos.discos} onChange={(e) => handleUpdate("frenos", "discos", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="desgaste" control={<Radio size="small" />} label="Desgaste" />
                </RadioGroup>
              </Box>
              <TextField placeholder="Observaciones discos" size="small" fullWidth value={checklist.frenos.obsDiscos} onChange={(e) => handleUpdate("frenos", "obsDiscos", e.target.value)} />
            </Box>
            {/* Contenedor destacado líquido de frenos */}
            <Box sx={{ bgcolor: "#f8fafc", p: 2, borderRadius: 2, border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: TEXT }}>Líquido de frenos</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: MUTED }}>NIVEL</Typography>
                  <RadioGroup row value={checklist.frenos.liquidoNivel} onChange={(e) => handleUpdate("frenos", "liquidoNivel", e.target.value)}>
                    <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                    <FormControlLabel value="bajo" control={<Radio size="small" />} label="Bajo" />
                  </RadioGroup>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: MUTED }}>ESTADO</Typography>
                  <RadioGroup row value={checklist.frenos.liquidoEstado} onChange={(e) => handleUpdate("frenos", "liquidoEstado", e.target.value)}>
                    <FormControlLabel value="ok" control={<Radio size="small" />} label="OK" />
                    <FormControlLabel value="contaminado" control={<Radio size="small" />} label="Contaminado" />
                  </RadioGroup>
                </Box>
              </Box>
              <TextField placeholder="Observaciones líquido" size="small" fullWidth value={checklist.frenos.liquidoObs} onChange={(e) => handleUpdate("frenos", "liquidoObs", e.target.value)} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, gap: 2 }}>
              <Box sx={{ flexShrink: 0 }}>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Freno trasero (Cintas/Tambor)</Typography>
                <RadioGroup row value={checklist.frenos.frenoTrasero} onChange={(e) => handleUpdate("frenos", "frenoTrasero", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="regular" control={<Radio size="small" />} label="Regular" />
                </RadioGroup>
              </Box>
              <TextField placeholder="Observaciones freno trasero" size="small" fullWidth value={checklist.frenos.obsFrenoTrasero} onChange={(e) => handleUpdate("frenos", "obsFrenoTrasero", e.target.value)} />
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Observaciones generales</Typography>
              <TextField fullWidth multiline minRows={2} placeholder="Detalles de frenos..." value={checklist.frenos.observaciones} onChange={(e) => handleUpdate("frenos", "observaciones", e.target.value)} sx={{ mt: 0.5 }} />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* ==================== 4. SUSPENSIÓN Y TREN DELANTERO ==================== */}
        <Accordion expanded={expanded === "suspension"} onChange={(_, isExp) => setExpanded(isExp ? "suspension" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <DirectionsCarIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>4. Suspensión y tren delantero</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Amortiguadores", key: "amortiguadores", obsKey: "obsAmortiguadores" },
              { label: "Rótulas", key: "rotulas", obsKey: "obsRotulas" },
              { label: "Bujes de parrilla", key: "bujes", obsKey: "obsBujes" },
              { label: "Extremos de dirección", key: "extremos", obsKey: "obsExtremos" },
              { label: "Barra estabilizadora", key: "barra", obsKey: "obsBarra" }
            ].map((item) => (
              <Box key={item.key} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" }, gap: 2, alignItems: "center", pb: 1.5, borderBottom: `1px solid #f1f5f9` }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT }}>{item.label}</Typography>
                  <RadioGroup row value={checklist.suspension[item.key]} onChange={(e) => handleUpdate("suspension", item.key, e.target.value)}>
                    <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                    <FormControlLabel value="malo" control={<Radio size="small" />} label="Malo" />
                  </RadioGroup>
                </Box>
                <TextField placeholder={`Observaciones ${item.label.toLowerCase()}`} size="small" fullWidth value={checklist.suspension[item.obsKey]} onChange={(e) => handleUpdate("suspension", item.obsKey, e.target.value)} />
              </Box>
            ))}
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Observaciones generales</Typography>
              <TextField fullWidth multiline minRows={2} placeholder="Detalles generales de suspensión..." value={checklist.suspension.observaciones} onChange={(e) => handleUpdate("suspension", "observaciones", e.target.value)} sx={{ mt: 0.5 }} />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* ==================== 5. SISTEMA ELÉCTRICO ==================== */}
        <Accordion expanded={expanded === "electrico"} onChange={(_, isExp) => setExpanded(isExp ? "electrico" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <BoltIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>5. Sistema eléctrico (Luces/Batería)</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Batería", key: "bateria", obsKey: "obsBateria", opt: ["Bien", "Problema"] },
              { label: "Sistema de carga (Alternador)", key: "sistemaCarga", obsKey: "obsSistemaCarga", opt: ["Bien", "Problema"] },
              { label: "Luces (Altas/Bajas/Stop/Giro)", key: "luces", obsKey: "obsLuces", opt: ["Bien", "Problema"] }
            ].map((item) => (
              <Box key={item.key} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" }, gap: 2, alignItems: "center", pb: 1.5, borderBottom: `1px solid #f1f5f9` }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT }}>{item.label}</Typography>
                  <RadioGroup row value={checklist.electrico[item.key]} onChange={(e) => handleUpdate("electrico", item.key, e.target.value)}>
                    <FormControlLabel value="bien" control={<Radio size="small" />} label={item.opt[0]} />
                    <FormControlLabel value="problema" control={<Radio size="small" />} label={item.opt[1]} />
                  </RadioGroup>
                </Box>
                <TextField placeholder="Observaciones" size="small" fullWidth value={checklist.electrico[item.obsKey]} onChange={(e) => handleUpdate("electrico", item.obsKey, e.target.value)} />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* ==================== 6. CORREAS Y DISTRIBUCIÓN ==================== */}
        <Accordion expanded={expanded === "correas"} onChange={(_, isExp) => setExpanded(isExp ? "correas" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <DirectionsBusIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>6. Correas y distribución</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" }, gap: 2, alignItems: "center" }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT }}>Correas auxiliares</Typography>
                <RadioGroup row value={checklist.correas.correasAuxiliares} onChange={(e) => handleUpdate("correas", "correasAuxiliares", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="cambiar" control={<Radio size="small" />} label="Cambiar" />
                </RadioGroup>
              </Box>
              <TextField placeholder="Observaciones correas auxiliares" size="small" fullWidth value={checklist.correas.obsCorreasAuxiliares} onChange={(e) => handleUpdate("correas", "obsCorreasAuxiliares", e.target.value)} />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
              <TextField label="Distribución" placeholder="Kms o estado de cadena/correa..." size="small" fullWidth value={checklist.correas.distribucionObs} onChange={(e) => handleUpdate("correas", "distribucionObs", e.target.value)} />
              <TextField label="Bomba de agua" placeholder="Estado / Pérdidas..." size="small" fullWidth value={checklist.correas.bombaAguaObs} onChange={(e) => handleUpdate("correas", "bombaAguaObs", e.target.value)} />
            </Box>
            <TextField label="Observaciones generales" fullWidth multiline minRows={2} placeholder="Comentarios extras..." value={checklist.correas.observaciones} onChange={(e) => handleUpdate("correas", "observaciones", e.target.value)} />
          </AccordionDetails>
        </Accordion>

        {/* ==================== 7. NEUMÁTICOS ==================== */}
        <Accordion expanded={expanded === "neumaticos"} onChange={(_, isExp) => setExpanded(isExp ? "neumaticos" : false)} disableGutters elevation={0} sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderRadius: "12px !important", overflow: "hidden" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5 } }}>
            <AdjustIcon sx={{ color: TEXT }} />
            <Typography sx={{ fontWeight: 700, color: TEXT }}>7. Neumáticos</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, alignItems: "center" }}>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700 }}>PROFUNDIDAD DEL DIBUJO</Typography>
                <RadioGroup row value={checklist.neumaticos.dibujoEstado} onChange={(e) => handleUpdate("neumaticos", "dibujoEstado", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="limite" control={<Radio size="small" />} label="Límite" />
                </RadioGroup>
              </Box>
              <Box>
                <TextField label="Profundidad (mm)" type="number" size="small" fullWidth value={checklist.neumaticos.dibujoMm} onChange={(e) => handleUpdate("neumaticos", "dibujoMm", e.target.value)} />
                <Typography variant="caption" sx={{ color: "#ef4444", display: "block", mt: 0.5 }}>* mm obligatorio</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, alignItems: "center" }}>
              <Box>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700 }}>PRESIÓN</Typography>
                <RadioGroup row value={checklist.neumaticos.presionEstado} onChange={(e) => handleUpdate("neumaticos", "presionEstado", e.target.value)}>
                  <FormControlLabel value="bien" control={<Radio size="small" />} label="Bien" />
                  <FormControlLabel value="baja" control={<Radio size="small" />} label="Baja" />
                </RadioGroup>
              </Box>
              <TextField label="Presión (PSI)" type="number" size="small" placeholder="eg. 32" value={checklist.neumaticos.presionPsi} onChange={(e) => handleUpdate("neumaticos", "presionPsi", e.target.value)} />
            </Box>
            <TextField label="Observaciones neumáticos" size="small" fullWidth value={checklist.neumaticos.obsPresion} onChange={(e) => handleUpdate("neumaticos", "obsPresion", e.target.value)} />
          </AccordionDetails>
        </Accordion>

      </Box>

      {/* ==================== DIAGNÓSTICO GENERAL Y CIERRE ==================== */}
      <Box sx={{ bgcolor: CARD, border: `1px solid ${BORDER}`, borderLeft: `5px solid ${GREEN_DARK}`, borderRadius: 3, p: 3, mb: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 16 }}>
          Diagnóstico general
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Button variant="text" sx={diagnosticBtnStyle(checklist.diagnostico.resultado === "optimo", "#22cc15")} onClick={() => handleUpdate("diagnostico", "resultado", "optimo")}>
            Óptimo
          </Button>
          <Button variant="text" sx={diagnosticBtnStyle(checklist.diagnostico.resultado === "mantenimiento", "#f59e0b")} onClick={() => handleUpdate("diagnostico", "resultado", "mantenimiento")}>
            Requiere mantenimiento
          </Button>
          <Button variant="text" sx={diagnosticBtnStyle(checklist.diagnostico.resultado === "reparacion", "#ef4444")} onClick={() => handleUpdate("diagnostico", "resultado", "reparacion")}>
            Requiere reparación
          </Button>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: MUTED, fontWeight: 700, textTransform: "uppercase" }}>Acciones recomendadas</Typography>
          <TextField fullWidth multiline minRows={3} placeholder="Describa los pasos a seguir..." value={checklist.diagnostico.accionesRecomendadas} onChange={(e) => handleUpdate("diagnostico", "accionesRecomendadas", e.target.value)} sx={{ mt: 0.5 }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button sx={greenBtn} startIcon={<CheckCircleIcon />} onClick={() => setOpenSnackbar(true)}>
            Guardar informe técnico
          </Button>
        </Box>
      </Box>

      {/* Alerta de éxito */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: "100%", bgcolor: "#0f172a", color: "#fff", fontWeight: 600 }}>
          Inspección guardada exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}