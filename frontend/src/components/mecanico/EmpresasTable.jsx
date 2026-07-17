import { Box, Card, IconButton, Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EstadoChip from "./EstadoChipEmpresas";
import { BORDER, MUTED, TEXT } from "../../constants/EmpresasMecanico";

export default function EmpresasTable({ filtradas, onEdit, onOpenMenu }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 500 }}> {/* minWidth ajustado para asegurar mejor comportamiento */}
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              {["Empresa", "Gerente", "Flota", "Estado", "Acciones"].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    color: MUTED,
                    fontWeight: 700,
                    fontSize: { xs: 10, sm: 11 }, // Fuente reducida en móvil
                    padding: { xs: "8px 6px", sm: "16px" }, // Padding compacto
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${BORDER}`
                  }}
                  align={h === "Flota" ? "center" : "left"}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtradas.map((e) => (
              <TableRow key={e.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <Typography sx={{ fontWeight: 700, color: TEXT, fontSize: { xs: 12, sm: 14 } }}>{e.razonSocial}</Typography>
                  <Typography variant="caption" sx={{ color: MUTED, fontSize: { xs: 10, sm: 12 } }}>{e.cuit}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <Typography sx={{ fontWeight: 600, color: TEXT, fontSize: { xs: 12, sm: 14 } }}>{e.gerente}</Typography>
                  <Typography variant="caption" sx={{ color: MUTED, fontSize: { xs: 10, sm: 12 } }}>{e.email.split('@')[0]}...</Typography>
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: `1px solid ${BORDER}`, padding: "12px 6px" }}>
                  <Typography sx={{ fontWeight: 600, color: TEXT, fontSize: { xs: 13, sm: 15 } }}>{e.vehiculos}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <EstadoChip estado={e.estado} />
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: "12px 6px" }}>
                  <Box sx={{ display: "flex", gap: 0 }}>
                    <IconButton size="small" onClick={() => onEdit(e)}><EditOutlinedIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={(event) => onOpenMenu(event, e.id)}><SettingsOutlinedIcon fontSize="small" /></IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}