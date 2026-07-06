import { Box, Typography, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { COLORS } from "../../constants/Gerente";

export default function Sidebar({ title, subtitle, items, currentPath, onNavigate }) {
  return (
    <Box sx={{ p: 2, borderRight: `1px solid ${COLORS.BORDER}`, height: "100%" }}>
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography sx={{ fontWeight: 800, color: COLORS.TEXT, fontSize: 16 }}>{title}</Typography>
        <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>{subtitle}</Typography>
      </Box>
      {items.map((it) => (
        <ListItemButton 
          key={it.path} 
          onClick={() => onNavigate(it.path)} 
          sx={{ borderRadius: 2, bgcolor: currentPath === it.path ? COLORS.GREEN : "transparent" }}
        >
          <ListItemIcon>{it.icon}</ListItemIcon>
          <ListItemText primary={it.label} />
        </ListItemButton>
      ))}
    </Box>
  );
}