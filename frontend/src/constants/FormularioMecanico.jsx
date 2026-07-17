export const GREEN = "#44FF34";
export const GREEN_DARK = "#22cc15";
export const BORDER = "#e5e7eb";
export const TEXT = "#0f172a";
export const MUTED = "#64748b";
export const BG = "#f7f8fa";
export const CARD = "#ffffff";

export const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  px: 3,
  py: 1.2,
  boxShadow: "none",
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
};

export const diagnosticBtnStyle = (active, activeColor) => ({
  borderRadius: 4,
  textTransform: "none",
  fontWeight: 600,
  px: 2.5,
  py: 1,
  border: `1px solid ${active ? activeColor : BORDER}`,
  bgcolor: active ? `${activeColor}10` : "transparent",
  color: active ? activeColor : TEXT,
  "&:hover": {
    bgcolor: active ? `${activeColor}20` : "#f1f5f9",
    borderColor: active ? activeColor : MUTED,
  },
});

export const initialChecklist = {
    motor: {
      nivelAceite: "", estadoAceite: "", perdidasAceite: "",
      nivelRefrigerante: "", estadoRefrigerante: "", obsRefrigerante: "",
      temperaturaTrabajo: "", observaciones: ""
    },
    transmision: {
      embrague: "", cajaCambios: "", perdidas: "", obsPerdidas: "", observaciones: ""
    },
    frenos: {
      pastillasDelanteras: "", desgastePastillas: "", discos: "", obsDiscos: "",
      liquidoNivel: "", liquidoEstado: "", liquidoObs: "",
      frenoTrasero: "", obsFrenoTrasero: "", observaciones: ""
    },
    suspension: {
      amortiguadores: "", obsAmortiguadores: "",
      rotulas: "", obsRotulas: "",
      bujes: "", obsBujes: "",
      extremos: "", obsExtremos: "",
      barra: "", obsBarra: "",
      observaciones: ""
    },
    electrico: {
      bateria: "", obsBateria: "",
      sistemaCarga: "", obsSistemaCarga: "",
      luces: "", obsLuces: "",
      observaciones: ""
    },
    correas: {
      correasAuxiliares: "", obsCorreasAuxiliares: "",
      distribucionObs: "", bombaAguaObs: "", observaciones: ""
    },
    neumaticos: {
      dibujoEstado: "", dibujoMm: "",
      presionEstado: "", presionPsi: "", obsPresion: "",
      observaciones: ""
    },
    diagnostico: {
      resultado: "", accionesRecomendadas: ""
    }
};
