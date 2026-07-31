import { Chip } from "@mui/material";
import { GREEN_SOFT, GREEN_TEXT, YELLOW, YELLOW_TEXT, RED_BG, RED, TEXT } from "../../../constants/EmpresasMecanico";

export default function EstadoChip({ estado }) {
  const map = {
    // Estados de Empresas
    Activa: { bg: GREEN_SOFT, color: GREEN_TEXT },
    "En Revisión": { bg: YELLOW, color: YELLOW_TEXT },
    Inactiva: { bg: RED_BG, color: RED },

    // Estados de Gerentes y Operarios
    Activo: { bg: GREEN_SOFT, color: GREEN_TEXT },
    Inactivo: { bg: RED_BG, color: RED },

    // Estados de Vehículos
    "En Taller": { bg: YELLOW, color: YELLOW_TEXT },
  };

  const s = map[estado] || { bg: "#f1f5f9", color: TEXT };
  
  return (
    <Chip
      label={estado}
      size="small"
      sx={{
        bgcolor: s.bg,
        color: s.color,
        fontWeight: 700,
        borderRadius: 2,
        px: 0.5,
      }}
    />
  );
}