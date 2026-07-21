import React from "react";
import { Chip } from "@mui/material";

export function CriticidadChip({ value }) {
  const map = {
    Crítica: { bg: "#fee2e2", color: "#b91c1c" },
    Media: { bg: "#fef3c7", color: "#92400e" },
    Baja: { bg: "#dcfce7", color: "#166534" },
  };
  
  const s = map[value] || map.Media;
  return (
    <Chip 
      label={value} 
      size="small" 
      sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: 11 }} 
    />
  );
}

export function EstadoColor({estado}) {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Activa": return { bg: "#fee2e2", color: "#b91c1c" };
      case "En revisión": return { bg: "#fef3c7", color: "#b45309" };
      case "Resuelta": return { bg: "#dcfce7", color: "#15803d" };
      default: return { bg: "#f1f5f9", color: "#475569" };
    }
  };
  const s = getEstadoColor(estado);
  return (
    <Chip 
      label={estado} 
      size="small" 
      sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: 13, borderRadius: 1.5 }} 
    />
  );  
}