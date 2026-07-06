import { Chip } from "@mui/material";

export default function EstadoChip({ value }) {
  const map = {
    Operativo: { bg: "#dcfce7", color: "#166534" },
    "En taller": { bg: "#fef3c7", color: "#92400e" },
    Alerta: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[value] || map.Operativo;
  return <Chip label={value} size="small" sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: 11 }} />;
}