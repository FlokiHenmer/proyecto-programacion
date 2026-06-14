import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  InputBase,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const YELLOW = "#fde68a";
const YELLOW_TEXT = "#92400e";
const GREEN_SOFT = "#dcfce7";
const GREEN_TEXT = "#166534";
const RED_BG = "#fee2e2";
const RED = "#dc2626";

// Nuevos colores institucionales alineados a tus capturas
const BLUE_BRAND = "#3b82f6"; 
const ORANGE_BRAND = "#f97316";

const empresasIniciales = [
  {
    id: 1,
    razonSocial: "Transportes del Sur S.A.",
    cuit: "30-71234567-8",
    gerente: "Martín Acosta",
    email: "m.acosta@transportesdelsur.com",
    vehiculos: 42,
    estado: "Activa",
  },
  {
    id: 2,
    razonSocial: "Logística Andina SRL",
    cuit: "33-70988123-4",
    gerente: "Carolina Méndez",
    email: "c.mendez@logandina.com.ar",
    vehiculos: 28,
    estado: "En Revisión",
  },
  {
    id: 3,
    razonSocial: "Cargas Pampeanas S.A.",
    cuit: "30-69875432-1",
    gerente: "Hernán Rivero",
    email: "h.rivero@cargaspampeanas.com",
    vehiculos: 56,
    estado: "Activa",
  },
  {
    id: 4,
    razonSocial: "Distribuidora Norte SA",
    cuit: "30-71456789-2",
    gerente: "Lucía Fernández",
    email: "l.fernandez@distrinorte.com",
    vehiculos: 16,
    estado: "En Revisión",
  },
];

function KpiCard({ title, value, unit, accent, icon }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        border: `1px solid ${BORDER}`,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <CardContent sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2, "&:last-child": { pb: 2.5 } }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "#f1f5f9",
            color: TEXT,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: MUTED, fontWeight: 700, letterSpacing: 0.6 }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 26, color: TEXT, lineHeight: 1.1 }}>
              {value}
            </Typography>
            <Typography sx={{ color: MUTED, fontWeight: 600, fontSize: 13 }}>
              {unit}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function EstadoChip({ estado }) {
  const map = {
    Activa: { bg: GREEN_SOFT, color: GREEN_TEXT },
    "En Revisión": { bg: YELLOW, color: YELLOW_TEXT },
    Inactiva: { bg: RED_BG, color: RED },
  };
  const s = map[estado] || { bg: "#f1f5f9", color: TEXT };
  return (
    <Chip
      label={estado}
      size="small"
      sx={{
        bgcolor: s.bg,
        color: s.color,
        fontWeight: 700,
        borderRadius: 2,
        px: 0.5,
      }}
    />
  );
}

