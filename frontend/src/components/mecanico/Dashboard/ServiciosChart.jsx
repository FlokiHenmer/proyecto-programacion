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
import { GREEN, GREEN_DARK, BORDER, TEXT, MUTED, PANEL_BG, cardSx, DATA_SEMANA, DATA_MES, BLUE } from "../../../constants/Mecanico";

export default function ServiciosChart({
  dataSemana = DATA_SEMANA,
  dataMes = DATA_MES,
  title = "Servicios Realizados",
}) {
  const [rango, setRango] = useState("semana");
  const data = rango === "semana" ? dataSemana : dataMes;

  const { max, total, promedio } = useMemo(() => {
    const values = data.map((d) => d.value);
    const t = values.reduce((a, b) => a + b, 0);
    return {
      max: Math.max(...values, 1),
      total: t,
      promedio: Math.round(t / (values.length || 1)),
    };
  }, [data]);

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
            <Typography sx={{ fontWeight: 800, fontSize: 20, color: TEXT }}>{title}</Typography>
            <Typography sx={{ color: MUTED, fontSize: 13 }}>
              {rango === "semana" ? "Últimos 7 días" : "Últimos 12 meses"} · {total} servicios
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap" }}>
            <Chip
              icon={<TrendingUpIcon sx={{ fontSize: 16, color: `${GREEN_DARK} !important` }} />}
              label={`Prom. ${promedio}`}
              size="small"
              sx={{ bgcolor: PANEL_BG, color: TEXT, fontWeight: 700, border: `1px solid ${BORDER}` }}
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
                  color: MUTED,
                  border: `1px solid ${BORDER}`,
                },
                "& .Mui-selected": {
                  bgcolor: `${TEXT} !important`,
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
          <Box sx={{ minWidth: rango === "semana" ? 280 : 420 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${data.length}, 1fr)`,
                alignItems: "end",
                gap: 1,
                height: 200,
                px: 0.5,
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              {data.map((d) => (
                <Box
                  key={d.label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: 10, fontWeight: 700, color: MUTED, mb: 0.5 }}>
                    {d.value}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 34,
                      height: `${(d.value / max) * 100}%`,
                      minHeight: 4,
                      bgcolor: BLUE,
                      border: `1px solid ${BORDER}`,
                      borderBottom: "none",
                      borderRadius: "6px 6px 0 0",
                      transition: "height .3s ease",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${data.length}, 1fr)`,
                gap: 1,
                px: 0.5,
                mt: 1,
              }}
            >
              {data.map((d) => (
                <Typography
                  key={d.label}
                  sx={{ fontSize: 11, color: MUTED, textAlign: "center", fontWeight: 600 }}
                >
                  {d.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}