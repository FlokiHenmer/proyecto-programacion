import React from "react";
import { Box, Card, CardContent, Typography, Stack, Button, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ErrorIcon from "@mui/icons-material/Error";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";


// Importa tus constantes y componentes reutilizables
import { GREEN, BORDER, TEXT, MUTED, cardSx, greenBtn, blackBtn, historialData, trabajosData } from "../../../constants/Mecanico";
import KpiCard from "../../../components/mecanico/KpiCard";
import AlertItem from "./AlertItem";
import AgendaItem from "./AgendaItem";
import { StatusRow } from "./StatusRow";
import ServiciosChart from "./ServiciosChart";

export default function InicioDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" }, gap: 2.5, mb: 2.5 }}>
        <Card sx={{ ...cardSx, borderLeft: `4px solid ${GREEN}` }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: 20, color: TEXT }}>
                  Checklist<br />Técnico
                </Typography>
                <Typography sx={{ color: MUTED, fontSize: 13, mt: 0.5 }}>Resumen mensual</Typography>
              </Box>
              <Typography sx={{ fontSize: 48, fontWeight: 800, color: "#cbd5e1", lineHeight: 1 }}>
                24
              </Typography>
            </Box>
            <Stack spacing={1.2} sx={{ mt: 2 }}>
              <StatusRow icon={<CheckCircleIcon sx={{ color: "#16a34a" }} />} label="Óptimo" value={18} />
              <StatusRow icon={<ReportProblemIcon sx={{ color: "#0284c7" }} />} label="Mantenimiento" value={4} />
              <StatusRow icon={<ErrorIcon sx={{ color: "#dc2626" }} />} label="Reparación" value={2} />
            </Stack>
            <Button fullWidth sx={{ ...greenBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/formulario-tecnico")}>
              Ir al Checklist Técnico
            </Button>
          </CardContent>
        </Card>

        <ServiciosChart />
        
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2.5 }}>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1.5 }}>Registro de Trabajos</Typography>
            <Stack spacing={1.2}>
              {trabajosData.map((t) => (
                <Box key={t.v} sx={{ border: `1px solid ${BORDER}`, borderRadius: 2, p: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{t.v}</Typography>
                    <Typography sx={{ color: MUTED, fontSize: 12 }}>{t.d}</Typography>
                  </Box>
                  <Typography sx={{ color: MUTED, fontSize: 13, mt: 0.5 }}>{t.desc}</Typography>
                </Box>
              ))}
            </Stack>
            <Button fullWidth sx={{ ...blackBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/trabajos")}>
              Agregar nuevo trabajo
            </Button>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, borderLeft: "4px solid #dc2626" }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Alertas y Turnos</Typography>
              <NotificationsActiveIcon sx={{ color: "#dc2626" }} />
            </Box>
            <Chip
              label="3 ALERTAS ACTIVAS"
              size="small"
              sx={{ bgcolor: "#fee2e2", color: "#b91c1c", fontWeight: 700, mt: 1, mb: 1.5 }}
            />
            <Stack spacing={1.2}>
              <AlertItem severity="urgent" title="URGENTE: Frenos Gastados" sub="Unidad 04 - Scania" status="PENDIENTE" statusColor="#dc2626" />
              <AlertItem title="Service 50k km" sub="Unidad 12 - Renault" status="ACEPTADO" statusColor="#16a34a" />
            </Stack>
            <Button fullWidth sx={{ ...greenBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/alarmas")}>
              Ver alertas y proponer turno
            </Button>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1.5 }}>Agenda</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", textAlign: "center", mb: 1 }}>
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <Typography key={i} sx={{ fontSize: 12, color: MUTED, fontWeight: 700 }}>{d}</Typography>
              ))}
              {[9, 10, 11, 12, 13, 14, 15].map((n) => (
                <Box key={n} sx={{ py: 0.5 }}>
                  {n === 10 ? (
                    <Box sx={{
                      mx: "auto", width: 26, height: 26, borderRadius: "50%",
                      bgcolor: "#0b0b0b", color: "#fff", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700,
                    }}>
                      {n}
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: 13 }}>{n}</Typography>
                  )}
                </Box>
              ))}
            </Box>
            <Stack spacing={1.2}>
              <AgendaItem time="09:00 AM" text="Turno Confirmado: Renault Kangoo" color="#16a34a" />
              <AgendaItem time="14:30 PM" text="Urgente: Bomba de Agua" color="#dc2626" />
            </Stack>
            <Button fullWidth sx={{ ...greenBtn, mt: 2, py: 1.1 }} onClick={() => navigate("/mecanico/calendario")}>
              Ir a agenda completa
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}