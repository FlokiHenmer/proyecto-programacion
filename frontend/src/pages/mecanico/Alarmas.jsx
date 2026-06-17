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

// Constantes de estilo
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

// Datos
const criticalAlerts = [
  { id: 1, patente: "ABC-123", vehiculo: "Toyota Hilux", badge: { label: "URGENTE", bg: RED_BG, color: RED }, icon: <BuildIcon sx={{ fontSize: 18, color: RED }} />, text: "Fallo en Sistema de Frenos", borderColor: RED, kmActual: "124,500 km", ultimoServicio: "15/07/2024" },
  { id: 2, patente: "XYZ-789", vehiculo: "Ford Ranger", badge: { label: "OBSERVACIÓN", bg: GRAY_BG, color: "#374151" }, icon: <OpacityIcon sx={{ fontSize: 18, color: YELLOW }} />, text: "Cambio de Aceite (Próximo)", borderColor: YELLOW, kmActual: "98,200 km", ultimoServicio: "10/01/2025" },
  { id: 3, patente: "MNO-456", vehiculo: "VW Amarok", badge: { label: "CONTROL", bg: GRAY_BG, color: "#374151" }, icon: <VerifiedIcon sx={{ fontSize: 18, color: GREEN_DARK }} />, text: "Mantenimiento Preventivo", borderColor: GREEN_DARK, kmActual: "64,000 km", ultimoServicio: "05/11/2025" },
];

const turnos = [
  { vehiculo: "Toyota Hilux", patente: "ABC-123", fecha: "15 Oct, 2026 - 09:00", estado: { label: "Aceptado", bg: GREEN_SOFT, color: "#166534" } },
  { vehiculo: "Ford Ranger", patente: "XYZ-789", fecha: "16 Oct, 2026 - 14:30", estado: { label: "Pendiente", bg: YELLOW_BG, color: "#92400e" } },
  { vehiculo: "Iveco Daily", patente: "JKL-012", fecha: "Inmediato", estado: { label: "Urgente", bg: RED_BG, color: RED }, },
];

const agenda = [
  { day: "LUN 14", time: "08:30", title: "Toyota Hilux - Frenos", bg: GREEN_SOFT, border: GREEN_DARK },
  { day: "MAR 15", time: "10:00", title: "Emergencia Motor - Scania", bg: RED_BG, border: RED },
];

// Estilos de botones (mantenidos)
const commonBtn = { fontWeight: 700, textTransform: "none", borderRadius: 2 };
const greenBtn = { ...commonBtn, bgcolor: GREEN, color: "#06210a", "&:hover": { bgcolor: GREEN_DARK } };
const blackBtn = { ...commonBtn, bgcolor: "#0b0f14", color: "#fff", "&:hover": { bgcolor: "#000" } };

export default function AlertasMecanico() {
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [fechaTurno, setFechaTurno] = useState("");
  const [horaTurno, setHoraTurno] = useState("");

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      {/* Alertas Críticas */}
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Panel de Alertas Críticas</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2, mb: 4 }}>
        {criticalAlerts.map((a) => (
          <Card key={a.id} sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, borderLeft: `5px solid ${a.borderColor}`, boxShadow: "none" }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: MUTED }}>{a.patente}</Typography>
                  <Typography sx={{ fontWeight: 800 }}>{a.vehiculo}</Typography>
                </Box>
                <Chip label={a.badge.label} size="small" sx={{ bgcolor: a.badge.bg, color: a.badge.color, fontWeight: 700, fontSize: 10 }} />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                {a.icon}
                <Typography sx={{ color: a.borderColor, fontWeight: 600, fontSize: 14 }}>{a.text}</Typography>
              </Stack>
              <Button fullWidth sx={greenBtn} onClick={() => setSelectedAlert(a)}>Ver detalles</Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Sección Inferior: Turnos + Agenda */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "2fr 1fr" }, gap: 3 }}>
        {/* Card de Turnos */}
        <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Turnos Programados</Typography>
            
            {/* ESTE BOX ES LA CLAVE PARA QUE NO DESBORDE */}
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <Table sx={{ minWidth: 400 }}> {/* MinWidth más bajo para que quepa en móviles */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 700 }}>VEHÍCULO</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 700 }}>FECHA</TableCell>
                    <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 700 }}>ESTADO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(turnos || []).map((t, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ py: 1.5 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>{t?.vehiculo}</Typography>
                        <Typography variant="caption" sx={{ fontSize: { xs: 10, sm: 12 } }}>{t?.patente}</Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, py: 1.5 }}>{t?.fecha}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Chip 
                          label={t?.estado?.label} 
                          size="small" 
                          sx={{ 
                            bgcolor: t?.estado?.bg, 
                            color: t?.estado?.color, 
                            fontWeight: 700,
                            fontSize: { xs: 10, sm: 11 }
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>

        {/* Card de Agenda */}
        <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Agenda Semanal</Typography>
            <Stack spacing={1}>
              {/* AGREGADO: (agenda || []).map */}
              {(agenda || []).map((ev, i) => (
                <Box key={i} sx={{ bgcolor: ev?.bg || "#fff", borderLeft: `4px solid ${ev?.border || BORDER}`, p: 1.5, borderRadius: 1 }}>
                  <Typography variant="caption" sx={{ color: ev?.border || MUTED, fontWeight: 700 }}>
                    {ev?.day || ""} | {ev?.time || ""} HS
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{ev?.title || "Sin título"}</Typography>
                </Box>
              ))}
              <Button fullWidth sx={{ ...blackBtn, mt: 2 }} onClick={() => navigate("/mecanico/calendario")}>
                Agenda completa
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Modal */}
      <Dialog open={Boolean(selectedAlert)} onClose={() => setSelectedAlert(null)} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Proponer Turno</Typography>
          <TextField fullWidth margin="normal" label="Vehículo" value={selectedAlert?.vehiculo || ""} InputProps={{ readOnly: true }} />
          <TextField fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} label="Fecha" value={fechaTurno} onChange={(e) => setFechaTurno(e.target.value)} />
          <Button fullWidth sx={{ ...greenBtn, mt: 3 }} onClick={() => setSelectedAlert(null)}>Confirmar</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}