import { Card, CardContent, Typography, Box } from "@mui/material";
import { cardSx, COLORS } from "../../constants/Gerente";

export default function KpiCard({ title, value, unit, icon, accent }) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${accent}` }}>    
      <CardContent sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "#f1f5f9", color: accent }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ color: COLORS.MUTED, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 800, mt: 0.2 }}>{value}</Typography>
          <Typography sx={{ color: COLORS.MUTED, fontSize: 12 }}>{unit}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}