import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { BORDER, MUTED, TEXT, GREEN } from "../../../constants/Mecanico";

export default function VistaToggle({ vista, setVista }) {
  return (
    <ToggleButtonGroup
      value={vista}
      exclusive
      onChange={(_, v) => v && setVista(v)}
      size="small"
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${BORDER}`,
        borderRadius: 2,
        p: 0.5,
        flexWrap: "wrap",
        "& .MuiToggleButton-root": {
          border: 0,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 700,
          fontSize: 14,
          px: 2,
          color: MUTED,
          "&.Mui-selected": {
            bgcolor: GREEN,
            color: TEXT,
            "&:hover": { bgcolor: GREEN },
          },
        },
      }}
    >
      <ToggleButton value="empresas">Empresas</ToggleButton>
      <ToggleButton value="gerentes">Gerentes</ToggleButton>
      <ToggleButton value="operarios">Operarios</ToggleButton>
      <ToggleButton value="vehiculos">Vehículos</ToggleButton>
    </ToggleButtonGroup>
  );
}