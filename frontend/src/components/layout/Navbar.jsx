import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext"; // Subimos dos niveles para salir de layout/ y components/
import { Box, Typography, Stack, Avatar, Button } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";

const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const GREEN_DARK = "#22cc15";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true }); // Manda directo al login limpiando el historial de rutas
  };

  // Determinar dinámicamente el nombre a mostrar (Nombre de usuario o "Usuario" por defecto)
  const nombreAMostrar = user?.username && user.username.trim() !== "" 
    ? user.username 
    : "Usuario";

  // Tomar la inicial para el Avatar basado en el nombre determinado arriba
  const inicialAvatar = nombreAMostrar.charAt(0).toUpperCase();

  return (
    <Box
      component="header"
      sx={{
        height: 70,
        bgcolor: "#f8fafc",
        borderBottom: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* Isotipo / Logotipo de Pinza Motors */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 38,
            height: 38,
            bgcolor: TEXT,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            color: GREEN_DARK,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <BuildIcon sx={{ fontSize: 18 }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 900, fontSize: 16, color: TEXT, letterSpacing: 0.5, lineHeight: 1.2 }}>
            PINZA MOTORS
          </Typography>
          <Typography sx={{ fontSize: 10, color: GREEN_DARK, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
            Gestión de Flotas
          </Typography>
        </Box>
      </Stack>

      {/* Acciones del Perfil + Botón de Salida */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Badge del Usuario Activo */}
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
            color: red,
            px: 2,
            "&:hover": {
              bgcolor: "#fcfcfc",
              borderColor: "#d63030",
              color: "#e22424",
            },
          }}
        >
          Salir
        </Button>
      </Stack>
    </Box>
  );
}