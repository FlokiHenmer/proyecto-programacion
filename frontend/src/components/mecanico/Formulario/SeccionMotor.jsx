import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { BORDER, CARD, MUTED, TEXT } from "../../../constants/FormularioMecanico";

export default function SeccionMotor({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}