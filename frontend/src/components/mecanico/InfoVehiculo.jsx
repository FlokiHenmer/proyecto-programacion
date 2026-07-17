import { Box, Typography, Chip, Card, CardContent } from "@mui/material";
import { BORDER, GREEN, GREEN_SOFT, GREEN_TEXT, MUTED, TEXT, cardSx } from "../../constants/Mecanico";

export default function InfoVehiculo() {
  return (
    <Card sx={{ ...cardSx, borderLeft: `5px solid ${GREEN}` }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 12, letterSpacing: 1, mb: 2, color: MUTED }}>
          INFORMACIÓN EN TIEMPO REAL
        </Typography>
        <Box
          sx={{
            height: 140,
            borderRadius: 2,
            mb: 2,
            backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {[
          ["Modelo", "Toyota Hilux 2023"],
          ["Placa / Patente", "ABC-123"],
          ["Último Servicio", "12/05/2023"],
        ].map(([k, v]) => (
          <Box key={k} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: `1px solid ${BORDER}` }}>
            <Typography sx={{ color: MUTED, fontSize: 13 }}>{k}</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: TEXT }}>{v}</Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1.5 }}>
          <Typography sx={{ color: MUTED, fontSize: 13 }}>Estado</Typography>
          <Chip label="ÓPTIMO" size="small" sx={{ bgcolor: GREEN_SOFT, color: GREEN_TEXT, fontWeight: 700, fontSize: 11 }} />
        </Box>
      </CardContent>
    </Card>
  );
}