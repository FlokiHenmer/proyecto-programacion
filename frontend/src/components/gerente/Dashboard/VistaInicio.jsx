import React from "react";
import { Stack, Box, Card , CardContent, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from "@mui/material";

import KpiCard from "../KpiCard"; // Importamos el componente que ya creamos
import BarChart from "../BarChart"
import { COLORS , cardSx, kpis, serviciosPorMes,mantenimientosPendientes } from "../../../constants/Gerente";


// Función auxiliar
const getPrioridadColor = (prioridad) => {
  switch (prioridad) {
    case "Alta": return { bg: "#fee2e2", color: "#b91c1c" };
    case "Media": return { bg: "#fef3c7", color: "#92400e" };
    default: return { bg: "#dcfce7", color: "#166534" };
  }
};

export default function VistaInicio() {
  return (
    <Stack spacing={3}>
      {/* 1. KPIs */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
        {kpis.map((k) => <KpiCard key={k.title} {...k} />)}
      </Box>

      {/* 2. Gráfico */}
      <Box sx={{ width: "100%", overflowX: "auto", pb: 1, minWidth: 0 }}>
          <Box sx={{ minWidth: 400 }}> 
            <BarChart data={serviciosPorMes} />
          </Box>
      </Box>
        
      
      {/* 3. Tabla */}
      <Card sx={{ ...cardSx, minWidth: 0 }}>
        <CardContent sx={{ p: 0, minWidth: 0 }}>
          <Box sx={{ p: { xs: 2, md: 3 }, pb: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Mantenimientos Pendientes</Typography>
          </Box>
          
          <TableContainer sx={{ width: "100%", overflowX: "auto", minWidth: 0 }}>
            <Table size="small" sx={{ minWidth: 500 }}> 
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 11, pl: { xs: 2, md: 3 } }}>VEHÍCULO</TableCell>
                  <TableCell sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 11 }}>TIPO</TableCell>
                  <TableCell sx={{ color: COLORS.MUTED, fontWeight: 700, fontSize: 11, pr: { xs: 2, md: 3 } }}>PRIORIDAD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mantenimientosPendientes.map((r, i) => (
                  <TableRow key={i} sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell sx={{ fontSize: 13, whiteSpace: "nowrap", pl: { xs: 2, md: 3 } }}>{r.vehiculo}</TableCell>
                    <TableCell sx={{ fontSize: 13, whiteSpace: "nowrap" }}>{r.tipo}</TableCell>
                    <TableCell sx={{ pr: { xs: 2, md: 3 } }}>
                      <Chip 
                        label={r.prioridad} 
                        size="small"
                        sx={{ 
                          bgcolor: getPrioridadColor(r.prioridad).bg, 
                          color: getPrioridadColor(r.prioridad).color, 
                          fontWeight: 700,
                          fontSize: 11
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

    </Stack>
  );
}