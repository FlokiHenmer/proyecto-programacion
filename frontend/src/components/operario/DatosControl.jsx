import {
  Card, CardContent, Grid, TextField, MenuItem, Typography, RadioGroup,
  FormControlLabel, Radio,
} from "@mui/material";
import { cardSx, VERDE, TEXT, MUTED } from "../../constants/Operario";

export default function DatosControl({
  fechaHoy,
  km,
  setKm,
  vehiculo,
  setVehiculo,
  tipoControl,
  setTipoControl,
}) {
  return (
    <Card sx={{ ...cardSx, borderLeft: `4px solid ${VERDE}`, mb: 3 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16, color: TEXT, mb: 0.5 }}>
          Datos del control
        </Typography>
        <Typography sx={{ color: MUTED, fontSize: 13, mb: 2.5 }}>
          Información general del vehículo y tipo de inspección
        </Typography>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Fecha Actual"
              value={fechaHoy}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Kilómetros"
              type="number"
              placeholder="Ej: 125400"
              value={km}
              onChange={(e) => setKm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              select
              label="Vehículo"
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
            >
              <MenuItem value="">Seleccionar...</MenuItem>
              <MenuItem value="AAA111">AAA111 - Ford Ranger</MenuItem>
              <MenuItem value="BBB222">BBB222 - Toyota Hilux</MenuItem>
              <MenuItem value="CCC333">CCC333 - VW Amarok</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                color: MUTED,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Tipo de control
            </Typography>
            <RadioGroup
              row
              value={tipoControl}
              onChange={(e) => setTipoControl(e.target.value)}
            >
              <FormControlLabel
                value="regular"
                control={
                  <Radio
                    sx={{ color: MUTED, "&.Mui-checked": { color: VERDE } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, color: TEXT }}>Regular</Typography>
                }
              />
              <FormControlLabel
                value="previaje"
                control={
                  <Radio
                    sx={{ color: MUTED, "&.Mui-checked": { color: VERDE } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 14, color: TEXT }}>Previaje</Typography>
                }
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}