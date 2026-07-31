export const GREEN = "#44FF34";
export const GREEN_DARK = "#22cc15";
export const GREEN_SOFT = "#e8ffe4";
export const GREEN_TEXT = "#166534";
export const BORDER = "#e5e7eb";
export const TEXT = "#0f172a";
export const MUTED = "#64748b";
export const PANEL_BG = "#f8fafc";
export const BLUE = "#0ea5e9";

export const SIDEBAR_WIDTH = 240;

export const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)",
};

export const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  boxShadow: "none",
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "0 6px 16px rgba(68,255,52,0.35)" },
};

export const blackBtn = {
  bgcolor: "#0b0b0b",
  color: "#fff",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  "&:hover": { bgcolor: "#222" },
};

// Datos del Inicio
export const historialData = [
  { patente: "ABC-123", modelo: "Toyota Hilux", fecha: "12/10/2023", servicio: "Cambio de Aceite" },
  { patente: "XYZ-789", modelo: "Ford Ranger", fecha: "11/10/2023", servicio: "Frenos" },
  { patente: "DEF-456", modelo: "VW Amarok", fecha: "10/10/2023", servicio: "Suspensión" },
  { patente: "GHI-012", modelo: "Mercedes Sprinter", fecha: "09/10/2023", servicio: "Alineación" },
  { patente: "JKL-345", modelo: "Iveco Daily", fecha: "08/10/2023", servicio: "Motor" },
];

export const trabajosData = [
  { v: "Toyota Hilux (ABC-123)", d: "Hoy", desc: "Revisión de niveles y presión de neumáticos." },
  { v: "Ford Ranger (XYZ-789)", d: "Ayer", desc: "Cambio de filtros de aire y combustible." },
  { v: "VW Amarok (DEF-456)", d: "09 Oct", desc: "Ajuste de correas y revisión general." },
];

export const DATA_SEMANA = [
  { label: "Lun", value: 4 },
  { label: "Mar", value: 7 },
  { label: "Mié", value: 5 },
  { label: "Jue", value: 9 },
  { label: "Vie", value: 6 },
  { label: "Sáb", value: 3 },
  { label: "Dom", value: 1 },
];

export const DATA_MES = [
  { label: "Ene", value: 18 },
  { label: "Feb", value: 24 },
  { label: "Mar", value: 15 },
  { label: "Abr", value: 31 },
  { label: "May", value: 27 },
  { label: "Jun", value: 36 },
  { label: "Jul", value: 29 },
  { label: "Ago", value: 41 },
  { label: "Sep", value: 26 },
  { label: "Oct", value: 34 },
  { label: "Nov", value: 22 },
  { label: "Dic", value: 17 },
];

// Datos Historial
export const historialCompleto = [
  { id: 1, patente: "ABC-123", vehiculo: "Toyota Hilux", fecha: "12/10/2023", servicio: "Cambio de Aceite", mecanico: "Ricardo Gómez" },
  { id: 2, patente: "XYZ-789", vehiculo: "Ford Ranger", fecha: "11/10/2023", servicio: "Frenos Delanteros", mecanico: "Ricardo Gómez" },
  { id: 3, patente: "DEF-456", vehiculo: "VW Amarok", fecha: "10/10/2023", servicio: "Suspensión y Alineación", mecanico: "Ricardo Gómez" },
  { id: 4, patente: "GHI-012", vehiculo: "Mercedes Sprinter", fecha: "09/10/2023", servicio: "Alineación Completa", mecanico: "Ricardo Gómez" },
  { id: 5, patente: "JKL-345", vehiculo: "Iveco Daily", fecha: "08/10/2023", servicio: "Ajuste General de Motor", mecanico: "Ricardo Gómez" },
  { id: 6, patente: "MNO-789", vehiculo: "Fiat Fiorino", fecha: "05/10/2023", servicio: "Cambio de Bujías", mecanico: "Ricardo Gómez" },
];

//Datos Registro de Trabajos
export const repuestosIniciales = [
  { nombre: "Filtro de Aceite", cantidad: "1", obs: "" },
  { nombre: "Aceite Sintético 5W30", cantidad: "5L", obs: "Bidón de 5 litros" },
];