import { Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CredencialesFields({ username, setUsername, password, setPassword, showPwd, setShowPwd }) {
  return (
    <>
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
    </>
  );
}