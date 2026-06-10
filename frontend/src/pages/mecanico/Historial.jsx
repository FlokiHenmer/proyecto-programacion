import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";

const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
};

const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  boxShadow: "none",
  px: 4,
  py: 1.2,
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
};

const historialCompleto = [
  { id: 1, patente: "ABC-123", vehiculo: "Toyota Hilux", fecha: "12/10/2023", servicio: "Cambio de Aceite", mecanico: "Ricardo Gómez" },
  { id: 2, patente: "XYZ-789", vehiculo: "Ford Ranger", fecha: "11/10/2023", servicio: "Frenos Delanteros", mecanico: "Ricardo Gómez" },
  { id: 3, patente: "DEF-456", modelo: "VW Amarok", fecha: "10/10/2023", servicio: "Suspensión y Alineación", mecanico: "Ricardo Gómez" },
  { id: 4, patente: "GHI-012", modelo: "Mercedes Sprinter", fecha: "09/10/2023", servicio: "Alineación Completa", mecanico: "Ricardo Gómez" },
  { id: 5, patente: "JKL-345", modelo: "Iveco Daily", fecha: "08/10/2023", servicio: "Ajuste General de Motor", mecanico: "Ricardo Gómez" },
  { id: 6, patente: "MNO-789", modelo: "Fiat Fiorino", fecha: "05/10/2023", servicio: "Cambio de Bujías", mecanico: "Ricardo Gómez" },
];

export default function Historial() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Título de la Sección */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
          Registro de Actividad
        </Typography>
        <Typography variant="caption" sx={{ color: MUTED, fontSize: 13 }}>
          Historial completo de servicios y modificaciones en la flota.
        </Typography>
      </Box>

      {/* Card Principal de la Tabla (Sin la barra de navegación superior eliminada) */}
      <Card sx={cardSx}>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  {["VEHÍCULO", "FECHA", "SERVICIO REALIZADO", "ENCARGADO"].map((h) => (
                    <TableCell 
                      key={h} 
                      sx={{ 
                        color: MUTED, 
                        fontWeight: 700, 
                        fontSize: 12, 
                        borderBottom: `1px solid ${BORDER}`,
                        px: 3,
                        py: 2
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {historialCompleto.map((row) => (
                  <TableRow key={row.id} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                    {/* Vehículo e Identificación */}
                    <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, px: 3, py: 2 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: "#f1f5f9", display: "grid", placeItems: "center" }}>
                          <DirectionsCarFilledIcon sx={{ color: MUTED, fontSize: 20 }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 14, color: TEXT }}>
                            {row.vehiculo || row.modelo}
                          </Typography>
                          <Typography variant="caption" sx={{ color: MUTED, fontFamily: "monospace", display: "block" }}>
                            {row.patente}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* Fecha */}
                    <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, fontSize: 14, color: TEXT, px: 3 }}>
                      {row.fecha}
                    </TableCell>

                    {/* Servicio */}
                    <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, px: 3 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <BuildIcon sx={{ fontSize: 16, color: MUTED }} />
                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: TEXT }}>
                          {row.servicio}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* Encargado */}
                    <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, px: 3 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: "#cbd5e1", color: TEXT }}>
                          {row.mecanico.charAt(0)}
                        </Avatar>
                        <Typography sx={{ fontSize: 13, fontWeight: 500, color: TEXT }}>
                          {row.mecanico}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      {/* Botón "Agregar nuevo trabajo" posicionado abajo de todo */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button 
          startIcon={<BuildIcon sx={{ fontSize: 18 }} />}
          sx={greenBtn} 
          onClick={() => navigate("/dashboard-mecanico/trabajos")}
        >
          Agregar nuevo trabajo
        </Button>
      </Box>

    </Box>
  );
}