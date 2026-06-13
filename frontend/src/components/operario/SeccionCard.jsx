// src/components/operario/SeccionCard.jsx
import { Card, CardContent, Typography, Grid, Stack, TextField } from "@mui/material";
import BotonEstado from "./BotonEstado";

export default function SeccionCard({ seccion, valor, onChange }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 18px rgba(0,0,0,0.06)", height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
          {seccion.icon}
          <Typography variant="h6" fontWeight={700}>{seccion.titulo}</Typography>
        </Stack>
        {seccion.subtitulo && (
          <Typography variant="caption" color="text.secondary">{seccion.subtitulo}</Typography>
        )}

        <Grid container spacing={1.5}>
          {seccion.opciones.map((op) => (
            <Grid item xs key={op.label}>
              <BotonEstado
                label={op.label}
                color={op.color}
                activo={valor?.opcion === op.label}
                onClick={() => onChange({ ...valor, opcion: op.label, color: op.color })}
                sx={{ flexGrow: 1 }} 
              />
            </Grid>
          ))}
        </Grid>

        <TextField
          fullWidth multiline minRows={2} placeholder="Observaciones..."
          sx={{ mt: 2 }}
          value={valor?.obs || ""}
          onChange={(e) => onChange({ ...valor, obs: e.target.value })}
        />
      </CardContent>
    </Card>
  );
}
