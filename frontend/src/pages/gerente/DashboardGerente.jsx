import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, Drawer, useMediaQuery, useTheme, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";
import Navbar from "../../components/layout/Navbar";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";
import GestionEmpresa from "./GestionEmpresa";

// --- CONSTANTES DE ESTILO COMPARTIDAS ---
const GREEN = "#44FF34";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const SIDEBAR_WIDTH = 240;

const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
};

// --- COMPONENTES INTERNOS ---
function KpiCard({ title, value, unit, icon, accent }) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${accent}` }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography sx={{ color: MUTED, fontSize: 12, fontWeight: 700 }}>{title}</Typography>
            <Typography sx={{ fontSize: 26, fontWeight: 800, color: TEXT, mt: 0.5 }}>{value}</Typography>
            <Typography sx={{ color: MUTED, fontSize: 12 }}>{unit}</Typography>
          </Box>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: "#f8fafc", border: `1px solid ${BORDER}` }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function PrioridadChip({ value }) {
  const map = { Alta: { bg: "#fee2e2", color: "#b91c1c" }, Media: { bg: "#fef3c7", color: "#92400e" }, Baja: { bg: "#dcfce7", color: "#166534" } };
  const s = map[value] || map.Baja;
  return <Chip label={value} size="small" sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: 11 }} />;
}

function VistaInicio() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
        <KpiCard title="Vehículos" value="128" unit="activos" accent={GREEN} icon={<BusinessIcon />} />
        <KpiCard title="Costos" value="$1.2M" unit="ARS/mes" accent="#0ea5e9" icon={<BusinessIcon />} />
        <KpiCard title="Productividad" value="87%" unit="eficiencia" accent="#22c55e" icon={<DashboardIcon />} />
        <KpiCard title="Alertas" value="5" unit="críticas" accent="#dc2626" icon={<WarningAmberIcon />} />
      </Box>
      <Card sx={cardSx}>
        <CardContent>
          <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 2 }}>Próximos Vencimientos</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: MUTED }}>VEHÍCULO</TableCell>
                <TableCell sx={{ fontWeight: 700, color: MUTED }}>TIPO</TableCell>
                <TableCell sx={{ fontWeight: 700, color: MUTED }}>PRIORIDAD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Scania R450</TableCell>
                <TableCell>VTV</TableCell>
                <TableCell><PrioridadChip value="Alta" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

// --- COMPONENTE PRINCIPAL ---
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

  const titulosSecciones = {
    "/gerente": "Dashboard",
    "/gerente/gestion-empresa": "Gestión de Empresa",
    "/gerente/alarmas": "Alertas y Notificaciones",
    "/gerente/calendario": "Agenda y Calendario",
    "/gerente/historial": "Historial de Trabajos",
  };
  const tituloActual = titulosSecciones[location.pathname] || "Operativa Vehicular";
  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f3ff", p: { xs: 1.5, md: 3 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Navbar />
        <Box sx={{ bgcolor: "#fff", borderRadius: 4, border: `1px solid ${BORDER}`, display: "grid", gridTemplateColumns: { xs: "1fr", md: `${SIDEBAR_WIDTH}px 1fr` }, overflow: "hidden", minHeight: 760 }}>
          {isDesktop ? (
            <SidebarContent items={sidebarItems} currentPath={location.pathname} onNavigate={navigate} />
          ) : (
            <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH } }}>
              <SidebarContent items={sidebarItems} currentPath={location.pathname} onNavigate={navigate} />
            </Drawer>
          )}
          <Box sx={{ p: 3, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              {!isDesktop && <IconButton onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>}
              <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 800, color: TEXT, flex: 1, minWidth: 0 }}>
                  {tituloActual}
                </Typography>
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

function SidebarContent({ items, currentPath, onNavigate }) {
  return (
    <Box sx={{ p: 2, borderRight: `1px solid ${BORDER}` }}>
      <Box sx={{ px: 1, pb: 2 }}>
              <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 16 }}>
                Gerencia
              </Typography>
              <Typography sx={{ color: MUTED, fontSize: 13 }}>Panel de gestion</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      {items.map((it) => {
        const isActive = currentPath === it.path;
        return (
          <ListItemButton key={it.label} onClick={() => onNavigate(it.path)} sx={{ 
            borderRadius: 2, mb: 0.5, 
            ...(isActive && { bgcolor: GREEN, color: "#06210a", "&:hover": { bgcolor: "#22cc15" } })
          }}>
            <ListItemIcon sx={{ color: isActive ? "#06210a" : MUTED }}>{it.icon}</ListItemIcon>
            <ListItemText primary={it.label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
          </ListItemButton>
        );
      })}
    </Box>
  );
}