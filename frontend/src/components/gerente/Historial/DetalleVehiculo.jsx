import React from "react";
import { Box, Card, CardContent, Stack, Typography, Button, Chip, Divider, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SpeedIcon from "@mui/icons-material/Speed";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { cardSx, BORDER, TEXT, MUTED, GREEN } from "../../../constants/HistorialGerente";
import { buttonStyles } from "../../../constants/Gerente";
import TipoChip from "./TipoChip";

export default function VehiculoHistorialGerente({ vehiculo, registros = [], onVolver, setSelected }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onVolver}
        sx={{ ...buttonStyles.greenBtn, px: 4, py: 1.5, alignSelf: "flex-start" }}
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
              <Typography sx={{ fontWeight: 900, fontSize: 26, letterSpacing: 1 }}>{vehiculo?.patente}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20, color: TEXT }}>{vehiculo?.vehiculo}</Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1, color: MUTED }} flexWrap="wrap" useFlexGap>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SpeedIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: 14 }}>{registros[0]?.km ?? "-"} km</Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <BuildIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: 14 }}>
                    {registros.length} trabajos y formularios completados
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 14 }}>Último registro: {registros[0]?.fecha ?? "-"}</Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {registros.length === 0 ? (
        <Typography sx={{ color: MUTED, textAlign: "center", py: 4 }}>
          Este vehículo no tiene formularios registrados.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {registros.map((r) => (
            <Card key={r.id} sx={cardSx}>
              <CardContent>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={5}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: TEXT }}>{r.trabajo}</Typography>
                    <Typography sx={{ fontSize: 13, color: MUTED }}>{r.observaciones}</Typography>
                  </Box>
                  <Stack spacing={0.5} alignItems={{ sm: "flex-end" }}>
                    <Typography sx={{ fontSize: 13, color: MUTED }}>{r.fecha}</Typography>
                    <Typography sx={{ fontSize: 13, color: MUTED }}>{r.id}</Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.5 }} />
                <Stack direction="row" spacing={5} alignItems="center" flexWrap="wrap" useFlexGap>
                  <PersonIcon sx={{ fontSize: 18, color: MUTED }} />
                  <Typography sx={{ fontSize: 12, color: MUTED }}>
                    {r.operario} · {r.km} km
                  </Typography>
                  <TipoChip tipo={r.tipo} />
                  {setSelected && (
                    <Tooltip title="Ver detalle del servicio">
                        <IconButton
                        size="small"
                        onClick={() => setSelected(r)}
                        sx={{ border: `1px solid ${BORDER}`, borderRadius: 1.5 }}
                        >
                        <VisibilityIcon sx={{ fontSize: 18, color: TEXT }} />
                        </IconButton>
                    </Tooltip>
                   )}
                   
                </Stack>
                <Box sx={{ mt: 1.5, height: 3, width: 48, bgcolor: GREEN, borderRadius: 2 }} />
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
