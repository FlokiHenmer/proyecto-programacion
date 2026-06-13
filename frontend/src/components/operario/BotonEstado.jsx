// src/components/operario/BotonEstado.jsx
import { Button } from "@mui/material";

const VERDE = "#44FF34";
const AMARILLO = "#FFC107";
const ROJO = "#FF3B30";

const colorHex = (c) => c === "green" ? VERDE : c === "yellow" ? AMARILLO : ROJO;

export default function BotonEstado({ label, color, activo, onClick }) {
  const hex = colorHex(color);
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onClick}
      sx={{
        flexGrow: 1, // 🔹 hace que el botón se expanda
        width: "100%", // 🔹 asegura que ocupe todo el ancho
        py: 1.2, textTransform: "none", fontWeight: 600,
        borderRadius: 2, color: activo ? "#fff" : "text.primary",
        borderColor: activo ? hex : "rgba(0,0,0,0.15)",
        backgroundColor: activo ? hex : "#fff",
        boxShadow: activo ? `0 0 14px ${hex}` : "none",
        transition: "all .25s ease",
        "&:hover": { borderColor: hex, backgroundColor: activo ? hex : `${hex}14` },
      }}
    >
      {label}
    </Button>
  );
}
