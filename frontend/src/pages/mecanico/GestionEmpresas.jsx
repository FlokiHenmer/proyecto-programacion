import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

import { MUTED, GREEN, BLUE_BRAND, ORANGE_BRAND } from "../../constants/EmpresasMecanico";
import { empresasIniciales } from "../../constants/EmpresasMecanico";
import EmpresasActions from "../../components/mecanico/EmpresasActions";
import EmpresasTable from "../../components/mecanico/EmpresasTable";
import EmpresaMenu from "../../components/mecanico/EmpresaMenu";
import EmpresaFormDialog from "../../components/mecanico/EmpresaFormDialog";
import KpiCard from "../../components/mecanico/KpiCardEmpresas";


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
      <EmpresasActions query={query} setQuery={setQuery} onCreate={handleOpenCreate} />

      {/* Tabla Contenedora Ajustada */}
      <EmpresasTable filtradas={filtradas} onEdit={handleOpenEdit} onOpenMenu={handleOpenMenu} />

      {/* MENU CONTEXTUAL PARA LA TUERCA */}
      <EmpresaMenu
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        onChangeEstado={handleChangeEstado}
        onBorrar={handleBorrarEmpresa}
      />

      {/* DIALOG FORMULARIO: CREAR / EDITAR */}
      <EmpresaFormDialog
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSaveForm}
        formData={formData}
        setFormData={setFormData}
        editingEmpresa={editingEmpresa}
      />

    </Box>
  );
}