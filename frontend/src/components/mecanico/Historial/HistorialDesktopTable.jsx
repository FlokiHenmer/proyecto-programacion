import React from "react";
import { Card, Box, Button, Table, TableHead, TableRow, TableCell, TableBody, Stack, Avatar, Typography } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { cardSx, MUTED, BORDER, TEXT } from "../../../constants/Mecanico";

export default function HistorialDesktopTable({ data, onVerVehiculo }) {
  return (
    <Card sx={cardSx}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Mecánico</TableCell>
              <TableCell>Historial Completo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data && data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.fecha}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* Icono del auto */}
                    <DirectionsCarFilledIcon sx={{ color: MUTED, fontSize: 18 }} />
                    {/* Nombre del vehículo */}
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                        {row.vehiculo || row.modelo || "N/A"}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>{row.servicio || "N/A"}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ width: 24, height: 24, fontSize: 10, bgcolor: "#cbd5e1" }}>
                      {row.mecanico?.charAt(0)}
                    </Avatar>
                    <Typography sx={{ fontSize: 13 }}>{row.mecanico}</Typography>
                  </Stack>
                </TableCell>

                {/* Columna Extra: Ver historial completo / Servicios viejos */}
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}` }}>
                  <Button
                    size="small"
                    onClick={() => onVerVehiculo?.(row.patente || row.vehiculo)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: 13,
                      color: BORDER,
                      bgcolor: TEXT,
                      border: "1px solid #e2e8f0",
                      px: 2,
                      borderRadius: 1.5,
                    }}
                  >
                    Ver historial
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}