import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";

// Iconos
import BuildIcon from "@mui/icons-material/Build";
import OpacityIcon from "@mui/icons-material/Opacity";
import VerifiedIcon from "@mui/icons-material/Verified";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import CloseIcon from "@mui/icons-material/Close";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const GREEN_SOFT = "#e8ffe4";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const RED = "#dc2626";
const RED_BG = "#fee2e2";
const YELLOW = "#f59e0b";
const YELLOW_BG = "#fef3c7";
const GRAY_BG = "#e5e7eb";

const criticalAlerts = [
  {
    id: 1,
    patente: "ABC-123",
    vehiculo: "Toyota Hilux",
    badge: { label: "URGENTE", bg: RED_BG, color: RED },
    icon: <BuildIcon sx={{ fontSize: 18, color: RED }} />,
    text: "Fallo en Sistema de Frenos",
    tituloAlerta: "Frenos Críticos",
    textColor: RED,
    borderColor: RED,
    kmActual: "124,500 km",
    ultimoServicio: "15/07/2024"
  },
  {
    id: 2,
    patente: "XYZ-789",
    vehiculo: "Ford Ranger",
    badge: { label: "OBSERVACIÓN", bg: GRAY_BG, color: "#374151" },
    icon: <OpacityIcon sx={{ fontSize: 18, color: YELLOW }} />,
    text: "Cambio de Aceite (Próximo)",
    tituloAlerta: "Desgaste de Lubricante",
    textColor: TEXT,
    borderColor: YELLOW,
    kmActual: "98,200 km",
    ultimoServicio: "10/01/2025"
  },
  {
    id: 3,
    patente: "MNO-456",
    vehiculo: "VW Amarok",
    badge: { label: "CONTROL", bg: GRAY_BG, color: "#374151" },
    icon: <VerifiedIcon sx={{ fontSize: 18, color: GREEN_DARK }} />,
    text: "Mantenimiento Preventivo",
    tituloAlerta: "Revisión General",
    textColor: TEXT,
    borderColor: GREEN_DARK,
    kmActual: "64,000 km",
    ultimoServicio: "05/11/2025"
  },
];

const turnos = [
  {
    vehiculo: "Toyota Hilux",
    patente: "ABC-123",
    fecha: "15 Oct, 2026 - 09:00",
    estado: { label: "Aceptado", bg: GREEN_SOFT, color: "#166534" },
  },
  {
    vehiculo: "Ford Ranger",
    patente: "XYZ-789",
    fecha: "16 Oct, 2026 - 14:30",
    estado: { label: "Pendiente", bg: YELLOW_BG, color: "#92400e" },
  },
  {
    vehiculo: "Iveco Daily",
    patente: "JKL-012",
    fecha: "Inmediato",
    estado: { label: "Urgente", bg: RED_BG, color: RED },
  },
];

const agenda = [
  { day: "LUN 14", time: "08:30", title: "Toyota Hilux - Frenos", bg: GREEN_SOFT, border: GREEN_DARK },
  { day: "MAR 15", time: "10:00", title: "Emergencia Motor - Scania", bg: RED_BG, border: RED },
  { day: "MIE 16", time: "12:15", title: "Checklist Trimestral", bg: GREEN_SOFT, border: GREEN_DARK },
];

const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "none",
  borderRadius: 2,
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
};

const modalGreenBtn = {
  bgcolor: "#86efac",
  color: "#14532d",
  fontWeight: 700,
  textTransform: "none",
  boxShadow: "none",
  borderRadius: 2,
  px: 3,
  "&:hover": { bgcolor: GREEN, boxShadow: "none" },
};

const blackBtn = {
  bgcolor: "#0b0f14",
  color: "#fff",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  "&:hover": { bgcolor: "#000" },
};

