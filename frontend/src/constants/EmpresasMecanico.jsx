export const GREEN = "#44FF34";
export const GREEN_DARK = "#22cc15";
export const BORDER = "#e5e7eb";
export const TEXT = "#0f172a";
export const MUTED = "#64748b";
export const YELLOW = "#fde68a";
export const YELLOW_TEXT = "#92400e";
export const GREEN_SOFT = "#dcfce7";
export const GREEN_TEXT = "#166534";
export const RED_BG = "#fee2e2";
export const RED = "#dc2626";
export const BLUE_BRAND = "#3b82f6";
export const ORANGE_BRAND = "#f97316";

export const empresasIniciales = [
  {
    id: 1,
    razonSocial: "Transportes del Sur S.A.",
    cuit: "30-71234567-8",
    gerente: "Martín Acosta",
    email: "m.acosta@transportesdelsur.com",
    vehiculos: 42,
    estado: "Activa",
  },
  {
    id: 2,
    razonSocial: "Logística Andina SRL",
    cuit: "33-70988123-4",
    gerente: "Carolina Méndez",
    email: "c.mendez@logandina.com.ar",
    vehiculos: 28,
    estado: "En Revisión",
  },
  {
    id: 3,
    razonSocial: "Cargas Pampeanas S.A.",
    cuit: "30-69875432-1",
    gerente: "Hernán Rivero",
    email: "h.rivero@cargaspampeanas.com",
    vehiculos: 56,
    estado: "Activa",
  },
  {
    id: 4,
    razonSocial: "Distribuidora Norte SA",
    cuit: "30-71456789-2",
    gerente: "Lucía Fernández",
    email: "l.fernandez@distrinorte.com",
    vehiculos: 16,
    estado: "En Revisión",
  },
];

export const gerentesIniciales = [
  { 
    id: 1, 
    nombre: "Carlos Gómez", 
    email: "carlos.gomez@delsur.com", 
    telefono: "+54 9 11 4455-6677", 
    empresa: "Transportes del Sur S.A.", 
    estado: "Activo" 
  },
  { 
    id: 2, 
    nombre: "Mariana López", 
    email: "m.lopez@nortelogistica.com", 
    telefono: "+54 9 11 2233-4455", 
    empresa: "Logística del Norte SRL", 
    estado: "Activo" 
  },
  { 
    id: 3, 
    nombre: "Esteban Pérez", 
    email: "eperez@flotaexpress.com.ar", 
    telefono: "+54 9 11 9988-7766", 
    empresa: "Flota Express Argentina", 
    estado: "Activo" 
  },
  { 
    id: 4, 
    nombre: "Valeria Ruiz", 
    email: "vruiz@patagonicos.com", 
    telefono: "+54 9 11 1122-3344", 
    empresa: "Transportes Patagónicos", 
    estado: "Inactivo" 
  },
];

export const operariosMecanico = [
  { 
    id: 1, 
    nombre: "Juan Pérez", 
    email: "juan.perez@pinzamotors.com", 
    rol: "Mecánico Senior", 
    empresa: "Transportes del Sur S.A.", 
    estado: "Activo" 
  },
  { 
    id: 2, 
    nombre: "Lucas Díaz", 
    email: "lucas.diaz@pinzamotors.com", 
    rol: "Electromecánico", 
    empresa: "Logística del Norte SRL", 
    estado: "Activo" 
  },
  { 
    id: 3, 
    nombre: "Sofía Benítez", 
    email: "sofia.benitez@pinzamotors.com", 
    rol: "Asistente Técnico", 
    empresa: "Flota Express Argentina", 
    estado: "Activo" 
  },
  { 
    id: 4, 
    nombre: "Marcos Torres", 
    email: "marcos.torres@pinzamotors.com", 
    rol: "Mecánico General", 
    empresa: "Transportes Patagónicos", 
    estado: "Inactivo" 
  },
];

export const vehiculosMecanico = [
  { 
    id: 1, 
    modelo: "Scania R450", 
    patente: "ABC-123", 
    empresa: "Transportes del Sur S.A.", 
    km: "145,200 km", 
    revision: "12/10/2025", 
    estado: "Activo" 
  },
  { 
    id: 2, 
    modelo: "Mercedes Actros", 
    patente: "DEF-456", 
    empresa: "Logística del Norte SRL", 
    km: "98,400 km", 
    revision: "10/10/2025", 
    estado: "Activo" 
  },
  { 
    id: 3, 
    modelo: "Iveco Stralis", 
    patente: "GHI-789", 
    empresa: "Flota Express Argentina", 
    km: "210,000 km", 
    revision: "05/10/2025", 
    estado: "En Taller" 
  },
  { 
    id: 4, 
    modelo: "VW Constellation", 
    patente: "JKL-012", 
    empresa: "Transportes Patagónicos", 
    km: "75,300 km", 
    revision: "01/10/2025", 
    estado: "Activo" 
  },
];