import React from "react";
import { Chip } from "@mui/material";
import { tipoColor } from "../../constants/HistorialGerente";

export default function TipoChip({ tipo }) {
  const c = tipoColor(tipo);
  return (
    <Chip
      size="small"
      label={tipo}
      sx={{ bgcolor: c.bg, color: c.color, fontWeight: 700, borderRadius: 1.5 }}
    />
  );
}
