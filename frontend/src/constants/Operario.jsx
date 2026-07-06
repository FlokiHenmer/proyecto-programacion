import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import LightModeIcon from "@mui/icons-material/LightMode";
import AdjustIcon from "@mui/icons-material/Adjust";

export const VERDE = "#44FF34";
export const AMARILLO = "#FFC107";
export const ROJO = "#FF3B30";
export const BORDER = "#e5e7eb";
export const TEXT = "#0f172a";
export const MUTED = "#64748b";
export const BG = "#f8fafc";

export const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
  bgcolor: "#fff",
  transition: "box-shadow .25s ease, transform .25s ease",
};

// Definición de secciones y lógica de colores
export const SECCIONES = [
  { key: "aceite", titulo: "Nivel de aceite", icon: <OpacityIcon />, opciones: [
      { label: "Bien", color: "green" }, { label: "Regular", color: "yellow" }, { label: "Bajo", color: "red" } ] },
  { key: "refrigerante", titulo: "Nivel de refrigerante", icon: <ThermostatIcon />, subtitulo: "Medir siempre en frío", opciones: [
      { label: "Bien", color: "green" }, { label: "Regular", color: "yellow" }, { label: "Vacío", color: "red" } ] },
  { key: "cubiertas", titulo: "Estado cubiertas", icon: <TripOriginIcon />, opciones: [
      { label: "Bueno", color: "green" }, { label: "Malo", color: "yellow" } ] },
  { key: "luces", titulo: "Luces", icon: <LightModeIcon />, opciones: [
      { label: "Funcionales", color: "green" }, { label: "Falla detectada", color: "yellow" } ] },
  { key: "frenos", titulo: "Frenos", icon: <AdjustIcon />, opciones: [
      { label: "Funcionales", color: "green" }, { label: "Falla detectada", color: "red" } ] },
];

export const colorHex = (c) => c === "green" ? VERDE : c === "yellow" ? AMARILLO : ROJO;