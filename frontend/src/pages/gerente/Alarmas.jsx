import React, { useMemo, useState } from "react";
import {
  Box, Card, CardContent, Typography, Stack, Table, TableBody, TableCell, 
  TableHead, TableRow, Chip, TextField, InputAdornment
} from "@mui/material";

// Iconos instalados
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

// Función para definir colores por estado
const getEstadoColor = (estado) => {
  switch (estado) {
    case "Activa": return { bg: "#fee2e2", color: "#b91c1c" }; // Rojo suave
    case "En revisión": return { bg: "#fef3c7", color: "#b45309" }; // Fondo naranja claro, texto naranja oscuro // Amarillo suave
    case "Resuelta": return { bg: "#dcfce7", color: "#15803d" }; // Verde suave
    default: return { bg: "#f1f5f9", color: "#475569" };
  }
};

function KpiCard({ title, value, unit, icon, accent }) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${accent}` }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ color: MUTED, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>{title}</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: TEXT }}>{value}</Typography>
            <Typography sx={{ color: MUTED, fontSize: 11 }}>{unit}</Typography>
          </Box>
          <Box sx={{ color: accent, bgcolor: BG, p: 1, borderRadius: 2 }}>{icon}</Box>
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

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 }}>
        <KpiCard title="Total" value="27" unit="mensual" icon={<NotificationsActiveIcon />} accent={BLUE} />
        <KpiCard title="Críticas" value="6" unit="activas" icon={<ReportProblemIcon />} accent={RED} />
        <KpiCard title="Taller" value="9" unit="revisión" icon={<BuildIcon />} accent={YELLOW} />
        <KpiCard title="Resueltas" value="12" unit="éxito" icon={<VerifiedIcon />} accent={GREEN} />
      </Box>

      <Card sx={cardSx}>
        <CardContent>
          <TextField 
            fullWidth size="small" placeholder="Buscar por vehículo o ID..." 
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: MUTED }} />
                </InputAdornment>
              ),
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
                      <Chip 
                        label={a.estado} 
                        size="small" 
                        sx={{ 
                          fontWeight: 700, 
                          bgcolor: estilo.bg, 
                          color: estilo.color,
                          borderRadius: 1.5
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}