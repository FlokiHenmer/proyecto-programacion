import { Box, Card, CardContent, Stack, Typography, Button, Chip, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import { COLORS, cardSx, resultadoColor, buttonStyles } from "../../../constants/Gerente";

const fmt = (f) => {
  const [y, m, d] = f.split("-");
  return `${d}/${m}/${y}`;
};

export default function VehiculoHistorialGerente({ vehiculo, registros = [], onVolver }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onVolver}
        sx={{ ...buttonStyles.greenBtn, px: 4, py: 1.5, alignSelf: "flex-start" }}
      >
        Volver a la flota
      </Button>

      <Card sx={{ ...cardSx, bgcolor: "#f1f5f9" }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ sm: "center" }}>
            <Box sx={{ bgcolor: "#fff", border: `1px solid ${COLORS.BORDER}`, borderRadius: 2, px: 3, py: 2, textAlign: "center", minWidth: 160 }}>
              <Typography variant="caption" sx={{ color: COLORS.MUTED, letterSpacing: 1, fontWeight: 700 }}>
                PATENTE
              </Typography>
              <Typography sx={{ fontWeight: 900, fontSize: 26, letterSpacing: 1 }}>{vehiculo?.patente}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20 }}>{vehiculo?.modelo}</Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1, color: COLORS.MUTED }} flexWrap="wrap" useFlexGap>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SpeedIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: 14 }}>{registros[0]?.km ?? "-"} km</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <BuildIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: 14 }}>{registros.length} servicios registrados</Typography>
                </Stack>
                <Typography sx={{ fontSize: 14 }}>Última revisión: {vehiculo?.revision}</Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {registros.length === 0 ? (
        <Typography sx={{ color: COLORS.MUTED, textAlign: "center", py: 4 }}>
          Este vehículo no tiene formularios registrados.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {registros.map((r) => {
            const c = resultadoColor(r.resultado);
            return (
              <Card key={r.id} sx={cardSx}>
                <CardContent>
                  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: COLORS.TEXT }}>{r.trabajo}</Typography>
                      <Typography sx={{ fontSize: 13, color: COLORS.MUTED }}>{r.observacion}</Typography>
                    </Box>
                    <Stack spacing={0.5} alignItems={{ sm: "flex-end" }}>
                      <Typography sx={{ fontSize: 13, color: COLORS.MUTED }}>{fmt(r.fecha)} · {r.id}</Typography>
                      <Chip label={r.resultado} size="small" sx={{ bgcolor: c.bg, color: c.color, fontWeight: 700, fontSize: 11 }} />
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                    <PersonIcon sx={{ fontSize: 18, color: COLORS.MUTED }} />
                    <Typography sx={{ fontSize: 12, color: COLORS.MUTED }}>
                      {r.operario} · {r.km} km
                    </Typography>
                    <Chip label={r.tipo} size="small" sx={{ bgcolor: COLORS.BORDER, fontWeight: 600, fontSize: 11 }} />
                  </Stack>
                  <Box sx={{ mt: 1.5, height: 3, width: 48, bgcolor: COLORS.GREEN, borderRadius: 2 }} />
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
