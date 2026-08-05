import { Box, Card, Table, TableHead, TableBody, TableRow, TableCell, Typography, Avatar, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EstadoChip from "./EstadoChipEmpresas";
import { BORDER, MUTED, TEXT, BLUE_BRAND } from "../../../constants/EmpresasMecanico";

export default function OperariosListMecanico({ operarios = [], onEdit, onOpenMenu }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              {["Operario", "Rol", "Empresa", "Estado", "Acciones"].map((h) => (
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
            {operarios.map((o) => (
              <TableRow key={o.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Avatar sx={{ bgcolor: BLUE_BRAND, color: "#fff", fontWeight: 700, width: 32, height: 32, fontSize: 13 }}>
                      {o.nombre.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: TEXT, fontSize: { xs: 12, sm: 14 } }}>{o.nombre}</Typography>
                      <Typography variant="caption" sx={{ color: MUTED, fontSize: { xs: 10, sm: 12 } }}>{o.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" }, color: TEXT, fontSize: { xs: 12, sm: 13 }, fontWeight: 600 }}>
                  {o.rol}
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" }, color: TEXT, fontSize: { xs: 12, sm: 13 } }}>
                  {o.empresa}
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <EstadoChip estado={o.estado} />
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: "12px 6px" }}>
                  <Box sx={{ display: "flex", gap: 0 }}>
                    <IconButton size="small" onClick={() => onEdit?.(o)}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => onOpenMenu?.(e, o.id)}>
                      <SettingsOutlinedIcon fontSize="small" />
                    </IconButton>
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