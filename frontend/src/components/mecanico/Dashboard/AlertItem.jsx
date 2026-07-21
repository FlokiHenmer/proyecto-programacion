import { Box, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { BORDER, TEXT, MUTED } from "../../../constants/Mecanico";

export default function AlertItem({ severity, title, sub, status, statusColor }) {
  return (
    <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: 2, p: 1.5 }}>

      <Stack direction="row" spacing={1} alignItems="flex-start">
        {severity === "urgent" && <ErrorIcon sx={{ color: "#dc2626", fontSize: 20 }} />}
       
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: severity === "urgent" ? "#dc2626" : TEXT }}>
            {title}
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: 12 }}>{sub}</Typography>
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 800, color: statusColor }}>{status}</Typography>
      </Stack>

    </Box>
  );
}