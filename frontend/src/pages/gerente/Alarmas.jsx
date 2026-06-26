import React, { useMemo, useState } from "react";
import {
  Box, Card, CardContent, Typography, Stack, Table, TableBody, TableCell, 
  TableHead, TableRow, Chip, TextField, InputAdornment, Button
} from "@mui/material";

// Iconos
import SearchIcon from "@mui/icons-material/Search"; 
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const BG = "#f8fafc";
const RED = "#dc2626";
const YELLOW = "#f59e0b";
const BLUE = "#0ea5e9";
const GREEN = "#44FF34";

const cardSx = { borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none", bgcolor: "#fff" };

const alarmasIniciales = [
  { id: "ALR-1042", vehiculo: "Scania R450", patente: "AB123CD", tipo: "Falla de Frenos", estado: "Activa" },
  { id: "ALR-1041", vehiculo: "Mercedes Actros", patente: "XY789ZT", tipo: "Temperatura", estado: "En revisión" },
  { id: "ALR-1040", vehiculo: "Iveco Stralis", patente: "LM456OP", tipo: "Aceite", estado: "Resuelta" },
];

const alarmasActivas = [
  { vehiculo: "VW Constellation (RT321QW)", motivo: "Presión de aceite baja", criticidad: "Crítica" },
  { vehiculo: "Renault Kerax (QP987NM)", motivo: "Temperatura motor alta", criticidad: "Crítica" },
];

const getEstadoColor = (estado) => {
  switch (estado) {
    case "Activa": return { bg: "#fee2e2", color: "#b91c1c" };
    case "En revisión": return { bg: "#fef3c7", color: "#b45309" };
    case "Resuelta": return { bg: "#dcfce7", color: "#15803d" };
    default: return { bg: "#f1f5f9", color: "#475569" };
  }
};

function CriticidadChip({ value }) {
  const map = {
    Crítica: { bg: "#fee2e2", color: "#b91c1c" },
    Media: { bg: "#fef3c7", color: "#92400e" },
    Baja: { bg: "#dcfce7", color: "#166534" },
  };
  const s = map[value] || map.Media;
  return <Chip label={value} size="small" sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: 11 }} />;
}

// Componente para KPIs
function KpiCard({ title, value, unit, icon, accent }) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${accent}` }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ flexGrow: 1, mr: 2 }}> 
            <Typography sx={{ color: MUTED, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{title}</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 800, mt: 0.5 }}>{value}</Typography>
            <Typography sx={{ color: MUTED, fontSize: 12 }}>{unit}</Typography>
          </Box>
          <Box sx={{ color: accent, p: 1, borderRadius: 2, bgcolor: BG, flexShrink: 0 }}>{icon}</Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function AlarmasGerente() {
  const [search, setSearch] = useState("");

  const alarmasFiltradas = useMemo(() => {
    return alarmasIniciales.filter((a) => 
      a.vehiculo.toLowerCase().includes(search.toLowerCase()) || 
      a.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Centro de Alarmas</Typography>

      {/* KPIs */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 }}>
              <KpiCard title="Total" value="27" unit="mensual" icon={<NotificationsActiveIcon />} accent={BLUE} />
              <KpiCard title="Críticas" value="6" unit="activas" icon={<ReportProblemIcon />} accent={RED} />
              <KpiCard title="Taller" value="9" unit="revisión" icon={<BuildIcon />} accent={YELLOW} />
              <KpiCard title="Resueltas" value="12" unit="éxito" icon={<VerifiedIcon />} accent={GREEN} />
      </Box>
      
      {/* Grid Principal */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3 }}>
        
        {/* Columna Izquierda: Historial */}
        <Card sx={cardSx}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Historial de Alarmas</Typography>
                <Typography sx={{ color: MUTED, fontSize: 13 }}>Registro completo de incidencias</Typography>
              </Box>
            </Stack>
            
            <TextField 
              fullWidth size="small" placeholder="Buscar por vehículo o ID..." 
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: MUTED }} /></InputAdornment>),
              }}
              sx={{ mb: 2 }}
            />
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>VEHÍCULO</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>TIPO</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>ESTADO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alarmasFiltradas.map((a) => {
                  const estilo = getEstadoColor(a.estado);
                  return (
                    <TableRow key={a.id}>
                      <TableCell>{a.id}</TableCell>
                      <TableCell>
                        <DirectionsCarFilledIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle', color: MUTED }}/> 
                        {a.vehiculo}
                      </TableCell>
                      <TableCell>{a.tipo}</TableCell>
                      <TableCell>
                        <Chip label={a.estado} size="small" sx={{ fontWeight: 700, bgcolor: estilo.bg, color: estilo.color, borderRadius: 1.5 }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
       
        {/* Columna Derecha: Alarmas Activas */}
        <Box>
          {/* Esta caja ahora tiene la misma altura y alineación que el encabezado de la izquierda */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            height: "64px", // Ajusta esta altura para que coincida exactamente con el encabezado de la tabla
            mb: 2 
          }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Alarmas Activas</Typography>
          </Box>

          <Stack spacing={2}>
            {alarmasActivas.map((a) => (
              <Card key={a.vehiculo} sx={cardSx}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{a.vehiculo}</Typography>
                    <CriticidadChip value={a.criticidad} />
                  </Stack>
                  <Typography sx={{ color: MUTED, fontSize: 12, mt: 0.5 }}>{a.motivo}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}