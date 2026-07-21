import React from "react";
import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { MUTED, TEXT, statusColors } from "../../../constants/CalendarioMecanico";

export default function TurnosTable({ filteredTurnos }) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
        Lista de Turnos
      </Typography>

      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f8fafc" }}>
            {["VEHÍCULO", "PATENTE", "FECHA Y HORA", "ESTADO", "OBSERVACIONES"].map(h => (
              <TableCell key={h} sx={{
                fontWeight: 700,
                color: MUTED,
                fontSize: { xs: 10, sm: 12 },
                whiteSpace: "nowrap"  // Evita que los encabezados se corten
              }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        
        <TableBody>
          {filteredTurnos.map((t, i) => {
            const s = statusColors[t.estado];
            return (
              <TableRow key={i}>
                <TableCell sx={{ fontWeight: 600, color: TEXT, fontSize: 13 }}>{t.veh}</TableCell>
                <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>{t.pat}</TableCell>
                <TableCell sx={{ fontSize: 13 }}>{t.fh}</TableCell>
                <TableCell>
                  <Chip
                    label={s.label} size="small"
                    sx={{ bgcolor: s.bg, color: s.fg, fontWeight: 700, fontSize: 10 }}
                  />
                </TableCell>
                <TableCell sx={{ color: TEXT, fontSize: 13 }}>{t.obs}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}