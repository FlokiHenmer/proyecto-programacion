import React from "react";
import BuildIcon from "@mui/icons-material/Build";
import OpacityIcon from "@mui/icons-material/Opacity";
import VerifiedIcon from "@mui/icons-material/Verified";

// Constantes de estilo
export const GREEN = "#44FF34";
export const GREEN_DARK = "#22cc15";
export const GREEN_SOFT = "#e8ffe4";
export const BORDER = "#e5e7eb";
export const TEXT = "#0f172a";
export const MUTED = "#64748b";
export const RED = "#dc2626";
export const RED_BG = "#fee2e2";
export const YELLOW = "#f59e0b";
export const YELLOW_BG = "#fef3c7";
export const GRAY_BG = "#e5e7eb";

// Datos
export const criticalAlerts = [
  { id: 1, patente: "ABC-123", vehiculo: "Toyota Hilux", badge: { label: "URGENTE", bg: RED_BG, color: RED }, icon: <BuildIcon sx={{ fontSize: 18, color: RED }} />, text: "Fallo en Sistema de Frenos", borderColor: RED, kmActual: "124,500 km", ultimoServicio: "15/07/2024" },
  { id: 2, patente: "XYZ-789", vehiculo: "Ford Ranger", badge: { label: "OBSERVACIÓN", bg: GRAY_BG, color: "#374151" }, icon: <OpacityIcon sx={{ fontSize: 18, color: YELLOW }} />, text: "Cambio de Aceite (Próximo)", borderColor: YELLOW, kmActual: "98,200 km", ultimoServicio: "10/01/2025" },
  { id: 3, patente: "MNO-456", vehiculo: "VW Amarok", badge: { label: "CONTROL", bg: GRAY_BG, color: "#374151" }, icon: <VerifiedIcon sx={{ fontSize: 18, color: GREEN_DARK }} />, text: "Mantenimiento Preventivo", borderColor: GREEN_DARK, kmActual: "64,000 km", ultimoServicio: "05/11/2025" },
];

export const turnos = [
  { vehiculo: "Toyota Hilux", patente: "ABC-123", fecha: "15 Oct, 2026 - 09:00", estado: { label: "Aceptado", bg: GREEN_SOFT, color: "#166534" } },
  { vehiculo: "Ford Ranger", patente: "XYZ-789", fecha: "16 Oct, 2026 - 14:30", estado: { label: "Pendiente", bg: YELLOW_BG, color: "#92400e" } },
  { vehiculo: "Iveco Daily", patente: "JKL-012", fecha: "Inmediato", estado: { label: "Urgente", bg: RED_BG, color: RED }, },
];

export const agenda = [
  { day: "LUN 14", time: "08:30", title: "Toyota Hilux - Frenos", bg: GREEN_SOFT, border: GREEN_DARK },
  { day: "MAR 15", time: "10:00", title: "Emergencia Motor - Scania", bg: RED_BG, border: RED },
];

// Estilos de botones
export const commonBtn = { fontWeight: 700, textTransform: "none", borderRadius: 2 };
export const greenBtn = { ...commonBtn, bgcolor: GREEN, color: "#06210a", "&:hover": { bgcolor: GREEN_DARK } };
export const blackBtn = { ...commonBtn, bgcolor: "#0b0f14", color: "#fff", "&:hover": { bgcolor: "#000" } };
