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
  { id: "T-1042", fecha: "12/10/2025", vehiculo: "Scania R450 (ABC-123)", tipo: "Preventivo", operario: "Juan Pérez", resultado: "ok" },
  { id: "T-1041", fecha: "10/10/2025", vehiculo: "Mercedes Actros (DEF-456)", tipo: "Correctivo", operario: "Luis Gómez", resultado: "warn" },
  { id: "T-1040", fecha: "05/10/2025", vehiculo: "Iveco Stralis (GHI-789)", tipo: "Inspección", operario: "Carla Ruiz", resultado: "ok" },
  { id: "T-1039", fecha: "01/10/2025", vehiculo: "VW Constellation (JKL-012)", tipo: "Predictivo", operario: "Martín Díaz", resultado: "ok" },
  { id: "T-1038", fecha: "27/09/2025", vehiculo: "Ford Cargo (MNO-345)", tipo: "Correctivo", operario: "Ana Torres", resultado: "warn" },
  { id: "T-1037", fecha: "22/09/2025", vehiculo: "Scania G410 (PQR-678)", tipo: "Preventivo", operario: "Juan Pérez", resultado: "ok" },
];