export default function AlertasMecanico() {
  const navigate = useNavigate();
  
  // Estados para el Modal de Detalles
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaTurno, setHoraTurno] = useState("");

  const handleOpenModal = (alerta) => {
    setSelectedAlert(alerta);
    setFechaTurno("");
    setHoraTurno("");
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

  const handleProponerTurno = () => {
    console.log("Turno propuesto para:", selectedAlert.vehiculo, fechaTurno, horaTurno);
    handleCloseModal();
  };

  return (
    <Box sx={{ flex: 1 }}>
      {/* Panel de Alertas Críticas */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
          Panel de Alertas Críticas
        </Typography>
      </Box>

      {/* Grid de Tarjetas de Alertas */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, 
        gap: 2.5, 
        mb: 4 
      }}>
        {criticalAlerts.map((a) => (
          <Card 
            key={a.patente} 
            sx={{ 
              borderRadius: 3, 
              border: `1px solid ${BORDER}`, 
              borderLeft: `5px solid ${a.borderColor}`, 
              boxShadow: "none" 
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: MUTED, fontWeight: 600 }}>
                    {a.patente}
                  </Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: 18, color: TEXT }}>
                    {a.vehiculo}
                  </Typography>
                </Box>
                <Chip
                  label={a.badge.label}
                  size="small"
                  sx={{ bgcolor: a.badge.bg, color: a.badge.color, fontWeight: 700, fontSize: 10 }}
                />
              </Stack>
              
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                {a.icon}
                <Typography sx={{ color: a.textColor, fontWeight: 600, fontSize: 14 }}>
                  {a.text}
                </Typography>
              </Stack>
              
              <Button 
                fullWidth 
                sx={{ ...greenBtn, mt: 2.5, py: 1 }}
                onClick={() => handleOpenModal(a)}
              >
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Bloque dividido: Turnos Programados + Agenda Semanal */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, 
        gap: 2.5 
      }}>
        
        {/* Turnos Programados */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 1.5 }}>
            Turnos Programados
          </Typography>
          <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f8fafc" }}>
                      {["VEHÍCULO", "FECHA PROPUESTA", "ESTADO"].map((h) => (
                        <TableCell key={h} sx={{ color: MUTED, fontWeight: 700, fontSize: 12, borderBottom: `1px solid ${BORDER}` }}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {turnos.map((t) => (
                      <TableRow key={t.patente}>
                        <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: "#f1f5f9", display: "grid", placeItems: "center" }}>
                              <DirectionsCarFilledIcon sx={{ color: MUTED, fontSize: 20 }} />
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 700, fontSize: 14, color: TEXT }}>{t.vehiculo}</Typography>
                              <Typography variant="caption" sx={{ color: MUTED, fontFamily: "monospace" }}>{t.patente}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, fontSize: 14, color: TEXT }}>
                          {t.fecha}
                        </TableCell>
                        <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                          <Chip
                            label={t.estado.label}
                            size="small"
                            sx={{ bgcolor: t.estado.bg, color: t.estado.color, fontWeight: 700, fontSize: 11 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Agenda Semanal */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
              Agenda Semanal
            </Typography>
          </Stack>

          <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none", flex: 1, display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", flexGrow: 1 }}>
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                {agenda.map((ev, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      bgcolor: ev.bg,
                      borderLeft: `4px solid ${ev.border}`,
                      borderRadius: 2,
                      px: 2,
                      py: 1.2,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: ev.border, fontWeight: 700, display: "block", mb: 0.5 }}>
                      {ev.day} | {ev.time} HS
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 14, color: TEXT }}>
                      {ev.title}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button 
                fullWidth 
                sx={{ ...blackBtn, py: 1.2, mt: "auto" }} 
                onClick={() => navigate("/dashboard-mecanico/calendario")}
              >
                Ir a agenda completa
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Modal / Dialog de Detalle de Alerta Calzado al de image_73d97c.jpg */}
      <Dialog 
        open={Boolean(selectedAlert)} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, p: 1, overflow: "hidden" }
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          {/* Cabecera del Modal */}
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 3, position: "relative" }}>
            <Box sx={{ color: RED, mt: 0.5 }}>
              <ReportProblemIcon sx={{ fontSize: 26 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20, color: TEXT, lineHeight: 1.2 }}>
                Detalle de Alerta: {selectedAlert?.tituloAlerta}
              </Typography>
              <Typography variant="caption" sx={{ color: MUTED, fontWeight: 600, fontSize: 12 }}>
                Vehículo: {selectedAlert?.vehiculo} ({selectedAlert?.patente})
              </Typography>
            </Box>
            <IconButton 
              onClick={handleCloseModal} 
              sx={{ position: "absolute", right: -8, top: -8, color: MUTED }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Divider sx={{ mx: -3, mb: 3 }} />

          {/* Bloque de Lectura: Kilometraje y Último Servicio */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5, mb: 3 }}>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: TEXT, mb: 1 }}>
                Kilometraje actual
              </Typography>
              <TextField
                fullWidth
                disabled
                value={selectedAlert?.kmActual || ""}
                variant="outlined"
                InputProps={{
                  sx: { 
                    bgcolor: "#f1f5f9", 
                    borderRadius: 2, 
                    "& .MuiOutlinedInput-inputDisabled": { WebkitTextFillColor: TEXT, fontWeight: 700 } 
                  }
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: TEXT, mb: 1 }}>
                Último Servicio
              </Typography>
              <TextField
                fullWidth
                disabled
                value={selectedAlert?.ultimoServicio || ""}
                variant="outlined"
                InputProps={{
                  sx: { 
                    bgcolor: "#f1f5f9", 
                    borderRadius: 2, 
                    "& .MuiOutlinedInput-inputDisabled": { WebkitTextFillColor: TEXT, fontWeight: 500 } 
                  }
                }}
              />
            </Box>
          </Box>

          {/* Bloque de Entrada: Proponer Turno */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: TEXT, mb: 1 }}>
              Proponer Turno
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
              <TextField
                type="date"
                fullWidth
                value={fechaTurno}
                onChange={(e) => setFechaTurno(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                select
                fullWidth
                value={horaTurno}
                onChange={(e) => setHoraTurno(e.target.value)}
                displayEmpty
                InputProps={{ sx: { borderRadius: 2 } }}
              >
                <MenuItem value="" disabled><span style={{ color: MUTED }}>Hora</span></MenuItem>
                <MenuItem value="08:00">08:00 AM</MenuItem>
                <MenuItem value="10:00">10:00 AM</MenuItem>
                <MenuItem value="12:00">12:00 PM</MenuItem>
                <MenuItem value="14:30">14:30 PM</MenuItem>
                <MenuItem value="16:00">16:00 PM</MenuItem>
              </TextField>
            </Box>
          </Box>

          {/* Acciones Inferiores */}
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button 
              onClick={handleCloseModal}
              sx={{ color: TEXT, fontWeight: 700, textTransform: "none" }}
            >
              Cancelar
            </Button>
            <Button 
              sx={{ ...modalGreenBtn, py: 1 }}
              onClick={handleProponerTurno}
            >
              Proponer turno
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

    </Box>
  );
}