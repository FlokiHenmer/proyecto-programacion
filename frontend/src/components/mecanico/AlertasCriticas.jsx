import React from "react";
import { Box, Stack, Typography, Button, Chip, Card, CardContent } from "@mui/material";

import { BORDER, MUTED, criticalAlerts, greenBtn } from "../../constants/AlarmaMecanico";

export default function AlertasCriticas({ setSelectedAlert }) {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Panel de Alertas Críticas</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2, mb: 4 }}>
        {criticalAlerts.map((a) => (
          <Card key={a.id} sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, borderLeft: `5px solid ${a.borderColor}`, boxShadow: "none" }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: MUTED }}>{a.patente}</Typography>
                  <Typography sx={{ fontWeight: 800 }}>{a.vehiculo}</Typography>
                </Box>
                <Chip label={a.badge.label} size="small" sx={{ bgcolor: a.badge.bg, color: a.badge.color, fontWeight: 700, fontSize: 10 }} />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                {a.icon}
                <Typography sx={{ color: a.borderColor, fontWeight: 600, fontSize: 14 }}>{a.text}</Typography>
              </Stack>
              <Button fullWidth sx={greenBtn} onClick={() => setSelectedAlert(a)}>Proponer Turno</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
