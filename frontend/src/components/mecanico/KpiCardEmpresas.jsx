import { Box, Typography, Card, CardContent } from "@mui/material";
import { BORDER, TEXT, MUTED } from "../../constants/EmpresasMecanico";

export default function KpiCard({ title, value, unit, accent, icon }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        border: `1px solid ${BORDER}`,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <CardContent sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2, "&:last-child": { pb: 2.5 } }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "#f1f5f9",
            color: TEXT,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: MUTED, fontWeight: 700, letterSpacing: 0.6 }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 26, color: TEXT, lineHeight: 1.1 }}>
              {value}
            </Typography>
            <Typography sx={{ color: MUTED, fontWeight: 600, fontSize: 13 }}>
              {unit}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
