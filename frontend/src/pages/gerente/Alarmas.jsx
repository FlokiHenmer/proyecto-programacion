import React, { useState, useMemo } from "react";
import {
  Box, Card, CardContent, Typography, Stack, TextField, InputAdornment,
  ToggleButton, ToggleButtonGroup
} from "@mui/material";
import { CriticidadChip } from "../../components/gerente/Alarma/CriticidadChip";
import { COLORS, EXTRA_COLORS, cardSx } from "../../constants/Gerente";
import { alarmasIniciales, alarmasActivas } from "../../constants/AlarmasGerente";
import KpiCard from "../../components/gerente/KpiCard";
import AlarmasTabla from "../../components/gerente/Alarma/AlarmasTabla";
import DetalleAlarmaDialog from "../../components/gerente/Alarma/DetalleAlarmaDialog";
import EditarAlarmaDialog from "../../components/gerente/Alarma/EditarAlarmaDialog";

// Iconos
import SearchIcon from "@mui/icons-material/Search"; 
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function AlarmasGerente() {
  const [search, setSearch] = useState("");
  const [filtroCriticidad, setFiltroCriticidad] = useState("todos");

  // Estados para los Diálogos
  const [openDetalle, setOpenDetalle] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [alarmaSeleccionada, setAlarmaSeleccionada] = useState(null);

  const handleVerDetalles = (alarma) => {
    setAlarmaSeleccionada(alarma);
    setOpenDetalle(true);
  };

  const handleEditarAlarma = (alarma) => {
    setAlarmaSeleccionada({ ...alarma });
    setOpenEditar(true);
  };

  const alarmasFiltradas = useMemo(() => {
    return alarmasIniciales.filter((a) => {
      const cumpleBusqueda = a.vehiculo.toLowerCase().includes(search.toLowerCase()) || 
                            a.id.toLowerCase().includes(search.toLowerCase()) ||
                            a.tipo.toLowerCase().includes(search.toLowerCase());
      
      if (filtroCriticidad === "criticas") return cumpleBusqueda && a.criticidad === "Crítica";
      if (filtroCriticidad === "no-criticas") return cumpleBusqueda && a.criticidad !== "Crítica";
      return cumpleBusqueda;
    });
  }, [search, filtroCriticidad]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Centro de Alarmas</Typography>

      {/* KPIs */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, 
        gap: 2, 
        mb: 4 
      }}>
        <KpiCard title="Total" value="27" unit="mensual" icon={<NotificationsActiveIcon />} accent={EXTRA_COLORS.BLUE} />
        <KpiCard title="Críticas" value="6" unit="activas" icon={<ReportProblemIcon />} accent={COLORS.RED} />
        <KpiCard title="Taller" value="9" unit="revisión" icon={<BuildIcon />} accent={EXTRA_COLORS.YELLOW} />
        <KpiCard title="Resueltas" value="12" unit="éxito" icon={<VerifiedIcon />} accent={COLORS.GREEN} />
      </Box>
      
      {/* Grid Principal */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "3fr 1fr" }, gap: 2 }}>
        
        {/* Columna Izquierda: Historial */}
        <Card sx={cardSx}>
          <CardContent>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} sx={{ mb: 2 }} spacing={5}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Historial de Alarmas</Typography>
                <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>Registro completo de incidencias</Typography>
              </Box>

              {/* ToggleButtonGroup */}
              <ToggleButtonGroup
                value={filtroCriticidad}
                exclusive
                onChange={(e, nuevoFiltro) => { if (nuevoFiltro) setFiltroCriticidad(nuevoFiltro); }}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": {
                    textTransform: "none",
                    fontWeight: 700,
                    color: COLORS.TEXT,
                    border: `1px solid ${COLORS.BORDER}`,
                    borderRadius: 2,
                    px: 3,
                  },
                  "& .Mui-selected": { bgcolor: `${COLORS.GREEN} !important`, color: "#000 !important" },
                }}
              >
                <ToggleButton value="todos">Todas</ToggleButton>
                <ToggleButton value="criticas">Críticas</ToggleButton>
                <ToggleButton value="no-criticas">No críticas</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            
            <TextField 
              fullWidth size="small" placeholder="Buscar por vehículo, ID o tipo..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: COLORS.MUTED }} /></InputAdornment>),
              }}
              sx={{ mb: 2 }}
            />
            
            <AlarmasTabla 
              alarmas={alarmasFiltradas} 
              onVerDetalles={handleVerDetalles} 
              onEditarAlarma={handleEditarAlarma} 
            />

          </CardContent>
        </Card>
       
        {/* Columna Derecha: Alarmas Activas */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", height: "64px", mb: 2 }}>
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
                  <Typography sx={{ color: COLORS.MUTED, fontSize: 12, mt: 0.5 }}>{a.motivo}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Diálogos Modulares */}
      <DetalleAlarmaDialog 
        open={openDetalle} 
        onClose={() => setOpenDetalle(false)} 
        alarma={alarmaSeleccionada} 
      />

      <EditarAlarmaDialog 
        open={openEditar} 
        onClose={() => setOpenEditar(false)} 
        alarma={alarmaSeleccionada} 
      />

    </Box>
  );
}