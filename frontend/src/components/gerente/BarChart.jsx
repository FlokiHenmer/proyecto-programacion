import { Box , Typography } from "@mui/material";
import { COLORS , cardSx } from "../../constants/Gerente";

export default function BarChart({ data }) {

  const max = Math.max(...data.map(d => d.value));
  return (
    <Box sx={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: { xs: 1, md: 2 }, height: 160, mt: 3, px: 1, minWidth: 400 }}>
        {data.map(d => (
          <Box key={d.mes} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
            <Box sx={{ 
              width: "100%", maxWidth: 28, 
              height: `${Math.max((d.value / max) * 100, 10)}%`, 
              bgcolor: "#569cf1f1", 
              borderRadius: "4px 4px 0 0" 
            }} />
            <Typography sx={{ fontSize: 10, mt: 1, color: COLORS.MUTED, fontWeight: 600 }}>{d.mes}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
