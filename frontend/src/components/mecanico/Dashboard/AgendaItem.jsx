import React from "react";
import { Box, Typography } from "@mui/material";
import { MUTED } from "../../../constants/Mecanico";

export default function AgendaItem({ time, text, color }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, borderLeft: `3px solid ${color}`, pl: 1.5, py: 0.5 }}>
       <Typography sx={{ fontSize: 12, fontWeight: 700, color: MUTED, minWidth: 56 }}>{time}</Typography>
       <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{text}</Typography>
    </Box>
  );
}