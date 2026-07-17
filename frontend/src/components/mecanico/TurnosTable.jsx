import React from "react";
import { Box, Typography, Chip, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BORDER, turnos } from "../../constants/AlarmaMecanico";

export default function TurnosTable() {
  return (
    <Card sx={{ borderRadius: 3, border: `1px solid ${BORDER}`, boxShadow: "none" }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Turnos Programados</Typography>
        
        {/* ESTE BOX ES LA CLAVE PARA QUE NO DESBORDE */}
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 400 }}> {/* MinWidth más bajo para que quepa en móviles */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 700 }}>VEHÍCULO</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 700 }}>FECHA</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 700 }}>ESTADO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(turnos || []).map((t, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ py: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}>{t?.vehiculo}</Typography>
                    <Typography variant="caption" sx={{ fontSize: { xs: 10, sm: 12 } }}>{t?.patente}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, py: 1.5 }}>{t?.fecha}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Chip
                      label={t?.estado?.label}
                      size="small"
                      sx={{
                        bgcolor: t?.estado?.bg,
                        color: t?.estado?.color,
                        fontWeight: 700,
                        fontSize: { xs: 10, sm: 11 }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}