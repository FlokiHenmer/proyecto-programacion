import { Box, Card, CardContent, Stack, Typography, Button, Chip, Divider, Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { COLORS, cardSx, resultadoColor, buttonStyles } from "../../../constants/Gerente";

const fmt = (f) => {
  const [y, m, d] = f.split("-");
  return `${d}/${m}/${y}`;
};

export default function OperarioHistorialDetalle({ operario, registros = [], onVolver }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onVolver}
        sx={{ ...buttonStyles.blueBtn, px: 4, py: 1.5, alignSelf: "flex-start" }}
      >
        Volver a la lista de operarios
      </Button>

      <Card sx={{ ...cardSx, bgcolor: "#f1f5f9" }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
            <Avatar sx={{ bgcolor: COLORS.GREEN, color: COLORS.TEXT, width: 56, height: 56, fontWeight: 800 }}>
              {operario?.nombre?.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20 }}>{operario?.nombre}</Typography>
              <Typography sx={{ fontSize: 13, color: COLORS.MUTED }}>
                {operario?.rol} · {operario?.email}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1, color: COLORS.MUTED }}>
                <DescriptionIcon sx={{ fontSize: 18 }} />
                <Typography sx={{ fontSize: 14 }}>{registros.length} formularios completados</Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {registros.length === 0 ? (
        <Typography sx={{ color: COLORS.MUTED, textAlign: "center", py: 4 }}>
          Este operario todavía no registró formularios.
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
                    <DirectionsCarIcon sx={{ fontSize: 18, color: COLORS.MUTED }} />
                    <Typography sx={{ fontSize: 12, color: COLORS.MUTED }}>
                      {r.vehiculo} · {r.patente} · {r.km} km
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
