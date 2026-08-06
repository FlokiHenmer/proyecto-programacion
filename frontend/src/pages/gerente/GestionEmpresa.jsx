import React, { useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ErrorIcon from "@mui/icons-material/Error";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// Componentes propios
import KpiCard from "../../components/gerente/KpiCard";
import AddOperarioDialog from "../../components/gerente/GestionEmpresa/AddOperarioDialog";
import OperariosList from "../../components/gerente/GestionEmpresa/OperariosList";
import VehiculosTable from "../../components/gerente/GestionEmpresa/VehiculosTable";
import { COLORS, EXTRA_COLORS, operariosIniciales, vehiculosIniciales, historialFormularios } from "../../constants/Gerente";
import OperarioHistorialDetalle from "../../components/gerente/GestionEmpresa/OperarioHistorialDetalle";
import VehiculoHistorialGerente from "../../components/gerente/GestionEmpresa/VehiculoHistorialGerente";
import VistaToggleGestion from "../../components/gerente/GestionEmpresa/VistaToggleGestion";

export default function GestionGerente() {
  const [busqueda, setBusqueda] = useState("");  
  const [vista, setVista] = useState("operarios");

  const [operarios, setOperarios] = useState(operariosIniciales);

  const [operarioSel, setOperarioSel] = useState(null);
  const [vehiculoSel, setVehiculoSel] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [operarioData, setOperarioData] = useState({ nombre: "", rol: "", email: "" });

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleStatusChange = (nuevoEstado) => {
    const nuevosOperarios = [...operarios];
    nuevosOperarios[selectedIndex].estado = nuevoEstado;
    setOperarios(nuevosOperarios);
    handleMenuClose();
  };

  // Función para eliminar operario usando el índice seleccionado de la tuerca
  const handleDeleteOperario = () => {
    if (selectedIndex !== null) {
      const nuevosOperarios = operarios.filter((_, i) => i !== selectedIndex);
      setOperarios(nuevosOperarios);
      handleMenuClose();
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setOperarioData({ nombre: "", rol: "", email: "" });
    setOpenDialog(true);
  };

  const handleOpenEdit = (operario, index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setOperarioData({ ...operario });
    setOpenDialog(true);
  };

  const handleSaveOperario = () => {
    if (isEditing && editingIndex !== null) {
      const nuevosOperarios = [...operarios];
      nuevosOperarios[editingIndex] = { ...nuevosOperarios[editingIndex], ...operarioData };
      setOperarios(nuevosOperarios);
    } else {
      setOperarios([...operarios, { ...operarioData, estado: "activo" }]);
    }
    setOpenDialog(false);
    setIsEditing(false);
    setEditingIndex(null);
    setOperarioData({ nombre: "", rol: "", email: "" });
  };
  
  const vehiculosFiltrados = vehiculosIniciales.filter(
    (v) =>
      v.patente.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const registrosOperario = useMemo(
    () => historialFormularios.filter((r) => r.operario === operarioSel?.nombre),
    [operarioSel]
  );

  const registrosVehiculo = useMemo(
    () => historialFormularios.filter((r) => r.patente === vehiculoSel?.patente),
    [vehiculoSel]
  );

  const handleCambiarVista = (v) => {
    setVista(v);
    setOperarioSel(null);
    setVehiculoSel(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: COLORS.BG }}>
      <Box sx={{ maxWidth: 1280, mx: "auto", p: { xs: 1.5, md: 3 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Panel de Gestión</Typography>
            <Typography sx={{ color: COLORS.MUTED, fontSize: 14 }}>Administra vehículos, operarios y alertas</Typography>
          </Box>
        </Stack>

        {/* KPIs */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2, mb: 4 }}>
          <KpiCard title="Operarios Activos" value={operarios.filter(o => o.estado === "activo").length} unit="trabajando hoy" icon={<GroupIcon />} accent={EXTRA_COLORS.BLUE} />
          <KpiCard title="Operarios Inactivos" value={operarios.filter(o => o.estado === "inactivo").length} unit="en descanso" icon={<ErrorIcon />} accent={EXTRA_COLORS.RED} />
          <KpiCard title="Vehículos En Taller" value="5" unit="en reparación" icon={<BuildIcon />} accent={EXTRA_COLORS.YELLOW} />
          <KpiCard title="Próx. Mantenimiento" value="8" unit="esta semana" icon={<DirectionsCarIcon />} accent={COLORS.GREEN} />
        </Box>

        <VistaToggleGestion vista={vista} setVista={handleCambiarVista} />

        {vista === "operarios" ? (
          operarioSel ? (
            <OperarioHistorialDetalle
              operario={operarioSel}
              registros={registrosOperario}
              onVolver={() => setOperarioSel(null)}
            />
          ) : (
            <OperariosList
              operarios={operarios}
              onAdd={handleOpenAdd}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteOperario}
              anchorEl={anchorEl}
              onMenuOpen={handleMenuOpen}
              onMenuClose={handleMenuClose}
              onStatusChange={handleStatusChange}
              onVerHistorial={(o) => setOperarioSel(o)}
            />
          )
        ) : vehiculoSel ? (
          <VehiculoHistorialGerente
            vehiculo={vehiculoSel}
            registros={registrosVehiculo}
            onVolver={() => setVehiculoSel(null)}
          />
        ) : (
          <VehiculosTable
            vehiculos={vehiculosFiltrados}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            onVerHistorial={(v) => setVehiculoSel(v)}
          />
        )}

        <AddOperarioDialog 
           open={openDialog} 
           onClose={() => setOpenDialog(false)} 
           onSave={handleSaveOperario}
           operarioData={operarioData}
           setOperarioData={setOperarioData}
           isEditing={isEditing}
        />
      </Box>
    </Box>
  );
}