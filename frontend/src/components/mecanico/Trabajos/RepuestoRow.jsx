import { Box, Typography, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { BORDER, PANEL_BG, TEXT } from "../../../constants/Mecanico";

export default function RepuestoRow({ repuesto, index, updateRepuesto, removeRepuesto }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr 2fr 40px" },
        gap: 1.5,
        alignItems: "end",
        p: 2,
        borderRadius: 2.5,
        border: `1px solid ${BORDER}`,
        bgcolor: PANEL_BG,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: TEXT, mb: 0.5 }}>Nombre del repuesto</Typography>
        <TextField
          size="small"
          fullWidth
          value={repuesto.nombre}
          onChange={(e) => updateRepuesto(index, "nombre", e.target.value)}
          InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1.5 } }}
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: TEXT, mb: 0.5 }}>Cantidad</Typography>
        <TextField
          size="small"
          fullWidth
          value={repuesto.cantidad}
          onChange={(e) => updateRepuesto(index, "cantidad", e.target.value)}
          InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1.5 } }}
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: TEXT, mb: 0.5 }}>Observaciones</Typography>
        <TextField
          size="small"
          fullWidth
          placeholder="Opcional"
          value={repuesto.obs}
          onChange={(e) => updateRepuesto(index, "obs", e.target.value)}
          InputProps={{ sx: { bgcolor: "#fff", borderRadius: 1.5 } }}
        />
      </Box>
      <IconButton onClick={() => removeRepuesto(index)} sx={{ color: "#dc2626", mb: 0.2 }}>
        <DeleteIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  );
}