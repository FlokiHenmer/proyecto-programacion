export const GREEN = "#44FF34";
export const BORDER = "#e5e7eb";
export const TEXT = "#334155";
export const MUTED = "#64748b";
export const BG = "#f8fafc";

export const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff",
};

export const TIPOS = ["Todos", "Preventivo", "Correctivo", "Predictivo", "Inspección"];
export const tipoColor = (t) => {
  switch (t) {
    case "Preventivo":
      return { bg: "#dcfce7", color: "#166534" };
    case "Correctivo":
      return { bg: "#fee2e2", color: "#b91c1c" };
    case "Predictivo":
      return { bg: "#dbeafe", color: "#1d4ed8" };
    case "Inspección":
      return { bg: "#fef3c7", color: "#a16207" };
    default:
      return { bg: "#f1f5f9", color: MUTED };
  }
};

export const MOCK = [
  { id: "T-1042", fecha: "12/10/2025", vehiculo: "Scania R450", patente: "ABC-123", km: 152300, tipo: "Preventivo", operario: "Juan Pérez", resultado: "ok", trabajo: "Cambio de aceite y filtros", observaciones: "Servicio realizado según protocolo. Checklist completo y firmado." },
  { id: "T-1041", fecha: "10/10/2025", vehiculo: "Mercedes Actros", patente: "DEF-456", km: 98750, tipo: "Correctivo", operario: "Luis Gómez", resultado: "warn", trabajo: "Reparación sistema de frenos", observaciones: "Pastillas traseras al límite, se recomienda recambio en 5.000 km." },
  { id: "T-1040", fecha: "05/10/2025", vehiculo: "Iveco Stralis", patente: "GHI-789", km: 210400, tipo: "Inspección", operario: "Carla Ruiz", resultado: "ok", trabajo: "Inspección técnica general", observaciones: "Sin observaciones relevantes." },
  { id: "T-1039", fecha: "01/10/2025", vehiculo: "VW Constellation", patente: "JKL-012", km: 64200, tipo: "Predictivo", operario: "Martín Díaz", resultado: "ok", trabajo: "Análisis de vibraciones en tren delantero", observaciones: "Valores dentro de rango." },
  { id: "T-1038", fecha: "27/09/2025", vehiculo: "Ford Cargo", patente: "MNO-345", km: 133900, tipo: "Correctivo", operario: "Ana Torres", resultado: "warn", trabajo: "Reemplazo de correa de distribución", observaciones: "Se detectó pérdida leve de refrigerante." },
  { id: "T-1037", fecha: "22/09/2025", vehiculo: "Scania G410", patente: "PQR-678", km: 77500, tipo: "Preventivo", operario: "Juan Pérez", resultado: "ok", trabajo: "Puesta en marcha y control de niveles", observaciones: "Vehículo apto para circular." },
  { id: "T-1036", fecha: "18/09/2025", vehiculo: "Scania R450", patente: "ABC-123", km: 149800, tipo: "Inspección", operario: "Carla Ruiz", resultado: "ok", trabajo: "Formulario de puesta en marcha", observaciones: "Checklist completo sin fallas." },
  { id: "T-1035", fecha: "09/09/2025", vehiculo: "Mercedes Actros", patente: "DEF-456", km: 95100, tipo: "Preventivo", operario: "Ana Torres", resultado: "ok", trabajo: "Rotación y control de neumáticos", observaciones: "Presiones ajustadas." },
  { id: "T-1034", fecha: "02/09/2025", vehiculo: "Scania R450", patente: "ABC-123", km: 146200, tipo: "Correctivo", operario: "Luis Gómez", resultado: "warn", trabajo: "Reparación de luces traseras", observaciones: "Se reemplazó cableado dañado." },
];
export const OPERARIOS = ["Todos", ...Array.from(new Set(MOCK.map((r) => r.operario)))];
export const VEHICULOS = ["Todos", ...Array.from(new Set(MOCK.map((r) => `${r.vehiculo} (${r.patente})`)))];
