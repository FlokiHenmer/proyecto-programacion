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
  { title: "Notificaciones Críticas", value: "5", unit: "requieren acción", icon: <WarningAmberIcon sx={{ color: "#dc2626" }} />, accent: "#dc2626" },
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

export const historialFormularios = [
  { id: "F-2051", fecha: "2026-07-28", operario: "Carlos Pérez", patente: "AB123CD", vehiculo: "Scania R450", km: "124.500", tipo: "Checklist Técnico", trabajo: "Inspección técnica completa", resultado: "Apto", observacion: "Sin novedades relevantes" },
  { id: "F-2050", fecha: "2026-07-25", operario: "Carlos Pérez", patente: "XY789ZT", vehiculo: "Mercedes Actros", km: "288.100", tipo: "Correctivo", trabajo: "Cambio de pastillas de freno", resultado: "Con observaciones", observacion: "Ruido metálico en tren delantero" },
  { id: "F-2049", fecha: "2026-07-22", operario: "Lucía Gómez", patente: "LM456OP", vehiculo: "Iveco Stralis", km: "176.940", tipo: "Preventivo", trabajo: "Service 170k", resultado: "Apto", observacion: "Mantenimiento programado" },
  { id: "F-2048", fecha: "2026-07-19", operario: "Martín Suárez", patente: "RT321QW", vehiculo: "VW Constellation", km: "533.780", tipo: "Checklist Diario", trabajo: "Puesta en marcha diaria", resultado: "No apto", observacion: "Nivel de refrigerante bajo" },
  { id: "F-2047", fecha: "2026-07-15", operario: "Diego Fernández", patente: "JK654HG", vehiculo: "Ford Cargo", km: "98.200", tipo: "Checklist Diario", trabajo: "Puesta en marcha diaria", resultado: "Apto", observacion: "Todo en orden" },
  { id: "F-2046", fecha: "2026-07-12", operario: "Lucía Gómez", patente: "AB123CD", vehiculo: "Scania R450", km: "122.300", tipo: "Correctivo", trabajo: "Reparación sistema eléctrico", resultado: "Con observaciones", observacion: "Falla intermitente en luces traseras" },
  { id: "F-2045", fecha: "2026-07-08", operario: "Sofía Ramírez", patente: "QP987NM", vehiculo: "Renault Kerax", km: "310.050", tipo: "Preventivo", trabajo: "Chapa y pintura", resultado: "Apto", observacion: "Retoque de puerta lateral" },
  { id: "F-2044", fecha: "2026-07-04", operario: "Carlos Pérez", patente: "AB123CD", vehiculo: "Scania R450", km: "119.700", tipo: "Preventivo", trabajo: "Cambio de aceite y filtros", resultado: "Apto", observacion: "Service 120k" },
];

export const resultadoColor = (r) => {
  switch (r) {
    case "Apto":
      return { bg: "#dcfce7", color: "#166534" };
    case "Con observaciones":
      return { bg: "#fef3c7", color: "#92400e" };
    case "No apto":
      return { bg: "#fee2e2", color: "#b91c1c" };
    default:
      return { bg: "#f1f5f9", color: "#475569" };
  }
};

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