import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { BORDER, RED, RED_BG, TEXT, turnos } from "../../../constants/CalendarioMecanico";

export default function ProximosUrgentes() {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT, mb: 1.5 }}>Próximos Urgentes</Typography>
      <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={1}>
            {turnos.filter(t => t.estado === "urgente").map((u, i) => (
              <Box key={i} sx={{ bgcolor: RED_BG, border: `1px solid #fecaca`, border: `1px solid ${BORDER}`, borderRadius: 2, p: 1.5, minWidth: 0 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                  <ErrorIcon sx={{ color: RED, fontSize: 20, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {u.veh}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}