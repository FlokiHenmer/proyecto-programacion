import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { BORDER, CARD, TEXT } from "../../../constants/FormularioMecanico";

export default function SeccionCorreas({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}