export default function GestionEmpresas() {
  const [empresas, setEmpresas] = useState(empresasIniciales);
  const [query, setQuery] = useState("");

  // Estados para Modal de Formulario (Crear/Editar)
  const [openForm, setOpenForm] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [formData, setFormData] = useState({
    razonSocial: "",
    cuit: "",
    gerente: "",
    email: "",
    vehiculos: 0,
    estado: "Activa"
  });

  // Estados para Menú de Configuración (La Tuerca)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);

  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return empresas;
    return empresas.filter(
      (e) =>
        e.razonSocial.toLowerCase().includes(q) ||
        e.cuit.toLowerCase().includes(q)
    );
  }, [empresas, query]);

  const totalVehiculos = empresas.reduce((acc, e) => acc + Number(e.vehiculos || 0), 0);

  // Manejo de Modal Formulario
  const handleOpenCreate = () => {
    setEditingEmpresa(null);
    setFormData({ razonSocial: "", cuit: "", gerente: "", email: "", vehiculos: 0, estado: "Activa" });
    setOpenForm(true);
  };

  const handleOpenEdit = (empresa) => {
    setEditingEmpresa(empresa);
    setFormData({ ...empresa });
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (editingEmpresa) {
      setEmpresas(empresas.map(emp => emp.id === editingEmpresa.id ? { ...emp, ...formData } : emp));
    } else {
      const nueva = {
        id: Date.now(),
        ...formData
      };
      setEmpresas([...empresas, nueva]);
    }
    setOpenForm(false);
  };

  // Manejo de Menú de Configuración (Tuerca)
  const handleOpenMenu = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmpresaId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedEmpresaId(null);
  };

  const handleChangeEstado = (nuevoEstado) => {
    setEmpresas(empresas.map(emp => emp.id === selectedEmpresaId ? { ...emp, estado: nuevoEstado } : emp));
    handleCloseMenu();
  };

  const handleBorrarEmpresa = () => {
    setEmpresas(empresas.filter(emp => emp.id !== selectedEmpresaId));
    handleCloseMenu();
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Encabezado Superior */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
        <Box>
          <Typography variant="caption" sx={{ color: MUTED }}>
            Administrá los clientes de la plataforma, sus flotas y creá nuevos gerentes responsables para cada cuenta.
          </Typography>
        </Box>
      </Box>

      {/* KPIs Corregidos con los colores institucionales correctos */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
        <KpiCard title="EMPRESAS REGISTRADAS" value={empresas.length} unit="Empresas" accent={GREEN} icon={<BusinessIcon />} />
        <KpiCard title="FLOTA TOTAL" value={totalVehiculos} unit="Vehículos" accent={BLUE_BRAND} icon={<LocalShippingOutlinedIcon />} />
        <KpiCard title="GERENTES ACTIVOS" value={empresas.filter(e => e.estado !== "Inactiva").length} unit="Usuarios" accent={ORANGE_BRAND} icon={<SupervisorAccountOutlinedIcon />} />
      </Box>

      {/* Barra de Acciones */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 0.5, bgcolor: "#fff", border: `1px solid ${BORDER}`, borderRadius: 2, width: { xs: "100%", sm: 360 } }}>
          <SearchIcon sx={{ color: MUTED, fontSize: 20 }} />
          <InputBase
            placeholder="Buscar por razón social o CUIT..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ flex: 1, fontSize: 13, color: TEXT }}
          />
        </Box>
        <Button
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            bgcolor: GREEN,
            color: TEXT,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 2,
            px: 2.5,
            py: 0.8,
            boxShadow: "none",
            "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
          }}
        >
          Agregar Nueva Empresa
        </Button>
      </Box>

      {/* Tabla Contenedora */}
      <Card sx={{ borderRadius: 3, boxShadow: "none", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                {["Empresa", "Gerente Administrador", "Vehículos en Flota", "Estado", "Acciones"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{ color: MUTED, fontWeight: 700, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: `1px solid ${BORDER}` }}
                    align={h === "Vehículos en Flota" ? "center" : "left"}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtradas.map((e) => (
                <TableRow key={e.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                    <Typography sx={{ fontWeight: 700, color: TEXT, fontSize: 14 }}>{e.razonSocial}</Typography>
                    <Typography variant="caption" sx={{ color: MUTED }}>CUIT: {e.cuit}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                    <Typography sx={{ fontWeight: 600, color: TEXT, fontSize: 14 }}>{e.gerente}</Typography>
                    <Typography variant="caption" sx={{ color: MUTED }}>{e.email}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ borderBottom: `1px solid ${BORDER}` }}>
                    <Typography sx={{ fontWeight: 600, color: TEXT, fontSize: 15 }}>{e.vehiculos}</Typography>
                    <Typography variant="caption" sx={{ color: MUTED }}>unidades</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                    <EstadoChip estado={e.estado} />
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="Editar empresa">
                        <IconButton size="small" onClick={() => handleOpenEdit(e)} sx={{ color: MUTED, "&:hover": { color: TEXT, bgcolor: "#f1f5f9" } }}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Administrar Cuenta">
                        <IconButton size="small" onClick={(event) => handleOpenMenu(event, e.id)} sx={{ color: MUTED, "&:hover": { color: TEXT, bgcolor: "#f1f5f9" } }}>
                          <SettingsOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filtradas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5, color: MUTED }}>
                    No se encontraron empresas que coincidan con la búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Card>

      {/* MENU CONTEXTUAL PARA LA TUERCA */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} PaperProps={{ sx: { borderRadius: 2, border: `1px solid ${BORDER}`, boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" } }}>
        <MenuItem onClick={() => handleChangeEstado("Activa")}>
          <ListItemIcon><BusinessIcon fontSize="small" sx={{ color: GREEN_TEXT }} /></ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Activa</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleChangeEstado("En Revisión")}>
          <ListItemIcon><SupervisorAccountOutlinedIcon fontSize="small" sx={{ color: YELLOW_TEXT }} /></ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Poner En Revisión</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleChangeEstado("Inactiva")}>
          <ListItemIcon><LocalShippingOutlinedIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Inactiva</ListItemText>
        </MenuItem>
        <Box sx={{ my: 0.5, borderTop: `1px solid ${BORDER}` }} />
        <MenuItem onClick={handleBorrarEmpresa} sx={{ color: RED, "&:hover": { bgcolor: RED_BG } }}>
          <ListItemIcon><BusinessIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Eliminar Empresa</ListItemText>
        </MenuItem>
      </Menu>

      {/* MODAL FORMULARIO: CREAR / EDITAR */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
        <form onSubmit={handleSaveForm}>
          <DialogTitle sx={{ fontWeight: 800, color: TEXT, pb: 1 }}>
            {editingEmpresa ? "Editar Empresa" : "Registrar Nueva Empresa"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <Typography variant="caption" sx={{ color: MUTED, mb: 1 }}>
              Completá los datos fiscales y el contacto principal corporativo (Gerente de Flota).
            </Typography>
            <TextField
              label="Razón Social / Nombre de Empresa" required fullWidth size="small"
              value={formData.razonSocial} onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
            />
            <TextField
              label="CUIT" required fullWidth size="small" placeholder="30-XXXXXXXX-X"
              value={formData.cuit} onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <TextField
                label="Nombre del Gerente" required fullWidth size="small"
                value={formData.gerente} onChange={(e) => setFormData({ ...formData, gerente: e.target.value })}
              />
              <TextField
                label="Email Corporativo" required fullWidth size="small" type="email"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Box>
            <TextField
              label="Vehículos Iniciales en Flota" fullWidth size="small" type="number"
              value={formData.vehiculos} onChange={(e) => setFormData({ ...formData, vehiculos: e.target.value })}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
            <Button onClick={handleCloseForm} sx={{ color: MUTED, textTransform: "none", fontWeight: 700 }}>
              Cancelar
            </Button>
            <Button type="submit" sx={{ bgcolor: GREEN, color: TEXT, fontWeight: 700, textTransform: "none", px: 3, "&:hover": { bgcolor: GREEN_DARK } }}>
              {editingEmpresa ? "Guardar Cambios" : "Dar de Alta"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}