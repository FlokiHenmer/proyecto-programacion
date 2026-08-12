import React from "react";
import {
  Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Stack, Typography
} from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { EstadoColor } from "./CriticidadChip";
import { COLORS } from "../../../constants/Gerente";

export default function AlarmasTabla({ alarmas, onVerDetalles, onEditarAlarma }) {
  return (
    <Box sx={{ overflowX: { xs: "auto", md: "visible" } }}>
      <Table sx={{ minWidth: { xs: 650, md: "auto" }, width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>VEHÍCULO</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>TIPO</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>ESTADO</TableCell>
            <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alarmas.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.id}</TableCell>
              <TableCell>
                <DirectionsCarFilledIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle', color: COLORS.MUTED }}/> 
                {a.vehiculo}
              </TableCell>
              <TableCell>{a.tipo}</TableCell>
              <TableCell>
                <EstadoColor estado={a.estado} />
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton size="small" onClick={() => onVerDetalles(a)} title="Ver detalles y a quién se avisó">
                    <VisibilityIcon fontSize="small" sx={{ color: COLORS.MUTED }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => onEditarAlarma(a)} title="Editar / Asignar Turno">
                    <EditIcon fontSize="small" sx={{ color: COLORS.MUTED }} />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          {alarmas.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3, color: COLORS.MUTED }}>
                No se encontraron alarmas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}