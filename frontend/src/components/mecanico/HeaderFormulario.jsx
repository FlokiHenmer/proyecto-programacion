import { Box, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { BORDER, CARD, GREEN, MUTED, TEXT } from "../../constants/FormularioMecanico";

export default function HeaderHero() {
  return (
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
  );
}