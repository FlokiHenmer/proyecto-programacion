import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext"; // <-- CORREGIDO: Subimos dos niveles para salir de layout/ y components/
import { Box, Typography, Stack, Avatar, Button } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import LogoutIcon from "@mui/icons-material/Logout";

const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const GREEN_DARK = "#22cc15";

// Mapeo para mostrar los nombres de los roles prolijos y con acentos
const ROLES_MAP = {
  mecanico: "Mecánico",
  gerente: "Gerente",
  operario: "Operario",
};

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true }); // Te manda directo al login limpiando el historial de rutas
  };

  // Determinar dinámicamente qué mostrar en el badge
  const obtenerNombreAMostrar = () => {
    if (user?.username && user.username.trim() !== "") {
      return user.username;
    }
    // Si no ingresó username, usa el rol formateado
    return ROLES_MAP[user?.role] || "Usuario";
  };

  const nombreAMostrar = obtenerNombreAMostrar();
  const inicialAvatar = nombreAMostrar.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
        px: { xs: 0.5, md: 1 },
        py: 1,
      }}
    >
      {/* Izquierda: Loguito e Identidad de la App */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            bgcolor: "#fff",
            p: 1.2,
            borderRadius: 2.5,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BuildIcon sx={{ color: TEXT, fontSize: 22 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: TEXT, lineHeight: 1.5 }}>
            Operativa Vehicular
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: GREEN_DARK, letterSpacing: 0.3 }}>
            Pinza Motors
          </Typography>
        </Box>
      </Stack>

      {/* Derecha: Info de Usuario + Botón Cerrar Sesión */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Badge de Usuario */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            border: `1px solid ${BORDER}`,
            bgcolor: "#fff",
            borderRadius: 999,
            pl: 0.5,
            pr: 3,
            py: 0.5,
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          }}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#f1f5f9", color: TEXT, fontSize: 14, fontWeight: 700 }}>
            {inicialAvatar}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700, lineHeight: 1.5 }}>
              {nombreAMostrar}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "#16a34a", fontWeight: 500 }}>● En línea</Typography>
          </Box>
        </Stack>

        {/* Botón rápido de Logout */}
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: 13,
            border: `1px solid ${BORDER}`,
            color: "#dc2626",
            "&:hover": {
              bgcolor: "#fef2f2",
              borderColor: "#fca5a5",
              color: "#dc2626",
            },
          }}
        >
          Cerrar sesión
        </Button>
      </Stack>
    </Box>
  );
}