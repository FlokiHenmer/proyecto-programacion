import React, { useState } from "react";
import { Box, IconButton, Drawer, useMediaQuery, useTheme, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Iconos y subcomponentes importados de tus archivos creados arriba
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";

// Componentes de Layout y Vistas
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { COLORS } from "../../constants/Gerente";
import VistaInicio from "../../components/gerente/VistaInicio";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";
import GestionEmpresa from "./GestionEmpresa";

export default function DashboardGerente() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const sidebarItems = [
    { label: "Inicio", icon: <DashboardIcon />, path: "/gerente" },
    { label: "Gestión Empresa", icon: <BusinessIcon />, path: "/gerente/gestion-empresa" },
    { label: "Alarmas", icon: <WarningAmberIcon />, path: "/gerente/alarmas" },
    { label: "Agenda", icon: <CalendarMonthIcon />, path: "/gerente/calendario" },
    { label: "Historial", icon: <HistoryIcon />, path: "/gerente/historial" },
  ];

  const currentItem = sidebarItems.find(item => location.pathname === item.path) || sidebarItems[0];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: COLORS.BG, p: { xs: 1, md: 3 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Navbar />
        <Box sx={{ display: "grid", gridTemplateColumns: { md: "240px 1fr" }, bgcolor: "#fff", borderRadius: 4, overflow: "hidden", border: `1px solid ${COLORS.BORDER}`, minHeight: 700 }}>
          
          {isDesktop ? (
            <Sidebar title="Gerencia" subtitle="Panel de Gestión" items={sidebarItems} currentPath={location.pathname} onNavigate={(p) => navigate(p)} />
          ) : (
            <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ "& .MuiDrawer-paper": { width: 240 } }}>
               <Sidebar title="Gerencia" subtitle="Panel de Gestión" items={sidebarItems} currentPath={location.pathname} onNavigate={(p) => { navigate(p); setMobileOpen(false); }} />
            </Drawer>
          )}

          <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflowY: 'auto' }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              {!isDesktop && <IconButton onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>}
              <Typography sx={{ fontSize: 24, fontWeight: 800 }}>{currentItem.label}</Typography>
            </Box>
            
            <Routes>
               <Route path="/" element={<VistaInicio />} />
               <Route path="gestion-empresa" element={<GestionEmpresa />} />
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