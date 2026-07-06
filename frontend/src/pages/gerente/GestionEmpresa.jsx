import React, { useState } from "react";
import { Box, Typography, Stack, Button, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Menu, MenuItem, Card, CardContent, TextField, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow , Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import ErrorIcon from "@mui/icons-material/Error";
import BuildIcon from "@mui/icons-material/Build";

// Componentes propios
import KpiCard from "../../components/gerente/KpiCard"; // Reutilizamos el que creamos antes
import EstadoChip from "../../components/gerente/EstadoChip";
import AddOperarioDialog from "../../components/gerente/AddOperarioDialog";
import { COLORS, cardSx, buttonStyles } from "../../constants/Gerente";
import { EXTRA_COLORS } from "../../constants/Gerente";

export default function GestionGerente() {
  const [busqueda, setBusqueda] = useState("");

  const [operarios, setOperarios] = useState([
    { nombre: "Carlos Pérez", rol: "Mecánico Senior", email: "carlos@empresa.com", estado: "activo" },
    { nombre: "Lucía Gómez", rol: "Mecánica", email: "lucia@empresa.com", estado: "activo" },
    { nombre: "Martín Suárez", rol: "Electricista", email: "martin@empresa.com", estado: "activo" },
    { nombre: "Sofía Ramírez", rol: "Chapista", email: "sofia@empresa.com", estado: "inactivo" },
    { nombre: "Diego Fernández", rol: "Mecánico",email: "diego@empresa.com", estado: "activo" },
  ]);

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
  
  const vehiculosIniciales = [
    { patente: "AB123CD", modelo: "Scania R450", revision: "10/06/2026", estado: "Operativo" },
    { patente: "XY789ZT", modelo: "Mercedes Actros", revision: "02/06/2026", estado: "En taller" },
    { patente: "LM456OP", modelo: "Iveco Stralis", revision: "28/05/2026", estado: "Operativo" },
    { patente: "RT321QW", modelo: "VW Constellation", revision: "15/05/2026", estado: "Alerta" },
    { patente: "JK654HG", modelo: "Ford Cargo", revision: "20/06/2026", estado: "Operativo" },
    { patente: "QP987NM", modelo: "Renault Kerax", revision: "01/06/2026", estado: "Alerta" },
  ];

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
        <Card sx={{ ...cardSx, mb: 4 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Lista de Operarios</Typography>
                <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>Equipo registrado</Typography>
              </Box>
            
              <Button 
                startIcon={<AddIcon />} 
                variant="contained" 
                size="small" 
                onClick={() => setOpenDialog(true)} 
                sx={buttonStyles.blueBtn}
              >
                Agregar Operario
              </Button>
            </Stack>
           
            <List disablePadding>
              {operarios.map((o, index) => (
                <ListItem 
                  key={index} 
                  divider={index !== operarios.length - 1} 
                  sx={{ py: 1.5, pr: 6, alignItems: 'flex-start' }} // alignItems flex-start ayuda a que si el contenido crece, no se corte
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: o.estado === "activo" ? COLORS.GREEN : EXTRA_COLORS.GRAY }}>
                      {o.nombre.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                        {o.nombre}
                      </Typography>
                    }
                    secondary={
                      /* Usamos Box con flexWrap para asegurar que todo el contenido fluya */
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography sx={{ fontSize: 12, color: COLORS.MUTED }}>{o.rol}</Typography>
                        <Typography sx={{ fontSize: 12, color: COLORS.MUTED }}>• {o.email}</Typography>
                        <Chip 
                          label={o.estado} 
                          size="small" 
                          sx={{ 
                            height: 18, fontSize: 10, 
                            bgcolor: o.estado === "activo" ? "#dcfce7" : "#f1f5f9", 
                            color: o.estado === "activo" ? "#166534" : "#475569" 
                          }} 
                        />
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <IconButton onClick={(e) => handleMenuOpen(e, index)} edge="end">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleStatusChange("activo")}>Activo</MenuItem>
              <MenuItem onClick={() => handleStatusChange("inactivo")}>Inactivo</MenuItem>
            </Menu>
          </CardContent>
        </Card>

        {/* Tabla de Vehículos */}
        <Card sx={cardSx}>
          <CardContent>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18, color: COLORS.TEXT }}>Gestión de Vehículos</Typography>
                <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>Listado y estado actual de la flota</Typography>
              </Box>
              <TextField
                size="small"
                placeholder="Buscar patente o modelo"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: COLORS.MUTED, fontSize: 18 }} /></InputAdornment>),
                }}
                sx={{ minWidth: { xs: "100%", sm: 240 } }}
              />
            </Stack>

            <Box sx={{ overflowX: "auto" }}>
              {/* Mantenemos el minWidth para asegurar el scroll horizontal en pantallas muy estrechas */}
              <Table size="small" sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow>
                    {["VEHÍCULO", "ÚLTIMA REVISIÓN", "ESTADO"].map((h) => (
                      <TableCell 
                        key={h} 
                        sx={{ 
                          fontWeight: 700, 
                          color: COLORS.MUTED, 
                          fontSize: { xs: 10, md: 12 }, // Fuente más pequeña en móvil
                          px: { xs: 1, md: 2 },        // Padding más compacto
                          letterSpacing: 0.5 
                        }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehiculosFiltrados.map((v) => (
                    <TableRow key={v.patente}>
                      {/* Columna de Vehículo con padding ajustado */}
                      <TableCell sx={{ px: { xs: 1, md: 2 }, py: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {/* Icono (tamaño ligeramente reducido en móvil) */}
                          <Box sx={{ 
                            width: { xs: 30, md: 36 }, 
                            height: { xs: 30, md: 36 }, 
                            borderRadius: 2, 
                            bgcolor: COLORS.BG, 
                            border: `1px solid ${COLORS.BORDER}`, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            flexShrink: 0
                          }}>
                            <DirectionsCarIcon sx={{ color: COLORS.TEXT, fontSize: { xs: 16, md: 20 } }} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 700, color: COLORS.TEXT, fontSize: { xs: 12, md: 14 } }}>
                              {v.modelo}
                            </Typography>
                            <Typography sx={{ color: COLORS.MUTED, fontSize: { xs: 10, md: 12 } }}>
                              {v.patente}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      
                      <TableCell sx={{ color: COLORS.TEXT, fontSize: { xs: 11, md: 13 }, px: { xs: 1, md: 2 } }}>
                        {v.revision}
                      </TableCell>
                      
                      <TableCell sx={{ px: { xs: 1, md: 2 } }}>
                        <EstadoChip value={v.estado} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

          </CardContent>
          
        </Card>

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