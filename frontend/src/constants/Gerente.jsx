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

// Datos Gestion Empresa
export const operariosIniciales = [
  { nombre: "Carlos Pérez", rol: "Mecánico Senior", email: "carlos@empresa.com", estado: "activo" },
  { nombre: "Lucía Gómez", rol: "Mecánica", email: "lucia@empresa.com", estado: "activo" },
  { nombre: "Martín Suárez", rol: "Electricista", email: "martin@empresa.com", estado: "activo" },
  { nombre: "Sofía Ramírez", rol: "Chapista", email: "sofia@empresa.com", estado: "inactivo" },
  { nombre: "Diego Fernández", rol: "Mecánico", email: "diego@empresa.com", estado: "activo" },
];
export const vehiculosIniciales = [
  { patente: "AB123CD", modelo: "Scania R450", revision: "10/06/2026", estado: "Operativo" },
  { patente: "XY789ZT", modelo: "Mercedes Actros", revision: "02/06/2026", estado: "En taller" },
  { patente: "LM456OP", modelo: "Iveco Stralis", revision: "28/05/2026", estado: "Operativo" },
  { patente: "RT321QW", modelo: "VW Constellation", revision: "15/05/2026", estado: "Alerta" },
  { patente: "JK654HG", modelo: "Ford Cargo", revision: "20/06/2026", estado: "Operativo" },
  { patente: "QP987NM", modelo: "Renault Kerax", revision: "01/06/2026", estado: "Alerta" },
];

// Datos grafico
export const defaultSemana = [
  { label: "Lun", value: 14 },
  { label: "Mar", value: 25 },
  { label: "Mié", value: 19 },
  { label: "Jue", value: 32 },
  { label: "Vie", value: 28 },
  { label: "Sáb", value: 21 },
  { label: "Dom", value: 10 },
];

export const defaultMes = [
  { label: "Ene", value: 110 },
  { label: "Feb", value: 135 },
  { label: "Mar", value: 125 },
  { label: "Abr", value: 155 },
  { label: "May", value: 180 },
  { label: "Jun", value: 165 },
];