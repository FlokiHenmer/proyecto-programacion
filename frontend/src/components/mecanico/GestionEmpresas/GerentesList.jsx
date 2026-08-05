import { Box, Card, Table, TableHead, TableBody, TableRow, TableCell, Typography, Avatar, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EstadoChip from "./EstadoChipEmpresas";
import { BORDER, MUTED, TEXT, YELLOW } from "../../../constants/EmpresasMecanico";

export default function GerentesList({ gerentes = [], onEdit, onOpenMenu }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              {["Gerente", "Contacto", "Empresa", "Estado", "Acciones"].map((h) => (
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
            {gerentes.map((g) => (
              <TableRow key={g.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Avatar sx={{ bgcolor: YELLOW, color: TEXT, fontWeight: 700, width: 32, height: 32, fontSize: 13 }}>
                      {g.nombre.charAt(0)}
                    </Avatar>
                    <Typography sx={{ fontWeight: 700, color: TEXT, fontSize: { xs: 12, sm: 14 } }}>{g.nombre}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <Typography sx={{ fontWeight: 600, color: TEXT, fontSize: { xs: 12, sm: 13 } }}>{g.email}</Typography>
                  <Typography variant="caption" sx={{ color: MUTED, fontSize: { xs: 10, sm: 12 } }}>{g.telefono}</Typography>
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" }, color: TEXT, fontSize: { xs: 12, sm: 13 } }}>
                  {g.empresa}
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: { xs: "12px 6px", sm: "16px" } }}>
                  <EstadoChip estado={g.estado} />
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${BORDER}`, padding: "12px 6px" }}>
                  <Box sx={{ display: "flex", gap: 0 }}>
                    <IconButton size="small" onClick={() => onEdit?.(g)}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => onOpenMenu?.(e, g.id)}>
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