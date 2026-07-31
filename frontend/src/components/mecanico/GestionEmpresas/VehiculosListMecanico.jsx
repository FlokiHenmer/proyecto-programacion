import { Box, Card, Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EstadoChip from "./EstadoChipEmpresas";
import { BORDER, MUTED, TEXT } from "../../../constants/Mecanico";

export default function VehiculosListMecanico({ vehiculos = [] }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 560 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              {["Vehículo", "Empresa", "Km", "Última Revisión", "Estado"].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    color: MUTED,
                    fontWeight: 700,
                    fontSize: { xs: 10, sm: 11 },
                    padding: { xs: "8px 6px", sm: "16px" },
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${BORDER}`,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiculos.map((v) => (
              <TableRow key={v.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: "#f8fafc", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <DirectionsCarIcon sx={{ color: TEXT, fontSize: 18 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: TEXT, fontSize: { xs: 12, sm: 14 } }}>{v.modelo}</Typography>
                      <Typography variant="caption" sx={{ color: MUTED, fontSize: { xs: 10, sm: 12 } }}>{v.patente}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" }, color: TEXT, fontSize: { xs: 12, sm: 13 } }}>
                  {v.empresa}
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" }, color: TEXT, fontSize: { xs: 12, sm: 13 }, fontWeight: 600 }}>
                  {v.km}
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" }, color: MUTED, fontSize: { xs: 11, sm: 13 } }}>
                  {v.revision}
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <EstadoChip estado={v.estado} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
