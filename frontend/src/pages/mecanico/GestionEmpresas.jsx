import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

import { MUTED, GREEN, BLUE_BRAND, ORANGE_BRAND } from "../../constants/EmpresasMecanico";
import { empresasIniciales, gerentesIniciales, operariosMecanico, vehiculosMecanico } from "../../constants/EmpresasMecanico";

// Acciones (Buscadores y Botones)
import EmpresasActions from "../../components/mecanico/GestionEmpresas/EmpresasActions";
import GerentesActions from "../../components/mecanico/GestionEmpresas/GerentesActions";
import OperariosActions from "../../components/mecanico/GestionEmpresas/OperariosActions";
import VehiculosActions from "../../components/mecanico/GestionEmpresas/VehiculosActions";

// Tablas y Listas
import EmpresasTable from "../../components/mecanico/GestionEmpresas/EmpresasTable";
import GerentesList from "../../components/mecanico/GestionEmpresas/GerentesList";
import OperariosListMecanico from "../../components/mecanico/GestionEmpresas/OperariosListMecanico";
import VehiculosListMecanico from "../../components/mecanico/GestionEmpresas/VehiculosListMecanico";

// Menús y Dialogs
import EmpresaMenu from "../../components/mecanico/GestionEmpresas/EmpresaMenu";
import EmpresaFormDialog from "../../components/mecanico/GestionEmpresas/EmpresaFormDialog";
import GerenteFormDialog from "../../components/mecanico/GestionEmpresas/GerenteFormDialog";
import OperarioFormDialog from "../../components/mecanico/GestionEmpresas/OperarioFormDialog";
import VehiculoFormDialog from "../../components/mecanico/GestionEmpresas/VehiculoFormDialog";

import KpiCard from "../../components/mecanico/GestionEmpresas/KpiCardEmpresas";
import VistaToggle from "../../components/mecanico/GestionEmpresas/VistaToggle";

