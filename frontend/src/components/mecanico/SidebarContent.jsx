import React from "react";
import { 
  Box, 
  Typography, 
  Divider, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from "@mui/material";
// Asegúrate de importar tus constantes correctamente
import { GREEN, GREEN_DARK, TEXT, MUTED } from "../../constants/Mecanico";

export default function SidebarContent({ items, currentPath, onNavigate }) {
  return (
    <Box sx={{ p: 2, height: "100%", boxSizing: "border-box", overflowY: "auto" }}>
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography sx={{ fontWeight: 800, color: TEXT, fontSize: 16 }}>
          Mantenimiento
        </Typography>
        <Typography sx={{ color: MUTED, fontSize: 13 }}>Panel Técnico</Typography>
      </Box>

      <Divider sx={{ mb: 1 }} />
      
      <List disablePadding>
        {items.map((it) => {
          const isActive = currentPath === it.path;
          return (
            <ListItemButton
              key={it.label}
              onClick={() => onNavigate(it.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                ...(isActive && {
                  bgcolor: GREEN,
                  color: "#06210a",
                  "&:hover": { bgcolor: GREEN_DARK },
                }),
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isActive ? "#06210a" : MUTED }}>
                {it.icon}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: 14 }}
                primary={it.label}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}