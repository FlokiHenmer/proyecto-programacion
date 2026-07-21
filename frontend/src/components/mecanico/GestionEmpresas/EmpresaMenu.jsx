import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import { BORDER, GREEN_TEXT, YELLOW_TEXT, RED, RED_BG } from "../../../constants/EmpresasMecanico";

export default function EmpresaMenu({ anchorEl, onClose, onChangeEstado, onBorrar }) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, border: `1px solid ${BORDER}`, boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" } }}>
      <MenuItem onClick={() => onChangeEstado("Activa")}>
        <ListItemIcon><BusinessIcon fontSize="small" sx={{ color: GREEN_TEXT }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Activa</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onChangeEstado("En Revisión")}>
        <ListItemIcon><SupervisorAccountOutlinedIcon fontSize="small" sx={{ color: YELLOW_TEXT }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Poner En Revisión</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onChangeEstado("Inactiva")}>
        <ListItemIcon><LocalShippingOutlinedIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Inactiva</ListItemText>
      </MenuItem>
      <Box sx={{ my: 0.5, borderTop: `1px solid ${BORDER}` }} />
      <MenuItem onClick={onBorrar} sx={{ color: RED, "&:hover": { bgcolor: RED_BG } }}>
        <ListItemIcon><BusinessIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Eliminar Empresa</ListItemText>
      </MenuItem>
    </Menu>
  );
}
