import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { COLORS, cardSx, defaultMes, defaultSemana } from "../../constants/Gerente";

export default function BarChart({
  data,
  dataSemana,
  dataMes,
  title = "Servicios por Mes",
}) {
  const [rango, setRango] = useState("semana");

  const resolvedSemana = dataSemana || defaultSemana;
  const resolvedMes = dataMes || (data ? data.map(d => ({ label: d.mes || d.label, value: d.value })) : defaultMes);

  const activeData = rango === "semana" ? resolvedSemana : resolvedMes;

  const { max, total, promedio } = useMemo(() => {
    const values = (activeData || []).map((d) => d.value || 0);
    const t = values.reduce((a, b) => a + b, 0);
    return {
      max: Math.max(...values, 1),
      total: t,
      promedio: Math.round(t / (values.length || 1)),
    };
  }, [activeData]);

  return (
    <Card sx={cardSx}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "flex-start" },
            gap: 1.5,
            mb: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 20, color: COLORS.TEXT || "#1e293b" }}>
              {title}
            </Typography>
            <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>
              {rango === "semana" ? "Últimos 7 días" : "Últimos meses"} · {total} en total
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap" }}>
            <Chip
              icon={<TrendingUpIcon sx={{ fontSize: 16, color: `${COLORS.GREEN} !important` }} />}
              label={`Prom. ${promedio}`}
              size="small"
              sx={{ bgcolor: COLORS.PANEL_BG || "#f8fafc", color: COLORS.TEXT, fontWeight: 700, border: `1px solid ${COLORS.BORDER || "#e2e8f0"}` }}
            />

            <ToggleButtonGroup
              exclusive
              size="small"
              value={rango}
              onChange={(_, v) => v && setRango(v)}
              sx={{
                "& .MuiToggleButton-root": {
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 12,
                  px: 1.6,
                  py: 0.4,
                  color: COLORS.MUTED,
                  border: `1px solid ${COLORS.BORDER || "#e2e8f0"}`,
                },
                "& .Mui-selected": {
                  bgcolor: `${COLORS.TEXT || "#1e293b"} !important`,
                  color: " #ffffff !important",
                },
              }}
            >
              <ToggleButton value="semana">Semana</ToggleButton>
              <ToggleButton value="mes">Mes</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 320 }}>
            {/* Contenedor de Barras (Flex centrado con gap controlado) */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
                gap: { xs: 2, sm: 3, md: 4 },
                height: 200,
                px: 1,
                borderBottom: `1px solid ${COLORS.BORDER || "#e2e8f0"}`,
              }}
            >
              {activeData.map((d, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                    width: { xs: 32, sm: 40 },
                  }}
                >
                  <Typography sx={{ fontSize: 10, fontWeight: 700, color: COLORS.MUTED, mb: 0.5 }}>
                    {d.value}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 34,
                      height: `${(d.value / max) * 100}%`,
                      minHeight: 4,
                      bgcolor: "#569cf1f1",
                      borderBottom: "none",
                      borderRadius: "6px 6px 0 0",
                      transition: "height .3s ease",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Contenedor de Etiquetas (Mismo gap y ancho para alinear perfecto) */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 2, sm: 3, md: 4 },
                px: 1,
                mt: 1,
              }}
            >
              {activeData.map((d, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: 32, sm: 40 },
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 11, color: COLORS.MUTED, fontWeight: 600 }}
                  >
                    {d.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}