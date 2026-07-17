import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button, Card, CardContent } from "@mui/material";
import { BORDER, MUTED, agenda, blackBtn } from "../../constants/AlarmaMecanico";

export default function AgendaSemanal() {
  const navigate = useNavigate();
  return (
    <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Agenda Semanal</Typography>
        <Stack spacing={1}>
          
          {(agenda || []).map((ev, i) => (
            <Box key={i} sx={{ bgcolor: ev?.bg || "#fff", borderLeft: `4px solid ${ev?.border || BORDER}`, p: 1.5, borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: ev?.border || MUTED, fontWeight: 700 }}>
                {ev?.day || ""} | {ev?.time || ""} HS
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{ev?.title || "Sin título"}</Typography>
            </Box>
          ))}
          
          <Button fullWidth sx={{ ...blackBtn, mt: 2 }} onClick={() => navigate("/mecanico/calendario")}>
            Agenda completa
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}