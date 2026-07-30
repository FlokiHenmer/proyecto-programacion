import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Box, Drawer, IconButton, useMediaQuery, useTheme, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Iconos
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HistoryIcon from "@mui/icons-material/History";
import BuildIcon from "@mui/icons-material/Build";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Componentes importados 
import Navbar from "../../components/layout/Navbar";
import { GREEN, BORDER, TEXT, MUTED, cardSx, greenBtn, blackBtn, historialData, trabajosData } from "../../constants/Mecanico";
import SidebarContent from "../../components/mecanico/Dashboard/SidebarContent";
import InicioDashboard from "../../components/mecanico/Dashboard/InicioDashboard";
import GestionEmpresas from "./GestionEmpresas";
import FormularioTecnico from "./FormularioTecnico";
import Trabajos from "./Trabajos";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";

import { SIDEBAR_WIDTH } from "../../constants/Mecanico";

const sidebarItems = [
  { label: "Inicio", path: "/", icon: <DashboardIcon /> },
  { label: "Gestión Empresas", path: "/gestion-empresas", icon: <FactCheckIcon /> },
  { label: "Checklist Técnico", path: "/formulario-tecnico", icon: <BuildIcon /> },
  { label: "Trabajos", path: "/trabajos", icon: <BuildIcon /> },
  { label: "Alarmas", path: "/alarmas", icon: <WarningAmberIcon /> },
  { label: "Calendario", path: "/calendario", icon: <CalendarMonthIcon /> },
  { label: "Historial", path: "/historial", icon: <HistoryIcon /> },
];



export default function DashboardMecanico() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const titulosSecciones = {
    "/mecanico": "Inicio",
    "/mecanico/gestion-empresas": "Gestión de Empresas",
    "/mecanico/formulario-tecnico": "Checklist Técnico",
    "/mecanico/trabajos": "Registro de Trabajos",
    "/mecanico/alarmas": "Alertas y Notificaciones",
    "/mecanico/calendario": "Agenda y Calendario",
    "/mecanico/historial": "Historial de Mantenimiento",
  };
  const tituloActual = titulosSecciones[location.pathname] || "Operativa Vehicular";
  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const sidebarItems = [
    { label: "Inicio", icon: <DashboardIcon />, path: "/mecanico" },
    { label: "Gestion Empresas", icon: <FactCheckIcon />, path: "/mecanico/gestion-empresas" },
    { label: "Checklist Técnico", icon: <FactCheckIcon />, path: "/mecanico/formulario-tecnico" },
    { label: "Trabajos", icon: <BuildIcon />, path: "/mecanico/trabajos" },
    { label: "Alertas", icon: <WarningAmberIcon />, path: "/mecanico/alarmas" },
    { label: "Agenda", icon: <CalendarMonthIcon />, path: "/mecanico/calendario" },
    { label: "Historial", icon: <HistoryIcon />, path: "/mecanico/historial" },
  ];
   
  const currentItem = sidebarItems.find(item => location.pathname === item.path) || sidebarItems[0];


  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f3ff", p: { xs: 1.5, md: 3 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Navbar />
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 4,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 10px 40px rgba(60,30,120,0.08)",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: `${SIDEBAR_WIDTH}px 1fr` },
            overflow: "hidden",
            minHeight: { md: 760 },
          }}
        >
          {/* Sidebar desktop (md+) */}
          {isDesktop && (
            <Box sx={{ borderRight: `1px solid ${BORDER}` }}>
              <SidebarContent items={sidebarItems} currentPath={location.pathname} onNavigate={handleNavigate} />
            </Box>
          )}
          {/* Drawer mobile */}
          <Drawer
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <CloseIcon />
              </IconButton>
            </Box>
            <SidebarContent items={sidebarItems} currentPath={location.pathname} onNavigate={handleNavigate} />
          </Drawer>


          {/* Contenido principal */}
          <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: "inline-flex", md: "none" }, border: `1px solid ${BORDER}`, borderRadius: 2 }}
                aria-label="Abrir menú"
              >
                <MenuIcon />
              </IconButton>
              <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 800, color: TEXT, flex: 1, minWidth: 0 }}>
                {tituloActual}
              </Typography>
            </Box>
            
            <Routes>
              <Route path="/" element={<InicioDashboard />} />
              <Route path="gestion-empresas" element={<GestionEmpresas />} />
              <Route path="formulario-tecnico" element={<FormularioTecnico />} />
              <Route path="trabajos" element={<Trabajos />} />
              <Route path="alarmas" element={<Alarmas />} />
              <Route path="calendario" element={<Calendario />} />
              <Route path="historial" element={<Historial />} />
            </Routes>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
