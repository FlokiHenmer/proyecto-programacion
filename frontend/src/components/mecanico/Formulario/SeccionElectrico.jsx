import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoltIcon from "@mui/icons-material/Bolt";
import { BORDER, CARD, TEXT } from "../../../constants/FormularioMecanico";

export default function SeccionElectrico({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}