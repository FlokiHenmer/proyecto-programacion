import React from "react";
import { Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import DeleteIcon from "@mui/icons-material/Delete";
import { BORDER, GREEN_TEXT, YELLOW_TEXT, RED, RED_BG } from "../../../constants/EmpresasMecanico";

export default function VehiculoMenu({ anchorEl, onClose, onChangeEstado, onBorrar }) {
  return (
    <Menu 
      anchorEl={anchorEl} 
      open={Boolean(anchorEl)} 
      onClose={onClose} 
      PaperProps={{ sx: { borderRadius: 2, border: `1px solid ${BORDER}`, boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" } }}
    >
      <MenuItem onClick={() => onChangeEstado("Activo")}>
        <ListItemIcon><LocalShippingIcon fontSize="small" sx={{ color: GREEN_TEXT }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Activo</ListItemText>
      </MenuItem>
      
      <MenuItem onClick={() => onChangeEstado("En Taller")}>
        <ListItemIcon><BuildCircleIcon fontSize="small" sx={{ color: YELLOW_TEXT }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Enviar al Taller</ListItemText>
      </MenuItem>

      <MenuItem onClick={() => onChangeEstado("Baja")}>
        <ListItemIcon><NoCrashIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Dar de Baja</ListItemText>
      </MenuItem>

      <Box sx={{ my: 0.5, borderTop: `1px solid ${BORDER}` }} />
      
      <MenuItem onClick={onBorrar} sx={{ color: RED, "&:hover": { bgcolor: RED_BG } }}>
        <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: RED }} /></ListItemIcon>
        <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Eliminar Vehículo</ListItemText>
      </MenuItem>
    </Menu>
  );
}