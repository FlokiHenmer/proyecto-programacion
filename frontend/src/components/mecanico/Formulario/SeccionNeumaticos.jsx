import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AdjustIcon from "@mui/icons-material/Adjust";
import { BORDER, CARD, MUTED, TEXT } from "../../../constants/FormularioMecanico";

export default function SeccionNeumaticos({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}
