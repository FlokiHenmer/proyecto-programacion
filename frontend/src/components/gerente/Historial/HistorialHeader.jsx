import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { BORDER, TEXT } from "../../../constants/HistorialGerente";

export default function HistorialHeader() {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
      <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "#fff", border: `1px solid ${BORDER}`, color: TEXT, display: "flex" }}>
        <HistoryIcon />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
           Consulta cuestionarios y servicios finalizados de toda la flota 
        </Typography>
      </Box>
    </Stack>
  );
}