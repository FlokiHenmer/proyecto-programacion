export const GREEN = "#44FF34";
export const BORDER = "#e5e7eb";
export const TEXT = "#0f172a";
export const MUTED = "#64748b";
export const YELLOW = "#fde68a";
export const RED_BG = "#fee2e2";
export const RED = "#dc2626";

// Nombres de los meses para el estado dinámico
export const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Eventos enriquecidos con más datos (Título, Vehículo, Hora, Nota/Tipo y Estado)
export const eventsData = {
  "2026-6": {
    1:  { title: "Revisión periódica", vehiculo: "Ford F-150 Lariat (AE-456-BB)", hora: "09:00", note: "Revisión", status: "pendiente" },
    2:  { title: "Cambio de correa",   vehiculo: "Toyota Hilux SRX (BC-789-CC)",   hora: "10:30", note: "Motor",      status: "confirmado" },
    3:  { title: "Reparación urgente",  vehiculo: "Iveco Daily 55C17 (AF-123-ZZ)",  hora: "08:00", note: "Frenos",     status: "urgente" },
    9:  { title: "Cambio de aceite",    vehiculo: "Renault Kangoo (AA-111-AA)",     hora: "11:00", note: "Mantenimiento", status: "confirmado" },
    15: { title: "Alineación y balanceo",vehiculo: "Scania R450 (AC-999-XX)",      hora: "14:30", note: "Eje",        status: "urgente" },
    21: { title: "Inspección técnica",  vehiculo: "VW Amarok (AB-123-CD)",        hora: "10:00", note: "Inspección", status: "pendiente" },
  }
};

export const turnos = [
  { veh: "Ford F-150 Lariat",   pat: "AE-456-BB", fh: "15/10 - 09:00", estado: "pendiente",  obs: "Revisión periódica 20k km" },
  { veh: "Toyota Hilux SRX",    pat: "BC-789-CC", fh: "16/10 - 10:30", estado: "confirmado", obs: "Cambio de correa de distribución" },
  { veh: "Iveco Daily 55C17",   pat: "AF-123-ZZ", fh: "17/10 - 08:00", estado: "urgente",    obs: "Falla neumática eje trasero" },
];

export const statusColors = {
  pendiente:  { bg: YELLOW,  fg: "#92400e", label: "PENDIENTE" },
  confirmado: { bg: GREEN,   fg: "#06210a", label: "CONFIRMADO" },
  urgente:    { bg: RED_BG,  fg: RED,       label: "URGENTE" },
};

export const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff",
};

// Función modificada para forzar el inicio en Lunes 
export const getDaysInMonthGrid = (month, year) => {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const grid = [];

  for (let i = 0; i < startOffset; i++) {
    grid.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    grid.push(day);
  }
  return grid;
};