export default function GestionEmpresas() {
  const [empresas, setEmpresas] = useState(empresasIniciales);
  const [gerentes, setGerentes] = useState(gerentesIniciales);
  const [operarios, setOperarios] = useState(operariosMecanico);
  const [vehiculos, setVehiculos] = useState(vehiculosMecanico);

  const [queryEmpresas, setQueryEmpresas] = useState("");
  const [queryGerentes, setQueryGerentes] = useState("");
  const [queryOperarios, setQueryOperarios] = useState("");
  const [queryVehiculos, setQueryVehiculos] = useState("");

  const [vista, setVista] = useState("empresas");

  // Estados para modales de formularios individuales
  const [openEmpresaForm, setOpenEmpresaForm] = useState(false);
  const [openGerenteForm, setOpenGerenteForm] = useState(false);
  const [openOperarioForm, setOpenOperarioForm] = useState(false);
  const [openVehiculoForm, setOpenVehiculoForm] = useState(false);

  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [formDataEmpresa, setFormDataEmpresa] = useState({ razonSocial: "", cuit: "", gerente: "", email: "", vehiculos: 0, estado: "Activa" });
  const [formDataGerente, setFormDataGerente] = useState({ nombre: "", email: "", telefono: "", empresa: "", estado: "Activo" });
  const [formDataOperario, setFormDataOperario] = useState({ nombre: "", email: "", rol: "", empresa: "", estado: "Activo" });
  const [formDataVehiculo, setFormDataVehiculo] = useState({ modelo: "", patente: "", empresa: "", km: "", revision: "", estado: "Activo" });

  // Menú Tuerca Empresas
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);

  // Filtrados independientes
  const filtradas = useMemo(() => {
    const q = queryEmpresas.trim().toLowerCase();
    if (!q) return empresas;
    return empresas.filter(e => e.razonSocial.toLowerCase().includes(q) || e.cuit.toLowerCase().includes(q));
  }, [empresas, queryEmpresas]);

  const gerentesFiltrados = useMemo(() => {
    const q = queryGerentes.trim().toLowerCase();
    if (!q) return gerentes;
    return gerentes.filter(g => g.nombre.toLowerCase().includes(q) || g.empresa.toLowerCase().includes(q));
  }, [gerentes, queryGerentes]);

  const operariosFiltrados = useMemo(() => {
    const q = queryOperarios.trim().toLowerCase();
    if (!q) return operarios;
    return operarios.filter(o => o.nombre.toLowerCase().includes(q) || o.empresa.toLowerCase().includes(q));
  }, [operarios, queryOperarios]);

  const vehiculosFiltrados = useMemo(() => {
    const q = queryVehiculos.trim().toLowerCase();
    if (!q) return vehiculos;
    return vehiculos.filter(v => v.patente.toLowerCase().includes(q) || v.modelo.toLowerCase().includes(q) || v.empresa.toLowerCase().includes(q));
  }, [vehiculos, queryVehiculos]);

  const totalVehiculos = empresas.reduce((acc, e) => acc + Number(e.vehiculos || 0), 0);

  // Handlers de Guardado
  const handleSaveEmpresa = (e) => {
    e.preventDefault();
    if (editingEmpresa) {
      setEmpresas(empresas.map(emp => emp.id === editingEmpresa.id ? { ...emp, ...formDataEmpresa } : emp));
    } else {
      setEmpresas([...empresas, { id: Date.now(), ...formDataEmpresa }]);
    }
    setOpenEmpresaForm(false);
  };

  const handleSaveGerente = (e) => {
    e.preventDefault();
    setGerentes([...gerentes, { id: Date.now(), ...formDataGerente }]);
    setOpenGerenteForm(false);
  };

  const handleSaveOperario = (e) => {
    e.preventDefault();
    setOperarios([...operarios, { id: Date.now(), ...formDataOperario }]);
    setOpenOperarioForm(false);
  };

  const handleSaveVehiculo = (e) => {
    e.preventDefault();
    setVehiculos([...vehiculos, { id: Date.now(), ...formDataVehiculo }]);
    setOpenVehiculoForm(false);
  };

  // Menú Tuerca
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

      {/* KPIs */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
        <KpiCard title="EMPRESAS REGISTRADAS" value={empresas.length} unit="Empresas" accent={GREEN} icon={<BusinessIcon />} />
        <KpiCard title="FLOTA TOTAL" value={totalVehiculos} unit="Vehículos" accent={BLUE_BRAND} icon={<LocalShippingOutlinedIcon />} />
        <KpiCard title="GERENTES ACTIVOS" value={empresas.filter(e => e.estado !== "Inactiva").length} unit="Usuarios" accent={ORANGE_BRAND} icon={<SupervisorAccountOutlinedIcon />} />
      </Box>

      {/* Selector de Vistas (Tabs) */}
      <VistaToggle vista={vista} setVista={setVista} />

      {/* VISTA EMPRESAS */}
      {vista === "empresas" && (
        <>
          <EmpresasActions 
            query={queryEmpresas} 
            setQuery={setQueryEmpresas} 
            onCreate={() => { 
              setEditingEmpresa(null); 
              setFormDataEmpresa({ razonSocial: "", cuit: "", gerente: "", email: "", vehiculos: 0, estado: "Activa" }); 
              setOpenEmpresaForm(true); 
            }} 
          />
          <EmpresasTable filtradas={filtradas} onEdit={(emp) => { setEditingEmpresa(emp); setFormDataEmpresa({ ...emp }); setOpenEmpresaForm(true); }} onOpenMenu={handleOpenMenu} />
        </>
      )}

      {/* VISTA GERENTES */}
      {vista === "gerentes" && (
        <>
          <GerentesActions 
            query={queryGerentes} 
            setQuery={setQueryGerentes} 
            onCreate={() => { 
              setFormDataGerente({ nombre: "", email: "", telefono: "", empresa: "", estado: "Activo" }); 
              setOpenGerenteForm(true); 
            }} 
          />
          <GerentesList gerentes={gerentesFiltrados} />
        </>
      )}

      {/* VISTA OPERARIOS */}
      {vista === "operarios" && (
        <>
          <OperariosActions 
            query={queryOperarios} 
            setQuery={setQueryOperarios} 
            onCreate={() => { 
              setFormDataOperario({ nombre: "", email: "", rol: "", empresa: "", estado: "Activo" }); 
              setOpenOperarioForm(true); 
            }} 
          />
          <OperariosListMecanico operarios={operariosFiltrados} />
        </>
      )}

      {/* VISTA VEHÍCULOS */}
      {vista === "vehiculos" && (
        <>
          <VehiculosActions 
            query={queryVehiculos} 
            setQuery={setQueryVehiculos} 
            onCreate={() => { 
              setFormDataVehiculo({ modelo: "", patente: "", empresa: "", km: "0 km", revision: "Hoy", estado: "Activo" }); 
              setOpenVehiculoForm(true); 
            }} 
          />
          <VehiculosListMecanico vehiculos={vehiculosFiltrados} />
        </>
      )}

      {/* MENÚ CONTEXTUAL EMPRESAS */}
      <EmpresaMenu
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        onChangeEstado={handleChangeEstado}
        onBorrar={handleBorrarEmpresa}
      />

      {/* MODALES / DIALOGS */}
      <EmpresaFormDialog
        open={openEmpresaForm}
        onClose={() => setOpenEmpresaForm(false)}
        onSubmit={handleSaveEmpresa}
        formData={formDataEmpresa}
        setFormData={setFormDataEmpresa}
        editingEmpresa={editingEmpresa}
      />

      <GerenteFormDialog
        open={openGerenteForm}
        onClose={() => setOpenGerenteForm(false)}
        onSubmit={handleSaveGerente}
        formData={formDataGerente}
        setFormData={setFormDataGerente}
      />

      <OperarioFormDialog
        open={openOperarioForm}
        onClose={() => setOpenOperarioForm(false)}
        onSubmit={handleSaveOperario}
        formData={formDataOperario}
        setFormData={setFormDataOperario}
      />

      <VehiculoFormDialog
        open={openVehiculoForm}
        onClose={() => setOpenVehiculoForm(false)}
        onSubmit={handleSaveVehiculo}
        formData={formDataVehiculo}
        setFormData={setFormDataVehiculo}
      />

    </Box>
  );
}