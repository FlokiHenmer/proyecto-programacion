import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,     
  MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";

// Iconos
import AddIcon from "@mui/icons-material/Add";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import ErrorIcon from "@mui/icons-material/Error";

const GREEN = "#44FF34";
const GRAY = "#94a3b8";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const BG = "#f8fafc";
const BLUE = "#0ea5e9";
const RED = "#dc2626";
const YELLOW = "#f59e0b";

const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff",
};

const greenBtn = {
  bgcolor: GREEN,
  color: TEXT,
  fontWeight: 800,
  textTransform: "none",
  borderRadius: 2,
  px: 2,
  "&:hover": { bgcolor: "#36e028" },
};

// nueva constante de estilo
const blueBtn = {
  bgcolor: "#4e9cef", 
  color: "#fff",
  fontWeight: 800,
  textTransform: "none",
  borderRadius: 2,
  px: 2,
  "&:hover": { bgcolor: "#3088e7" }, 
};

function KpiCard({ title, value, unit, icon, accent }) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${accent}` }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <Typography sx={{ color: MUTED, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>{title}</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 800, mt: 0.5, color: TEXT }}>{value}</Typography>
            <Typography sx={{ color: MUTED, fontSize: 12 }}>{unit}</Typography>
          </Box>
          <Box sx={{ color: accent, p: 1, borderRadius: 2, bgcolor: BG, flexShrink: 0 }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function EstadoChip({ value }) {
  const map = {
    Operativo: { bg: "#dcfce7", color: "#166534" },
    "En taller": { bg: "#fef3c7", color: "#92400e" },
    Alerta: { bg: "#fee2e2", color: "#b91c1c" },
  };
  const s = map[value] || map.Operativo;
  return <Chip label={value} size="small" sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: 11 }} />;
}

export default function GestionGerente() {
  // --- LOS HOOKS DEBEN IR AQUÍ, DENTRO DEL COMPONENTE ---
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

  // Agrega estos estados para manejar el menú
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Agrega estas funciones (puedes ponerlas junto a tus otras funciones)
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

  // Estado para controlar el Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoOperario, setNuevoOperario] = useState({ nombre: "", rol: "", email: "" });

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
    <Box sx={{ minHeight: "100vh", bgcolor: BG }}>
      <Box sx={{ maxWidth: 1280, mx: "auto", p: { xs: 1.5, md: 3 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Panel de Gestión</Typography>
            <Typography sx={{ color: MUTED, fontSize: 14 }}>Administra vehículos, operarios y alertas</Typography>
          </Box>
        </Stack>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2, mb: 4 }}>
          <KpiCard title="Operarios Activos" value={operarios.filter(o => o.estado === "activo").length} unit="trabajando hoy" icon={<GroupIcon />} accent={BLUE} />
          <KpiCard title="Operarios Inactivos" value={operarios.filter(o => o.estado === "inactivo").length} unit="en descanso" icon={<ErrorIcon />} accent={RED} />
          <KpiCard title="Vehículos Taller" value="5" unit="en reparación" icon={<BuildIcon />} accent={YELLOW} />
          <KpiCard title="Próx. Mantenimiento" value="8" unit="esta semana" icon={<DirectionsCarIcon />} accent={GREEN} />
        </Box>

        {/* Lista de Operarios */}
        <Card sx={{ ...cardSx, mb: 4 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Lista de Operarios</Typography>
                <Typography sx={{ color: MUTED, fontSize: 13 }}>Equipo registrado</Typography>
              </Box>
            
              <Button 
                startIcon={<AddIcon />} 
                variant="contained" 
                size="small" 
                onClick={() => setOpenDialog(true)} 
                sx={blueBtn}
              >
                Agregar Operario
              </Button>
            </Stack>
           
            <List disablePadding>
              {operarios.map((o, index) => (
                <ListItem key={index} divider={index !== operarios.length - 1} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: o.estado === "activo" ? GREEN : GRAY }}>
                      {o.nombre.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 700 }}>{o.nombre}</Typography>}
                    secondary={
                      <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                        <Typography sx={{ fontSize: 12 }}>{o.rol}</Typography>
                        <Typography sx={{ fontSize: 12, color: MUTED }}>• {o.email}</Typography>
                        <Chip label={o.estado} size="small" sx={{ height: 20, fontSize: 10, bgcolor: o.estado === "activo" ? "#dcfce7" : "#f1f5f9", color: o.estado === "activo" ? "#166534" : "#475569" }} />
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={(e) => handleMenuOpen(e, index)}>
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
  

        {/* Lista de vehículos */}
        <Card sx={cardSx}>
            <CardContent>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 18, color: TEXT }}>Gestión de Vehículos</Typography>
                  <Typography sx={{ color: MUTED, fontSize: 13 }}>Listado y estado actual de la flota</Typography>
                </Box>
                <TextField
                  size="small"
                  placeholder="Buscar patente o modelo"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: MUTED, fontSize: 18 }} /></InputAdornment>),
                  }}
                  sx={{ minWidth: { xs: "100%", sm: 240 } }}
                />
              </Stack>
              <Box sx={{ overflowX: "auto" }}>
                <Table size="small" sx={{ minWidth: 560 }}>
                  <TableHead>
                    <TableRow>
                      {["VEHÍCULO", "ÚLTIMA REVISIÓN", "ESTADO"].map((h) => (
                        <TableCell key={h} sx={{ fontWeight: 700, color: MUTED, fontSize: 12, letterSpacing: 0.5 }}>{h}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehiculosFiltrados.map((v) => (
                      <TableRow key={v.patente}>
                        <TableCell>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: BG, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <DirectionsCarIcon sx={{ color: TEXT, fontSize: 20 }} />
                            </Box>
                            <Box>
                              <Typography sx={{ fontWeight: 700, color: TEXT, fontSize: 14 }}>{v.modelo}</Typography>
                              <Typography sx={{ color: MUTED, fontSize: 12 }}>{v.patente}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: TEXT, fontSize: 13 }}>{v.revision}</TableCell>
                        <TableCell><EstadoChip value={v.estado} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>

      </Box>
      
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 800 }}>Nuevo Operario</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Nombre" fullWidth size="small" 
              onChange={(e) => setNuevoOperario({...nuevoOperario, nombre: e.target.value})} 
            />
            <TextField label="Ocupación" fullWidth size="small" 
              onChange={(e) => setNuevoOperario({...nuevoOperario, rol: e.target.value})} 
            />
            <TextField label="Correo" fullWidth size="small" 
              onChange={(e) => setNuevoOperario({...nuevoOperario, email: e.target.value})} 
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          {/* Cancelar: en minúscula y color MUTED */}
          <Button 
            onClick={() => setOpenDialog(false)} 
            sx={{ textTransform: "none", color: MUTED }}
          >
            Cancelar
          </Button>
          
          {/* Guardar: peso de fuente reducido (fontWeight: 500) */}
          <Button 
            variant="contained" 
            onClick={handleSaveOperario} 
            sx={{ ...greenBtn, fontWeight: 600 }} 
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}