import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, TextField, Button, InputAdornment,
  IconButton, Alert, Divider, ToggleButton, ToggleButtonGroup, Stack, Avatar,
} from "@mui/material";
import {
  Visibility, VisibilityOff, ArrowForward, LockOutlined, Build, SupervisorAccount, Engineering,
} from "@mui/icons-material";
import { useUser } from "../contexts/UserContext";

const GREEN = "#44FF34";
const GREEN_DARK = "#2EE01E";

const ROUTES = {
  mecanico: '/mecanico',
  gerente: '/gerente',
  operario: '/operario',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mecanico");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Completá usuario y contraseña.");
      return;
    }
    if (!role) {
      setError("Seleccioná un rol.");
      return;
    }
    login({ username: username.trim(), role });
    navigate(ROUTES[role], { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F4F7FB",
        p: 2,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 460,
          borderRadius: 3,
          border: "1px solid #E5EAF2",
          boxShadow: "0 10px 40px rgba(20,30,60,0.06)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Encabezado */}
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2.5}>
            <Avatar
              variant="rounded"
              sx={{ bgcolor: "#F0F3F8", color: "#1A2238", width: 44, height: 44 }}
            >
              <Build />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, color: "#1A2238", lineHeight: 1.1 }}>
                Operativa Vehicular
              </Typography>
              <Typography sx={{ color: GREEN_DARK, fontWeight: 600, fontSize: 14 }}>
                Pinza Motors
              </Typography>
            </Box>
          </Stack>

          <Typography sx={{ color: "#5A6478", fontSize: 14, mb: 3 }}>
            Bienvenido. Por favor, ingrese sus credenciales para continuar.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Selector de rol */}
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

            {/* Usuario */}
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1A2238", mb: 0.75 }}>
              Usuario o Legajo
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="ej: 10452"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#F7F9FC" } }}
            />

            {/* Contraseña */}
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1A2238", mb: 0.75 }}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              size="small"
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#F7F9FC" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPwd((s) => !s)}>
                      {showPwd ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Botón ingresar */}
            <Button
              type="submit"
              fullWidth
              endIcon={<ArrowForward />}
              sx={{
                py: 1.3,
                borderRadius: 2,
                fontWeight: 800,
                letterSpacing: 0.5,
                color: "#0d1b0d",
                bgcolor: GREEN,
                boxShadow: "0 6px 16px rgba(68,255,52,0.35)",
                "&:hover": {
                  bgcolor: GREEN_DARK,
                  boxShadow: "0 8px 22px rgba(46,224,30,0.45)",
                  transform: "translateY(-1px)",
                },
                transition: "all .2s ease",
              }}
            >
              INGRESAR
            </Button>

            <Divider sx={{ my: 2.5 }} />

            <Stack direction="row" spacing={1} alignItems="flex-start">
              <LockOutlined sx={{ fontSize: 16, color: "#5A6478", mt: "2px" }} />
              <Typography sx={{ fontSize: 12, color: "#5A6478", lineHeight: 1.5 }}>
                Acceso restringido para personal autorizado:{" "}
                <b>Conductor, Mecánico y Gerencia</b>. Todas las actividades son monitoreadas.
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
