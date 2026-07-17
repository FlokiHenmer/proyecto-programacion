import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DiscFullIcon from "@mui/icons-material/DiscFull";
import { BORDER, CARD, MUTED, TEXT } from "../../constants/FormularioMecanico";

export default function SeccionFrenos({ expanded, setExpanded, checklist, handleUpdate }) {
  return (
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
  );
}
