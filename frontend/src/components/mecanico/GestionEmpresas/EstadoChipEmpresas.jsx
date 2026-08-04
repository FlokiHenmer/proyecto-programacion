import { Chip } from "@mui/material";
import { GREEN_SOFT, GREEN_TEXT, YELLOW, YELLOW_TEXT, RED_BG, RED, TEXT } from "../../../constants/EmpresasMecanico";

export default function EstadoChip({ estado }) {
  const map = {
    // Estados de Empresas
    activa: { bg: GREEN_SOFT, color: GREEN_TEXT },
    "en revisión": { bg: YELLOW, color: YELLOW_TEXT },
    inactiva: { bg: RED_BG, color: RED },

    // Estados de Gerentes y Operarios
    activo: { bg: GREEN_SOFT, color: GREEN_TEXT },
    inactivo: { bg: RED_BG, color: RED },
    suspendido: { bg: YELLOW, color: YELLOW_TEXT },

    // Estados de Vehículos
    "en taller": { bg: YELLOW, color: YELLOW_TEXT },
    "dado de baja": { bg: RED_BG, color: RED },
    baja: { bg: RED_BG, color: RED },
  };

  const estadoKey = typeof estado === "string" ? estado.toLowerCase().trim() : "";
  const s = map[estadoKey] || { bg: "#f1f5f9", color: TEXT };
  
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