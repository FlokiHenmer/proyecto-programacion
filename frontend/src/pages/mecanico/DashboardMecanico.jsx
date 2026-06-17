import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import GestionEmpresas from "./GestionEmpresas";
import FormularioTecnico from "./FormularioTecnico";
import Trabajos from "./Trabajos";
import Alarmas from "./Alarmas";
import Calendario from "./Calendario";
import Historial from "./Historial";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Stack,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HistoryIcon from "@mui/icons-material/History";
import BuildIcon from "@mui/icons-material/Build";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ErrorIcon from "@mui/icons-material/Error";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const SIDEBAR_WIDTH = 240;
const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)",
};
const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  boxShadow: "none",
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "0 6px 16px rgba(68,255,52,0.35)" },
};
const blackBtn = {
  bgcolor: "#0b0b0b",
  color: "#fff",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  "&:hover": { bgcolor: "#222" },
};
function InicioDashboard() {
  const navigate = useNavigate();
  const historialData = [
    { patente: "ABC-123", modelo: "Toyota Hilux", fecha: "12/10/2023", servicio: "Cambio de Aceite" },
    { patente: "XYZ-789", modelo: "Ford Ranger", fecha: "11/10/2023", servicio: "Frenos" },
    { patente: "DEF-456", modelo: "VW Amarok", fecha: "10/10/2023", servicio: "Suspensión" },
    { patente: "GHI-012", modelo: "Mercedes Sprinter", fecha: "09/10/2023", servicio: "Alineación" },
    { patente: "JKL-345", modelo: "Iveco Daily", fecha: "08/10/2023", servicio: "Motor" },
  ];
  const trabajosData = [
    { v: "Toyota Hilux (ABC-123)", d: "Hoy", desc: "Revisión de niveles y presión de neumáticos." },
    { v: "Ford Ranger (XYZ-789)", d: "Ayer", desc: "Cambio de filtros de aire y combustible." },
    { v: "VW Amarok (DEF-456)", d: "09 Oct", desc: "Ajuste de correas y revisión general." },
  ];
  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" }, gap: 2.5, mb: 2.5 }}>
        <Card sx={{ ...cardSx, borderLeft: `4px solid ${GREEN}` }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 20, color: TEXT }}>
                  Checklist<br />Técnico
                </Typography>
                <Typography sx={{ color: MUTED, fontSize: 13, mt: 0.5 }}>Resumen mensual</Typography>
              </Box>
              <Typography sx={{ fontSize: 48, fontWeight: 800, color: "#cbd5e1", lineHeight: 1 }}>
                24
              </Typography>
            </Box>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              <StatusRow icon={<CheckCircleIcon sx={{ color: "#16a34a" }} />} label="Óptimo" value={18} />
              <StatusRow icon={<ReportProblemIcon sx={{ color: "#0284c7" }} />} label="Mantenimiento" value={4} />
              <StatusRow icon={<ErrorIcon sx={{ color: "#dc2626" }} />} label="Reparación" value={2} />
            </Stack>
            <Button fullWidth sx={{ ...greenBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/formulario-tecnico")}>
              Ir al Checklist Técnico
            </Button>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "flex-start" }, gap: 1.5, mb: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 20, color: TEXT }}>
                  Historial de Vehículos
                </Typography>
                <Typography sx={{ color: MUTED, fontSize: 13 }}>142 servicios registrados</Typography>
              </Box>
              <Button sx={{ ...greenBtn, px: 2, alignSelf: { xs: "stretch", sm: "auto" } }} onClick={() => navigate("/mecanico/historial")}>Ver historial completo</Button>
            </Box>
            <Box sx={{ overflowX: "auto" }}>
              <Table size="small" sx={{ minWidth: 350 }}> {/* Ajustado de 480 a 350 */}
                <TableHead>
                  <TableRow>
                    {["PATENTE", "MODELO", "FECHA", "SERVICIO"].map((h) => (
                      <TableCell 
                        key={h} 
                        sx={{ 
                          fontWeight: 700, 
                          color: MUTED, 
                          fontSize: { xs: 10, sm: 12 }, // Fuente más pequeña en móvil
                          padding: { xs: "8px 4px", sm: "16px" } // Padding reducido en móvil
                        }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historialData.map((r) => (
                    <TableRow key={r.patente}>
                      <TableCell sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 }, padding: "8px 4px" }}>
                        {r.patente}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 14 }, padding: "8px 4px" }}>
                        {r.modelo}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 14 }, padding: "8px 4px" }}>
                        {r.fecha}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 12, sm: 14 }, padding: "8px 4px" }}>
                        {r.servicio}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2.5 }}>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1.5 }}>Registro de Trabajos</Typography>
            <Stack spacing={1.2}>
              {trabajosData.map((t) => (
                <Box key={t.v} sx={{ border: `1px solid ${BORDER}`, borderRadius: 2, p: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{t.v}</Typography>
                    <Typography sx={{ color: MUTED, fontSize: 12 }}>{t.d}</Typography>
                  </Box>
                  <Typography sx={{ color: MUTED, fontSize: 13, mt: 0.5 }}>{t.desc}</Typography>
                </Box>
              ))}
            </Stack>
            <Button fullWidth sx={{ ...blackBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/trabajos")}>
              Agregar nuevo trabajo
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, borderLeft: "4px solid #dc2626" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Alertas y Turnos</Typography>
              <NotificationsActiveIcon sx={{ color: "#dc2626" }} />
            </Box>
            <Chip
              label="3 ALERTAS ACTIVAS"
              size="small"
              sx={{ bgcolor: "#fee2e2", color: "#b91c1c", fontWeight: 700, mt: 1, mb: 1.5 }}
            />
            <Stack spacing={1.2}>
              <AlertItem severity="urgent" title="URGENTE: Frenos Gastados" sub="Unidad 04 - Scania" status="PENDIENTE" statusColor="#dc2626" />
              <AlertItem title="Service 50k km" sub="Unidad 12 - Renault" status="ACEPTADO" statusColor="#16a34a" />
            </Stack>
            <Button fullWidth sx={{ ...greenBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/alarmas")}>
              Ver alertas y proponer turno
            </Button>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1.5 }}>Agenda</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", textAlign: "center", mb: 1 }}>
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <Typography key={i} sx={{ fontSize: 12, color: MUTED, fontWeight: 700 }}>{d}</Typography>
              ))}
              {[9, 10, 11, 12, 13, 14, 15].map((n) => (
                <Box key={n} sx={{ py: 0.5 }}>
                  {n === 10 ? (
                    <Box sx={{
                      mx: "auto", width: 26, height: 26, borderRadius: "50%",
                      bgcolor: "#0b0b0b", color: "#fff", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700,
                    }}>
                      {n}
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: 13 }}>{n}</Typography>
                  )}
                </Box>
              ))}
            </Box>
            <Stack spacing={1.2}>
              <AgendaItem time="09:00 AM" text="Turno Confirmado: Renault Kangoo" color="#16a34a" />
              <AgendaItem time="14:30 PM" text="Urgente: Bomba de Agua" color="#dc2626" />
            </Stack>
            <Button fullWidth sx={{ ...greenBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/calendario")}>
              Ir a agenda completa
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
function SidebarContent({ items, currentPath, onNavigate }) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 16 }}>
          Mantenimiento
        </Typography>
        <Typography sx={{ color: MUTED, fontSize: 13 }}>Panel Técnico</Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List disablePadding>
        {items.map((it) => {
          const isActive = currentPath === it.path;
          return (
            <ListItemButton
              key={it.label}
              onClick={() => onNavigate(it.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                ...(isActive && {
                  bgcolor: GREEN,
                  color: "#06210a",
                  "&:hover": { bgcolor: GREEN_DARK },
                }),
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isActive ? "#06210a" : MUTED }}>
                {it.icon}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: 14 }}
                primary={it.label}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
export default function DashboardMecanico() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/mecanico" },
    { label: "Gestion Empresas", icon: <FactCheckIcon />, path: "/mecanico/gestion-empresas" },
    { label: "Checklist Técnico", icon: <FactCheckIcon />, path: "/mecanico/formulario-tecnico" },
    { label: "Trabajos", icon: <BuildIcon />, path: "/mecanico/trabajos" },
    { label: "Alertas", icon: <WarningAmberIcon />, path: "/mecanico/alarmas" },
    { label: "Agenda", icon: <CalendarMonthIcon />, path: "/mecanico/calendario" },
    { label: "Historial", icon: <HistoryIcon />, path: "/mecanico/historial" },
  ];
  const titulosSecciones = {
    "/mecanico": "Dashboard",
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
function StatusRow({ icon, label, value }) {
  return (
    <Box sx={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      border: `1px solid ${BORDER}`, borderRadius: 2, px: 1.5, py: 1,
    }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{label}</Typography>
      </Stack>
      <Typography sx={{ fontWeight: 800 }}>{value}</Typography>
    </Box>
  );
}
function AlertItem({ severity, title, sub, status, statusColor }) {
  return (
    <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: 2, p: 1.5 }}>
      <Stack direction="row" spacing={1} alignItems="flex-start">
        {severity === "urgent" && <ErrorIcon sx={{ color: "#dc2626", fontSize: 20 }} />}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: severity === "urgent" ? "#dc2626" : TEXT }}>
            {title}
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: 12 }}>{sub}</Typography>
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 800, color: statusColor }}>{status}</Typography>
      </Stack>
    </Box>
  );
}
function AgendaItem({ time, text, color }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, borderLeft: `3px solid ${color}`, pl: 1.5, py: 0.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: MUTED, minWidth: 56 }}>{time}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{text}</Typography>
    </Box>
  );
}
