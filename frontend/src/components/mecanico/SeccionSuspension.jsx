import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { BORDER, CARD, MUTED, TEXT } from "../../constants/FormularioMecanico";

export default function SeccionSuspension({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}