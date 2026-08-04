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

import KpiCard from "../../components/mecanico/GestionEmpresas/KpiCardEmpresas";
import VistaToggle from "../../components/mecanico/GestionEmpresas/VistaToggle";
import GestionEmpresasModales from "../../components/mecanico/GestionEmpresas/GestionEmpresasModales";

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

  const [openEmpresaForm, setOpenEmpresaForm] = useState(false);
  const [openGerenteForm, setOpenGerenteForm] = useState(false);
  const [openOperarioForm, setOpenOperarioForm] = useState(false);
  const [openVehiculoForm, setOpenVehiculoForm] = useState(false);

  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [editingGerente, setEditingGerente] = useState(null);
  const [editingOperario, setEditingOperario] = useState(null);
  const [editingVehiculo, setEditingVehiculo] = useState(null);

  const [formDataEmpresa, setFormDataEmpresa] = useState({ razonSocial: "", cuit: "", gerente: "", email: "", vehiculos: 0, estado: "Activa" });
  const [formDataGerente, setFormDataGerente] = useState({ nombre: "", email: "", telefono: "", empresa: "", estado: "Activo" });
  const [formDataOperario, setFormDataOperario] = useState({ nombre: "", email: "", rol: "", empresa: "", estado: "Activo" });
  const [formDataVehiculo, setFormDataVehiculo] = useState({ modelo: "", patente: "", empresa: "", km: "", revision: "", estado: "Activo" });

  // ESTADOS MENÚS CONTEXTUALES
  const [anchorElEmpresa, setAnchorElEmpresa] = useState(null);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  const [anchorElGerente, setAnchorElGerente] = useState(null);
  const [selectedGerenteId, setSelectedGerenteId] = useState(null);
  const [anchorElOperario, setAnchorElOperario] = useState(null);
  const [selectedOperarioId, setSelectedOperarioId] = useState(null);
  const [anchorElVehiculo, setAnchorElVehiculo] = useState(null);
  const [selectedVehiculoId, setSelectedVehiculoId] = useState(null);

  // Filtrados
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

  // Handlers Creación
  const handleOpenCreateEmpresa = () => { setEditingEmpresa(null); setFormDataEmpresa({ razonSocial: "", cuit: "", gerente: "", email: "", vehiculos: 0, estado: "Activa" }); setOpenEmpresaForm(true); };
  const handleOpenCreateGerente = () => { setEditingGerente(null); setFormDataGerente({ nombre: "", email: "", telefono: "", empresa: "", estado: "Activo" }); setOpenGerenteForm(true); };
  const handleOpenCreateOperario = () => { setEditingOperario(null); setFormDataOperario({ nombre: "", email: "", rol: "", empresa: "", estado: "Activo" }); setOpenOperarioForm(true); };
  const handleOpenCreateVehiculo = () => { setEditingVehiculo(null); setFormDataVehiculo({ modelo: "", patente: "", empresa: "", km: "", revision: "", estado: "Activo" }); setOpenVehiculoForm(true); };

  // Handlers Guardado
  const handleSaveEmpresa = (e) => { e.preventDefault(); if (editingEmpresa) { setEmpresas(empresas.map(emp => emp.id === editingEmpresa.id ? { ...emp, ...formDataEmpresa } : emp)); } else { setEmpresas([...empresas, { id: Date.now(), ...formDataEmpresa }]); } setOpenEmpresaForm(false); };
  const handleSaveGerente = (e) => { e.preventDefault(); if (editingGerente) { setGerentes(gerentes.map(g => g.id === editingGerente.id ? { ...g, ...formDataGerente } : g)); } else { setGerentes([...gerentes, { id: Date.now(), ...formDataGerente }]); } setOpenGerenteForm(false); };
  const handleSaveOperario = (e) => { e.preventDefault(); if (editingOperario) { setOperarios(operarios.map(o => o.id === editingOperario.id ? { ...o, ...formDataOperario } : o)); } else { setOperarios([...operarios, { id: Date.now(), ...formDataOperario }]); } setOpenOperarioForm(false); };
  const handleSaveVehiculo = (e) => { e.preventDefault(); if (editingVehiculo) { setVehiculos(vehiculos.map(v => v.id === editingVehiculo.id ? { ...v, ...formDataVehiculo } : v)); } else { setVehiculos([...vehiculos, { id: Date.now(), ...formDataVehiculo }]); } setOpenVehiculoForm(false); };

  // Handlers Menús
  const handleOpenMenuEmpresa = (event, id) => { setAnchorElEmpresa(event.currentTarget); setSelectedEmpresaId(id); };
  const handleCloseMenuEmpresa = () => { setAnchorElEmpresa(null); setSelectedEmpresaId(null); };
  const handleChangeEstadoEmpresa = (nuevoEstado) => { setEmpresas(empresas.map(emp => emp.id === selectedEmpresaId ? { ...emp, estado: nuevoEstado } : emp)); handleCloseMenuEmpresa(); };
  const handleBorrarEmpresa = () => { setEmpresas(empresas.filter(emp => emp.id !== selectedEmpresaId)); handleCloseMenuEmpresa(); };

  const handleOpenMenuGerente = (event, id) => { setAnchorElGerente(event.currentTarget); setSelectedGerenteId(id); };
  const handleCloseMenuGerente = () => { setAnchorElGerente(null); setSelectedGerenteId(null); };
  const handleChangeEstadoGerente = (nuevoEstado) => { setGerentes(gerentes.map(g => g.id === selectedGerenteId ? { ...g, estado: nuevoEstado } : g)); handleCloseMenuGerente(); };
  const handleBorrarGerente = () => { setGerentes(gerentes.filter(g => g.id !== selectedGerenteId)); handleCloseMenuGerente(); };

  const handleOpenMenuOperario = (event, id) => { setAnchorElOperario(event.currentTarget); setSelectedOperarioId(id); };
  const handleCloseMenuOperario = () => { setAnchorElOperario(null); setSelectedOperarioId(null); };
  const handleChangeEstadoOperario = (nuevoEstado) => { setOperarios(operarios.map(o => o.id === selectedOperarioId ? { ...o, estado: nuevoEstado } : o)); handleCloseMenuOperario(); };
  const handleBorrarOperario = () => { setOperarios(operarios.filter(o => o.id !== selectedOperarioId)); handleCloseMenuOperario(); };

  const handleOpenMenuVehiculo = (event, id) => { setAnchorElVehiculo(event.currentTarget); setSelectedVehiculoId(id); };
  const handleCloseMenuVehiculo = () => { setAnchorElVehiculo(null); setSelectedVehiculoId(null); };
  const handleChangeEstadoVehiculo = (nuevoEstado) => { setVehiculos(vehiculos.map(v => v.id === selectedVehiculoId ? { ...v, estado: nuevoEstado } : v)); handleCloseMenuVehiculo(); };
  const handleBorrarVehiculo = () => { setVehiculos(vehiculos.filter(v => v.id !== selectedVehiculoId)); handleCloseMenuVehiculo(); };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Typography variant="caption" sx={{ color: MUTED }}>
          Administrá los clientes de la plataforma, sus flotas y creá nuevos responsables para cada cuenta.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2.5 }}>
        <KpiCard title="EMPRESAS REGISTRADAS" value={empresas.length} unit="Empresas" accent={GREEN} icon={<BusinessIcon />} />
        <KpiCard title="FLOTA TOTAL" value={totalVehiculos} unit="Vehículos" accent={BLUE_BRAND} icon={<LocalShippingOutlinedIcon />} />
        <KpiCard title="GERENTES ACTIVOS" value={empresas.filter(e => e.estado !== "Inactiva").length} unit="Usuarios" accent={ORANGE_BRAND} icon={<SupervisorAccountOutlinedIcon />} />
      </Box>

      <VistaToggle vista={vista} setVista={setVista} />

      {vista === "empresas" && (
        <>
          <EmpresasActions query={queryEmpresas} setQuery={setQueryEmpresas} onCreate={handleOpenCreateEmpresa} onOpenForm={handleOpenCreateEmpresa} />
          <EmpresasTable filtradas={filtradas} onEdit={(emp) => { setEditingEmpresa(emp); setFormDataEmpresa({ ...emp }); setOpenEmpresaForm(true); }} onOpenMenu={handleOpenMenuEmpresa} />
        </>
      )}

      {vista === "gerentes" && (
        <>
          <GerentesActions query={queryGerentes} setQuery={setQueryGerentes} onCreate={handleOpenCreateGerente} onOpenForm={handleOpenCreateGerente} />
          <GerentesList gerentes={gerentesFiltrados} onEdit={(g) => { setEditingGerente(g); setFormDataGerente({ ...g }); setOpenGerenteForm(true); }} onOpenMenu={handleOpenMenuGerente} />
        </>
      )}

      {vista === "operarios" && (
        <>
          <OperariosActions query={queryOperarios} setQuery={setQueryOperarios} onCreate={handleOpenCreateOperario} onOpenForm={handleOpenCreateOperario} />
          <OperariosListMecanico operarios={operariosFiltrados} onEdit={(o) => { setEditingOperario(o); setFormDataOperario({ ...o }); setOpenOperarioForm(true); }} onOpenMenu={handleOpenMenuOperario} />
        </>
      )}

      {vista === "vehiculos" && (
        <>
          <VehiculosActions query={queryVehiculos} setQuery={setQueryVehiculos} onCreate={handleOpenCreateVehiculo} onOpenForm={handleOpenCreateVehiculo} />
          <VehiculosListMecanico vehiculos={vehiculosFiltrados} onEdit={(v) => { setEditingVehiculo(v); setFormDataVehiculo({ ...v }); setOpenVehiculoForm(true); }} onOpenMenu={handleOpenMenuVehiculo} />
        </>
      )}

      <GestionEmpresasModales
        anchorElEmpresa={anchorElEmpresa} onCloseMenuEmpresa={handleCloseMenuEmpresa} onChangeEstadoEmpresa={handleChangeEstadoEmpresa} onBorrarEmpresa={handleBorrarEmpresa}
        anchorElGerente={anchorElGerente} onCloseMenuGerente={handleCloseMenuGerente} onChangeEstadoGerente={handleChangeEstadoGerente} onBorrarGerente={handleBorrarGerente}
        anchorElOperario={anchorElOperario} onCloseMenuOperario={handleCloseMenuOperario} onChangeEstadoOperario={handleChangeEstadoOperario} onBorrarOperario={handleBorrarOperario}
        anchorElVehiculo={anchorElVehiculo} onCloseMenuVehiculo={handleCloseMenuVehiculo} onChangeEstadoVehiculo={handleChangeEstadoVehiculo} onBorrarVehiculo={handleBorrarVehiculo}
        openEmpresaForm={openEmpresaForm} setOpenEmpresaForm={setOpenEmpresaForm} handleSaveEmpresa={handleSaveEmpresa} formDataEmpresa={formDataEmpresa} setFormDataEmpresa={setFormDataEmpresa} editingEmpresa={editingEmpresa}
        openGerenteForm={openGerenteForm} setOpenGerenteForm={setOpenGerenteForm} handleSaveGerente={handleSaveGerente} formDataGerente={formDataGerente} setFormDataGerente={setFormDataGerente} editingGerente={editingGerente}
        openOperarioForm={openOperarioForm} setOpenOperarioForm={setOpenOperarioForm} handleSaveOperario={handleSaveOperario} formDataOperario={formDataOperario} setFormDataOperario={setFormDataOperario} editingOperario={editingOperario}
        openVehiculoForm={openVehiculoForm} setOpenVehiculoForm={setOpenVehiculoForm} handleSaveVehiculo={handleSaveVehiculo} formDataVehiculo={formDataVehiculo} setFormDataVehiculo={setFormDataVehiculo} editingVehiculo={editingVehiculo}
      />

    </Box>
  );
}