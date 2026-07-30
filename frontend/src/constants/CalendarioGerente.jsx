export const GREEN = "#44FF34";
export const BORDER = "#e5e7eb";
export const TEXT = "#334155";
export const TITLE = "#0f172a";
export const MUTED = "#64748b";
export const BG = "#f8fafc";

export const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff",
};

export const TIPOS = [
  { value: "preventivo", label: "Preventivo", color: "#16a34a", bg: "#dcfce7" },
  { value: "correctivo", label: "Correctivo", color: "#b91c1c", bg: "#fee2e2" },
  { value: "revision", label: "Revisión", color: "#1d4ed8", bg: "#dbeafe" },
  { value: "urgente", label: "Urgente", color: "#dc2626", bg: "#fee2e2" },
  { value: "completado", label: "Completado", color: "#0f766e", bg: "#ccfbf1" },
];

export const tipoMeta = (v) => TIPOS.find((t) => t.value === v) || TIPOS[0];
export const EMPRESA_ID = "EMP-001";
export const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const iso = (yy, mm, dd) => new Date(yy, mm, dd).toISOString().slice(0, 10);

export const EVENTOS_INICIALES = [
  { id: 1, empresaId: "EMP-001", titulo: "Cambio de aceite", vehiculo: "Scania R450 (ABC-123)", fecha: iso(y, m, 3), hora: "09:00", tipo: "preventivo" },
  { id: 2, empresaId: "EMP-001", titulo: "Revisión frenos", vehiculo: "Mercedes Actros (DEF-456)", fecha: iso(y, m, 8), hora: "11:30", tipo: "revision" },
  { id: 3, empresaId: "EMP-001", titulo: "Reparación motor", vehiculo: "Iveco Stralis (GHI-789)", fecha: iso(y, m, 12), hora: "08:00", tipo: "correctivo" },
  { id: 4, empresaId: "EMP-001", titulo: "VTV", vehiculo: "VW Constellation (JKL-012)", fecha: iso(y, m, 15), hora: "10:00", tipo: "urgente" },
  { id: 5, empresaId: "EMP-001", titulo: "Servicio 20.000 km", vehiculo: "Ford Cargo (MNO-345)", fecha: iso(y, m, 15), hora: "14:00", tipo: "preventivo" },
  { id: 6, empresaId: "EMP-001", titulo: "Inspección neumáticos", vehiculo: "Scania G410 (PQR-678)", fecha: iso(y, m, 22), hora: "09:30", tipo: "completado" },
  { id: 7, empresaId: "EMP-002", titulo: "Otro evento", vehiculo: "Otra empresa", fecha: iso(y, m, 5), hora: "10:00", tipo: "preventivo" },
];

export const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
export const DIAS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

export function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysPrev = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysPrev - i), out: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), out: false });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, out: next.getMonth() !== month });
    if (cells.length >= 42) break;
  }
  return cells;
}

export const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const toISO = (d) => d.toISOString().slice(0, 10);
