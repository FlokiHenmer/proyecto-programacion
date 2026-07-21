import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Alert, Stack, Avatar, Typography, Divider } from "@mui/material";
import {
  LockOutlined, Build
} from "@mui/icons-material";
import { useUser } from "../contexts/UserContext";

import { GREEN, GREEN_DARK, ROUTES } from "../constants/Login";
import RoleSelector from "../components/login/RoleSelector";
import CredencialesFields from "../components/login/CredencialesFields";
import SubmitButton from "../components/login/SubmitButton";

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
            <RoleSelector role={role} setRole={setRole} />

            {/* Credenciales */}
            <CredencialesFields
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPwd={showPwd}
              setShowPwd={setShowPwd}
            />

            {/* Botón ingresar */}
            <SubmitButton />

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
