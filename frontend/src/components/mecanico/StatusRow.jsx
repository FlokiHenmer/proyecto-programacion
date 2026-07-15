import React from "react";
import { Stack, Typography , Box} from "@mui/material";
import { BORDER } from "../../constants/Mecanico";

export function StatusRow({ icon, label, value }) {
  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      border: `1px solid ${BORDER}`, borderRadius: 2, px: 1.5, py: 1,
    }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{label}</Typography>
      </Stack>
      <Typography sx={{ fontWeight: 800 }}>{value}</Typography>
    </Box>
  );
}