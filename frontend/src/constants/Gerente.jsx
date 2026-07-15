import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpeedIcon from "@mui/icons-material/Speed";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export const COLORS = {
  GREEN: "#44FF34",
  BORDER: "#e5e7eb",
  TEXT: "#0f172a",
  MUTED: "#64748b",
  BG: "#f8fafc",
  RED: "#dc2626",
  YELLOW: "#fef3c7",
  YELLOW_TEXT: "#92400e",
  RED_BG: "#fee2e2"
};

export const cardSx = { 
  borderRadius: 3, 
  border: `1px solid ${COLORS.BORDER}`, 
  boxShadow: "none", 
  bgcolor: "#fff" 
};

export const EXTRA_COLORS = {
  BLUE: "#0ea5e9",
  RED: "#dc2626",
  YELLOW: "#f59e0b",
  GRAY: "#94a3b8"
};

export const buttonStyles = {
  greenBtn: { bgcolor: "#44FF34", color: "#0f172a", fontWeight: 800, textTransform: "none", borderRadius: 2, px: 2, "&:hover": { bgcolor: "#36e028" } },
  blueBtn: { bgcolor: "#4e9cef", color: "#fff", fontWeight: 800, textTransform: "none", borderRadius: 2, px: 2, "&:hover": { bgcolor: "#3088e7" } }
};

// --- DATOS DEL GERENTE ---
export const kpis = [
  { title: "Total Vehículos Activos", value: "128", unit: "unidades", icon: <DirectionsCarIcon />, accent: COLORS.GREEN },
  { title: "Costos Mantenimiento", value: "$ 1.2M", unit: "ARS / mes", icon: <AttachMoneyIcon />, accent: "#f59e0b" },
  { title: "Productividad Taller", value: "87%", unit: "eficiencia", icon: <SpeedIcon />, accent: "#22c55e" },
  { title: "Alertas Críticas", value: "5", unit: "requieren acción", icon: <WarningAmberIcon sx={{ color: "#dc2626" }} />, accent: "#dc2626" },
];

export const serviciosPorMes = [
  { mes: "Ene", value: 32 }, { mes: "Feb", value: 41 }, { mes: "Mar", value: 28 }, { mes: "Abr", value: 55 },
  { mes: "May", value: 47 }, { mes: "Jun", value: 63 }, { mes: "Jul", value: 58 }, { mes: "Ago", value: 72 },
  { mes: "Sep", value: 49 }, { mes: "Oct", value: 66 }, { mes: "Nov", value: 54 }, { mes: "Dic", value: 38 },
];

export const mantenimientosPendientes = [
  { vehiculo: "Scania R450 (AB123CD)", tipo: "Service 100k", prioridad: "Alta" },
  { vehiculo: "Mercedes Actros (XY789ZT)", tipo: "Frenos", prioridad: "Media" },
  { vehiculo: "Iveco Stralis (LM456OP)", tipo: "Cambio Aceite", prioridad: "Alta" },
];