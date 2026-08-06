import React from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
import { cardSx, BORDER, TEXT, MUTED } from "../../../constants/HistorialGerente";
import TipoChip from "./TipoChip";

export default function HistorialTablaDesktop({ filtered, setSelected, onVerHistorial }) {
  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={{ minWidth: 820 }}>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                {["Fecha", "Vehículo", "Tipo", "Operario", "Acciones"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{ fontWeight: 700, color: MUTED, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell sx={{ color: TEXT, fontWeight: 500 }}>{r.fecha}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500, color: TEXT, fontSize: 14 }}>
                      {r.vehiculo}
                    </Typography>
                    <Typography sx={{ color: MUTED, fontSize: 12 }}>{r.patente}</Typography>
                  </TableCell>
                  <TableCell>
                    <TipoChip tipo={r.tipo} />
                  </TableCell>
                  <TableCell sx={{ color: TEXT, fontSize: 14 }}>{r.operario}</TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Ver detalle del servicio">
                        <IconButton
                          size="small"
                          onClick={() => setSelected(r)}
                          sx={{
                            border: `1px solid ${BORDER}`,
                            borderRadius: 1.5,
                            "&:hover": { bgcolor: "#f1f5f9" },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 18, color: TEXT }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Ver historial del vehículo">
                        <IconButton
                          size="small"
                          onClick={() => onVerHistorial?.(r)}
                          sx={{
                            border: `1px solid ${BORDER}`,
                            borderRadius: 1.5,
                            "&:hover": { bgcolor: "#f1f5f9" },
                          }}
                        >
                          <HistoryIcon sx={{ fontSize: 18, color: TEXT }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center", py: 4, color: MUTED }}>
                    No se encontraron resultados con los filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}
