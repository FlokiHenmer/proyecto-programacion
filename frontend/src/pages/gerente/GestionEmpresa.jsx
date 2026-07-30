import  { React , useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ErrorIcon from "@mui/icons-material/Error";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// Componentes propios
import KpiCard from "../../components/gerente/KpiCard"; // Reutilizamos el que creamos antes
import EstadoChip from "../../components/gerente/GestionEmpresa/EstadoChipVehiculos";
import AddOperarioDialog from "../../components/gerente/GestionEmpresa/AddOperarioDialog";
import OperariosList from "../../components/gerente/GestionEmpresa/OperariosList";
import VehiculosTable from "../../components/gerente/GestionEmpresa/VehiculosTable";
import { COLORS, EXTRA_COLORS, operariosIniciales, vehiculosIniciales } from "../../constants/Gerente";

export default function GestionGerente() {
  const [busqueda, setBusqueda] = useState("");

   const [operarios, setOperarios] = useState(operariosIniciales);

  const toggleEstado = (index) => {
    const nuevosOperarios = [...operarios];
    nuevosOperarios[index].estado = nuevosOperarios[index].estado === "activo" ? "inactivo" : "activo";
    setOperarios(nuevosOperarios);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoOperario, setNuevoOperario] = useState({ nombre: "", rol: "", email: "" });

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

  // Función para guardar el nuevo operario
  const handleSaveOperario = () => {
    setOperarios([...operarios, { ...nuevoOperario, estado: "activo" }]);
    setNuevoOperario({ nombre: "", rol: "", email: "" }); // Limpiar formulario
    setOpenDialog(false); // Cerrar dialog
  };
  
  const vehiculosFiltrados = vehiculosIniciales.filter(
    (v) =>
      v.patente.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.modelo.toLowerCase().includes(busqueda.toLowerCase())
  );

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
          <KpiCard title="Vehículos Taller" value="5" unit="en reparación" icon={<BuildIcon />} accent={EXTRA_COLORS.YELLOW} />
          <KpiCard title="Próx. Mantenimiento" value="8" unit="esta semana" icon={<DirectionsCarIcon />} accent={COLORS.GREEN} />
        </Box>

        {/* Lista de Operarios */}
        <OperariosList
          operarios={operarios}
          onAdd={() => setOpenDialog(true)}
          anchorEl={anchorEl}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          onStatusChange={handleStatusChange}
        />

        {/* Tabla de Vehículos */}
        <VehiculosTable
          vehiculos={vehiculosFiltrados}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />

        <AddOperarioDialog 
           open={openDialog} 
           onClose={() => setOpenDialog(false)} 
           onSave={handleSaveOperario}
           nuevoOperario={nuevoOperario}
           setNuevoOperario={setNuevoOperario}
        />
      </Box>
    </Box>
  );
}