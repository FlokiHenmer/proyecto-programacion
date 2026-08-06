import { Card, CardContent, Stack, Box, Typography, TextField, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HistoryIcon from "@mui/icons-material/History";
import EstadoChipVehiculos from "./EstadoChipVehiculos";
import { COLORS, cardSx } from "../../../constants/Gerente";

export default function VehiculosTable({ vehiculos, busqueda, setBusqueda, onVerHistorial }) {
  return (
    <Card sx={cardSx}>
      <CardContent>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={5} sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: COLORS.TEXT }}>Gestión de Vehículos</Typography>
            <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>Listado y estado actual de la flota</Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Buscar patente o modelo"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: COLORS.MUTED, fontSize: 18 }} /></InputAdornment>),
            }}
            sx={{ minWidth: { xs: "100%", sm: 400 } }}
          />
        </Stack>

        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                {["VEHÍCULO", "ÚLTIMA REVISIÓN", "ESTADO", "HISTORIAL"].map((h, index) => (
                  <TableCell
                    key={h}
                    align={index === 0 ? "left" : "center"} // Vehículo a la izquierda, el resto centrado
                    sx={{
                      fontWeight: 700,
                      color: COLORS.MUTED,
                      fontSize: { xs: 10, md: 12 },
                      px: { xs: 1, md: 2 },
                      letterSpacing: 0.5
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {vehiculos.map((v) => (
                <TableRow key={v.patente}>
                  {/* Columna de Vehículo (Alineada a la izquierda por defecto) */}  
                  <TableCell sx={{ px: { xs: 1, md: 2 }, py: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{
                        width: { xs: 30, md: 36 },
                        height: { xs: 30, md: 36 },
                        borderRadius: 2,
                        bgcolor: COLORS.BG,
                        border: `1px solid ${COLORS.BORDER}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <DirectionsCarIcon sx={{ color: COLORS.TEXT, fontSize: { xs: 16, md: 20 } }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: COLORS.TEXT, fontSize: { xs: 12, md: 14 } }}>
                          {v.modelo}
                        </Typography>
                        <Typography sx={{ color: COLORS.MUTED, fontSize: { xs: 10, md: 12 } }}>
                          {v.patente}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  {/* Última Revisión (Centrada) */}
                  <TableCell align="center" sx={{ color: COLORS.TEXT, fontSize: { xs: 11, md: 13 }, px: { xs: 1, md: 2 } }}>
                    {v.revision}
                  </TableCell>
                  
                  {/* Estado (Centrado) */}
                  <TableCell align="center" sx={{ px: { xs: 1, md: 2 } }}>
                    <Box sx={{ display: "inline-flex" }}>
                      <EstadoChipVehiculos value={v.estado} />
                    </Box>
                  </TableCell>

                  {/* Historial (Centrado) */}
                  <TableCell align="center" sx={{ px: { xs: 1, md: 2 } }}>
                    <Tooltip title="Ver historial del vehículo">
                      <IconButton size="small" onClick={() => onVerHistorial?.(v)}>
                        <HistoryIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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