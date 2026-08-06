import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { COLORS } from "../../../constants/Gerente";

export default function VistaToggleGestion({ vista, setVista }) {
  return (
    <ToggleButtonGroup
      value={vista}
      exclusive
      onChange={(_, v) => v && setVista(v)}
      size="small"
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: 2,
        p: 0.5,
        mb: 3,
        flexWrap: "wrap",
        "& .MuiToggleButton-root": {
          border: 0,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 700,
          fontSize: 12,
          px: 2,
          color: COLORS.MUTED,
          "&.Mui-selected": {
            bgcolor: COLORS.TEXT,
            color: COLORS.BG,
          },
        },
      }}
    >
      <ToggleButton value="operarios">Operarios</ToggleButton>
      <ToggleButton value="vehiculos">Vehículos</ToggleButton>
    </ToggleButtonGroup>
  );
}