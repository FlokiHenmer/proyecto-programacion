import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BuildIcon from "@mui/icons-material/Build";
import { BORDER, CARD, MUTED, TEXT } from "../../../constants/FormularioMecanico";

export default function SeccionTransmision({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}