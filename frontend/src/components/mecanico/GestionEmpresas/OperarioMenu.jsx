import React from "react";
import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BlockIcon from "@mui/icons-material/Block";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { BORDER, GREEN_TEXT, RED, RED_BG, YELLOW_TEXT } from "../../../constants/EmpresasMecanico";

export default function OperarioMenu({ anchorEl, onClose, onChangeEstado, onBorrar }) {
  return (
    <Menu 
      anchorEl={anchorEl} 
      open={Boolean(anchorEl)} 
      onClose={onClose} 
      PaperProps={{ sx: { borderRadius: 2, border: `1px solid ${BORDER}`, boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" } }}
    >
      <MenuItem onClick={() => onChangeEstado("Activo")}>
        <ListItemIcon><EngineeringIcon fontSize="small" sx={{ color: GREEN_TEXT }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Activo</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => onChangeEstado("Suspendido")}>
        <ListItemIcon><BlockIcon fontSize="small" sx={{ color: YELLOW_TEXT }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Suspender Operario</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onChangeEstado("Inactivo")}>
        <ListItemIcon><PersonOffIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Inactivo</ListItemText>
      </MenuItem>

      <Box sx={{ my: 0.5, borderTop: `1px solid ${BORDER}` }} />
      
      <MenuItem onClick={onBorrar} sx={{ color: RED, "&:hover": { bgcolor: RED_BG } }}>
        <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Eliminar Operario</ListItemText>
      </MenuItem>
    </Menu>
  );
}