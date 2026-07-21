import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Build, SupervisorAccount, Engineering } from "@mui/icons-material";
import { GREEN, GREEN_DARK } from "../../constants/Login";

export default function RoleSelector({ role, setRole }) {
  return (
    <>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1A2238", mb: 1 }}>
        Ingresar como
      </Typography>
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={(_, v) => v && setRole(v)}
        fullWidth
        sx={{
          mb: 2.5,
          "& .MuiToggleButton-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: 13,
            color: "#5A6478",
            borderColor: "#E5EAF2",
            py: 1,
            gap: 0.5,
          },
          "& .Mui-selected": {
            bgcolor: `${GREEN} !important`,
            color: "#0d1b0d !important",
            borderColor: `${GREEN_DARK} !important`,
          },
        }}
      >
        <ToggleButton value="mecanico">
          <Build sx={{ fontSize: 16, mr: 0.5 }} /> Mecánico
        </ToggleButton>
        <ToggleButton value="gerente">
          <SupervisorAccount sx={{ fontSize: 16, mr: 0.5 }} /> Gerente
        </ToggleButton>
        <ToggleButton value="operario">
          <Engineering sx={{ fontSize: 16, mr: 0.5 }} /> Operario
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
