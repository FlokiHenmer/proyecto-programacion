// Menús
import EmpresaMenu from "./EmpresaMenu";
import GerenteMenu from "./GerenteMenu";
import OperarioMenu from "./OperarioMenu";
import VehiculoMenu from "./VehiculoMenu";

// Dialogs
import EmpresaFormDialog from "./EmpresaFormDialog";
import GerenteFormDialog from "./GerenteFormDialog";
import OperarioFormDialog from "./OperarioFormDialog";
import VehiculoFormDialog from "./VehiculoFormDialog";

export default function GestionEmpresasModales({
  // Menús Contextuales
  anchorElEmpresa, onCloseMenuEmpresa, onChangeEstadoEmpresa, onBorrarEmpresa,
  anchorElGerente, onCloseMenuGerente, onChangeEstadoGerente, onBorrarGerente,
  anchorElOperario, onCloseMenuOperario, onChangeEstadoOperario, onBorrarOperario,
  anchorElVehiculo, onCloseMenuVehiculo, onChangeEstadoVehiculo, onBorrarVehiculo,
  
  // Modales / Dialogs
  openEmpresaForm, setOpenEmpresaForm, handleSaveEmpresa, formDataEmpresa, setFormDataEmpresa, editingEmpresa,
  openGerenteForm, setOpenGerenteForm, handleSaveGerente, formDataGerente, setFormDataGerente, editingGerente,
  openOperarioForm, setOpenOperarioForm, handleSaveOperario, formDataOperario, setFormDataOperario, editingOperario,
  openVehiculoForm, setOpenVehiculoForm, handleSaveVehiculo, formDataVehiculo, setFormDataVehiculo, editingVehiculo,
}) {
  return (
    <>
      {/* MENÚS CONTEXTUALES */}
      <EmpresaMenu anchorEl={anchorElEmpresa} onClose={onCloseMenuEmpresa} onChangeEstado={onChangeEstadoEmpresa} onBorrar={onBorrarEmpresa} />
      <GerenteMenu anchorEl={anchorElGerente} onClose={onCloseMenuGerente} onChangeEstado={onChangeEstadoGerente} onBorrar={onBorrarGerente} />
      <OperarioMenu anchorEl={anchorElOperario} onClose={onCloseMenuOperario} onChangeEstado={onChangeEstadoOperario} onBorrar={onBorrarOperario} />
      <VehiculoMenu anchorEl={anchorElVehiculo} onClose={onCloseMenuVehiculo} onChangeEstado={onChangeEstadoVehiculo} onBorrar={onBorrarVehiculo} />

      {/* MODALES / FORMULARIOS */}
      <EmpresaFormDialog open={openEmpresaForm} onClose={() => setOpenEmpresaForm(false)} onSubmit={handleSaveEmpresa} formData={formDataEmpresa} setFormData={setFormDataEmpresa} editingEmpresa={editingEmpresa} />
      <GerenteFormDialog open={openGerenteForm} onClose={() => setOpenGerenteForm(false)} onSubmit={handleSaveGerente} formData={formDataGerente} setFormData={setFormDataGerente} editingGerente={editingGerente} />
      <OperarioFormDialog open={openOperarioForm} onClose={() => setOpenOperarioForm(false)} onSubmit={handleSaveOperario} formData={formDataOperario} setFormData={setFormDataOperario} editingOperario={editingOperario} />
      <VehiculoFormDialog open={openVehiculoForm} onClose={() => setOpenVehiculoForm(false)} onSubmit={handleSaveVehiculo} formData={formDataVehiculo} setFormData={setFormDataVehiculo} editingVehiculo={editingVehiculo} />
    </>
  );
}