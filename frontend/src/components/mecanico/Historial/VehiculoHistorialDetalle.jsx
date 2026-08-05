import React from "react";
import { Box, Card, CardContent, Stack, Typography, Button, Chip, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import { cardSx, TEXT, MUTED, BORDER, GREEN_SOFT, GREEN_TEXT, greenBtn } from "../../../constants/Mecanico";

export default function VehiculoHistorialDetalle({ patente, registros = [], onVolver }) {
  const info = registros[0];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onVolver}
        sx={{ ...greenBtn, px: 4, py: 1.5, alignSelf: "flex-start" }}
      >
        Volver al historial general
      </Button>

      <Card sx={{ ...cardSx, bgcolor: "#f1f5f9" }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ sm: "center" }}>
            <Box sx={{ bgcolor: "#fff", border: `1px solid ${BORDER}`, borderRadius: 2, px: 3, py: 2, textAlign: "center", minWidth: 160 }}>
              <Typography variant="caption" sx={{ color: MUTED, letterSpacing: 1, fontWeight: 700 }}>
                PATENTE
              </Typography>
              <Typography sx={{ fontWeight: 900, fontSize: 26, letterSpacing: 1 }}>{patente}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20 }}>{info?.vehiculo ?? "Vehículo"}</Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1, color: MUTED }} flexWrap="wrap" useFlexGap>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <BuildIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: 14 }}>{registros.length} servicios registrados</Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Stack spacing={2}>
        <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 16 }}>
          Servicios anteriores y registros de la unidad
        </Typography>
        {registros.map((r) => (
          <Card key={r.id} sx={cardSx}>
            <CardContent>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: TEXT }}>{r.servicio || r.trabajo}</Typography>
                  <Typography sx={{ fontSize: 13, color: MUTED }}>Mecánico a cargo: {r.mecanico}</Typography>
                </Box>
                <Stack spacing={0.5} alignItems={{ sm: "flex-end" }}>
                  <Typography sx={{ fontSize: 13, color: MUTED }}>{r.fecha}</Typography>
                  <Chip label={r.tipo || "Mantenimiento"} size="small" sx={{ bgcolor: GREEN_SOFT, color: GREEN_TEXT, fontWeight: 700, fontSize: 11 }} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}