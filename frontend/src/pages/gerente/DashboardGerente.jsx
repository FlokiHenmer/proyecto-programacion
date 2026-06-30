import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { 
  Box, IconButton, Drawer, useMediaQuery, useTheme, Typography, Divider, 
  ListItemButton, ListItemIcon, ListItemText, Card, CardContent, Table, 
  TableBody, TableCell, TableHead, TableContainer, TableRow, Chip, Stack 
} from "@mui/material";

// Iconos
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpeedIcon from "@mui/icons-material/Speed";

// Componentes de Layout y Vistas
import Navbar from "../../components/layout/Navbar";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";
import GestionEmpresa from "./GestionEmpresa";

// --- CONSTANTES ---
const GREEN = "#44FF34";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const BG = "#f8fafc";
const cardSx = { borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none", bgcolor: "#fff" };

// --- DATOS DEL GERENTE ---
const kpis = [
  { title: "Total Vehículos Activos", value: "128", unit: "unidades", icon: <DirectionsCarIcon />, accent: GREEN },
  { title: "Costos Mantenimiento", value: "$ 1.2M", unit: "ARS / mes", icon: <AttachMoneyIcon />, accent: "#f59e0b" },
  { title: "Productividad Taller", value: "87%", unit: "eficiencia", icon: <SpeedIcon />, accent: "#22c55e" },
  { title: "Alertas Críticas", value: "5", unit: "requieren acción", icon: <WarningAmberIcon sx={{ color: "#dc2626" }} />, accent: "#dc2626" },
];

const serviciosPorMes = [
  { mes: "Ene", value: 32 }, { mes: "Feb", value: 41 }, { mes: "Mar", value: 28 }, { mes: "Abr", value: 55 },
  { mes: "May", value: 47 }, { mes: "Jun", value: 63 }, { mes: "Jul", value: 58 }, { mes: "Ago", value: 72 },
  { mes: "Sep", value: 49 }, { mes: "Oct", value: 66 }, { mes: "Nov", value: 54 }, { mes: "Dic", value: 38 },
];

const mantenimientosPendientes = [
  { vehiculo: "Scania R450 (AB123CD)", tipo: "Service 100k", prioridad: "Alta" },
  { vehiculo: "Mercedes Actros (XY789ZT)", tipo: "Frenos", prioridad: "Media" },
  { vehiculo: "Iveco Stralis (LM456OP)", tipo: "Cambio Aceite", prioridad: "Alta" },
];

const getPrioridadColor = (prioridad) => {
  switch (prioridad) {
    case "Alta": return { bg: "#fee2e2", color: "#b91c1c" };
    case "Media": return { bg: "#fef3c7", color: "#92400e" };
    default: return { bg: "#dcfce7", color: "#166534" };
  }
};

// --- COMPONENTES VISUALES ---
function KpiCard({ title, value, unit, icon, accent }) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${accent}` }}>
      
      <CardContent sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: "#f1f5f9", color: accent }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ color: MUTED, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 800, mt: 0.2 }}>{value}</Typography>
          <Typography sx={{ color: MUTED, fontSize: 12 }}>{unit}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <Box sx={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: { xs: 1, md: 2 }, height: 160, mt: 3, px: 1, minWidth: 400 }}>
        {data.map(d => (
          <Box key={d.mes} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
            <Box sx={{ 
              width: "100%", maxWidth: 28, 
              height: `${Math.max((d.value / max) * 100, 10)}%`, 
              bgcolor: "#569cf1f1", 
              borderRadius: "4px 4px 0 0" 
            }} />
            <Typography sx={{ fontSize: 10, mt: 1, color: MUTED, fontWeight: 600 }}>{d.mes}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function VistaInicio() {
  return (
    <Stack spacing={{ xs: 2, md: 3 }} sx={{ width: "100%", minWidth: 0 }}>
      
      {/* 1. KPIs: Ajuste de espaciado en móvil */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, 
        gap: { xs: 1.5, md: 2 } 
      }}>
        {kpis.map((k) => <KpiCard key={k.title} {...k} />)}
      </Box>
      
      {/* 2. Gráfico: Un poco más de aire */}
      <Card sx={{ ...cardSx, minWidth: 0 }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 2 }}>Servicios por Mes</Typography>
          <Box sx={{ width: "100%", overflowX: "auto", pb: 1, minWidth: 0 }}>
             <Box sx={{ minWidth: 400 }}> 
                <BarChart data={serviciosPorMes} />
             </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 3. Tabla: Estilo limpio */}
      <Card sx={{ ...cardSx, minWidth: 0 }}>
        <CardContent sx={{ p: 0, minWidth: 0 }}>
          <Box sx={{ p: { xs: 2, md: 3 }, pb: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Mantenimientos Pendientes</Typography>
          </Box>
          
          <TableContainer sx={{ width: "100%", overflowX: "auto", minWidth: 0 }}>
            <Table size="small" sx={{ minWidth: 500 }}> 
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: MUTED, fontWeight: 700, fontSize: 11, pl: { xs: 2, md: 3 } }}>VEHÍCULO</TableCell>
                  <TableCell sx={{ color: MUTED, fontWeight: 700, fontSize: 11 }}>TIPO</TableCell>
                  <TableCell sx={{ color: MUTED, fontWeight: 700, fontSize: 11, pr: { xs: 2, md: 3 } }}>PRIORIDAD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mantenimientosPendientes.map((r, i) => (
                  <TableRow key={i} sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell sx={{ fontSize: 13, whiteSpace: "nowrap", pl: { xs: 2, md: 3 } }}>{r.vehiculo}</TableCell>
                    <TableCell sx={{ fontSize: 13, whiteSpace: "nowrap" }}>{r.tipo}</TableCell>
                    <TableCell sx={{ pr: { xs: 2, md: 3 } }}>
                      <Chip 
                        label={r.prioridad} 
                        size="small"
                        sx={{ 
                          bgcolor: getPrioridadColor(r.prioridad).bg, 
                          color: getPrioridadColor(r.prioridad).color, 
                          fontWeight: 700,
                          fontSize: 11
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}


// --- ESTRUCTURA PRINCIPAL (SIDEBAR + ROUTER) ---
export default function DashboardGerente() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/gerente" },
    { label: "Gestión Empresa", icon: <BusinessIcon />, path: "/gerente/gestion-empresa" },
    { label: "Alarmas", icon: <WarningAmberIcon />, path: "/gerente/alarmas" },
    { label: "Agenda", icon: <CalendarMonthIcon />, path: "/gerente/calendario" },
    { label: "Historial", icon: <HistoryIcon />, path: "/gerente/historial" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const currentItem = sidebarItems.find(item => location.pathname === item.path) || sidebarItems[0];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: BG, p: { xs: 1, md: 3 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Navbar />
        <Box sx={{ display: "grid", gridTemplateColumns: { md: "240px 1fr" }, bgcolor: "#fff", borderRadius: 4, overflow: "hidden", border: `1px solid ${BORDER}`, minHeight: 700 }}>
          
          {isDesktop ? (
            <SidebarContent items={sidebarItems} currentPath={location.pathname} onNavigate={handleNavigate} />
          ) : (
            <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ "& .MuiDrawer-paper": { width: 240 } }}>
              <SidebarContent items={sidebarItems} currentPath={location.pathname} onNavigate={handleNavigate} />
            </Drawer>
          )}

          
          <Box sx={{ 
            flexGrow: 1, 
            // Padding responsivo: 16px en móvil, 24px en escritorio
            p: { xs: 2, md: 3 }, 
            overflowY: 'auto',
            width: '100%',
            boxSizing: 'border-box' // Importante para que el padding no afecte el ancho total
          }}>
            {/* Título y Botón Menú */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              {!isDesktop && <IconButton onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>}
              <Typography sx={{ fontSize: 24, fontWeight: 800 }}>{currentItem.label}</Typography>
            </Box>
            
            {/* Rutas */}
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

function SidebarContent({ items, currentPath, onNavigate }) {
  return (
    <Box sx={{ p: 2, borderRight: `1px solid ${BORDER}`, height: "100%" }}>
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 16 }}>
          Gerencia
        </Typography>
        <Typography sx={{ color: MUTED, fontSize: 13 }}>Panel de Gestión</Typography>
      </Box>
      {items.map((it) => (
        <ListItemButton key={it.path} onClick={() => onNavigate(it.path)} sx={{ borderRadius: 2, bgcolor: currentPath === it.path ? GREEN : "transparent" }}>
          <ListItemIcon>{it.icon}</ListItemIcon>
          <ListItemText primary={it.label} />
        </ListItemButton>
      ))}
    </Box>
  );
}