import { useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";

import { BG, TEXT, initialChecklist } from "../../constants/FormularioMecanico";
import HeaderHero from "../../components/mecanico/HeaderFormulario";
import DatosGenerales from "../../components/mecanico/DatosFormulario";
import SeccionMotor from "../../components/mecanico/SeccionMotor";
import SeccionTransmision from "../../components/mecanico/SeccionTransmision";
import SeccionFrenos from "../../components/mecanico/SeccionFrenos";
import SeccionSuspension from "../../components/mecanico/SeccionSuspension";
import SeccionElectrico from "../../components/mecanico/SeccionElectrico";
import SeccionCorreas from "../../components/mecanico/SeccionCorreas";
import SeccionNeumaticos from "../../components/mecanico/SeccionNeumaticos";
import DiagnosticoGeneral from "../../components/mecanico/DiagnosticoGeneral";


export default function ChecklistMecanico() {
  const [expanded, setExpanded] = useState("motor");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const [form, setForm] = useState({
    fecha: "2026-06-12",
    km: "",
    vehiculo: "",
  });

  const [checklist, setChecklist] = useState(initialChecklist);

  const handleUpdate = (section, field, value) => {
    setChecklist((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  return (
    <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, bgcolor: BG, fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh" }}>
      
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: TEXT }}>
          Formulario Técnico Periódico
        </Typography>
      </Box>

      {/* Hero + Calidad */}
       <HeaderHero />

      {/* Datos generales */}
      <DatosGenerales form={form} setForm={setForm} />

      {/* SECCIONES ACORDEÓN */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        
        {/* ==================== 1. MOTOR ==================== */}
        <SeccionMotor expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

        {/* ==================== 2. TRANSMISIÓN ==================== */}
        <SeccionTransmision expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

        {/* ==================== 3. SISTEMA DE FRENOS ==================== */}
        <SeccionFrenos expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

        {/* ==================== 4. SUSPENSIÓN Y TREN DELANTERO ==================== */}
        <SeccionSuspension expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

        {/* ==================== 5. SISTEMA ELÉCTRICO ==================== */}
        <SeccionElectrico expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

        {/* ==================== 6. CORREAS Y DISTRIBUCIÓN ==================== */}
        <SeccionCorreas expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

        {/* ==================== 7. NEUMÁTICOS ==================== */}
        <SeccionNeumaticos expanded={expanded} setExpanded={setExpanded} checklist={checklist} handleUpdate={handleUpdate} />

      </Box>

      {/* ==================== DIAGNÓSTICO GENERAL Y CIERRE ==================== */}
      <DiagnosticoGeneral checklist={checklist} handleUpdate={handleUpdate} setOpenSnackbar={setOpenSnackbar} />

      
      {/* Alerta de éxito */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: "100%", bgcolor: "#0f172a", color: "#fff", fontWeight: 600 }}>
          Inspección guardada exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}