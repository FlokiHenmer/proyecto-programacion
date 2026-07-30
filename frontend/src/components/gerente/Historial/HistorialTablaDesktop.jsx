import React from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { cardSx, BORDER, TEXT, MUTED } from "../../../constants/HistorialGerente";
import TipoChip from "./TipoChip";

export default function HistorialTablaDesktop({ filtered, setSelected }) {
  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={{ minWidth: 760 }}>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                {["Fecha", "Vehículo", "Tipo", "Operario", "Resultado", "Acción"].map((h) => (
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
                  </TableCell>
                  <TableCell>
                    <TipoChip tipo={r.tipo} />
                  </TableCell>
                  <TableCell sx={{ color: TEXT, fontSize: 14 }}>{r.operario}</TableCell>
                  <TableCell>
                    {r.resultado === "ok" ? (
                      <Tooltip title="Completado sin incidencias">
                        <CheckCircleIcon sx={{ color: "#16a34a" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Completado con advertencias">
                        <WarningAmberIcon sx={{ color: "#f59e0b" }} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
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