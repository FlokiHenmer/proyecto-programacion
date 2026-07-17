import { Box, Typography, Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BORDER, CARD, GREEN_DARK, MUTED, TEXT, diagnosticBtnStyle, greenBtn } from "../../constants/FormularioMecanico";

export default function DiagnosticoGeneral({ checklist, handleUpdate, setOpenSnackbar }) {
  return (
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
  );
}