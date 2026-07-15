import React from "react";
import { Box, Typography, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { BORDER, BG, MUTED, tipoColor } from "../../constants/HistorialGerente";

export default function HistorialListaMobile({ filtered, setSelected }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'white', borderRadius: 3, border: `1px solid ${BORDER}` }}>
      {filtered.map((row, i) => (
        <React.Fragment key={i}>
          <ListItem button onClick={() => setSelected(row)} sx={{ py: 1.5 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: BG, color: MUTED }}>
                <DirectionsCarFilledIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 700 }}>{row.vehiculo}</Typography>
                  <Chip 
                    label={row.tipo} 
                    size="small" 
                    sx={{ 
                      fontSize: 10,
                      height: 20,
                      bgcolor: tipoColor(row.tipo).bg, 
                      color: tipoColor(row.tipo).color, 
                      fontWeight: 700 
                    }} 
                  />
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontSize: 12, color: MUTED }}>
                    {row.fecha}
                  </Typography>
                  {row.resultado === "ok" ? (
                    <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 18 }} />
                  ) : (
                    <WarningAmberIcon sx={{ color: "#d97706", fontSize: 18 }} />
                  )}
                </Box>
              }
            />
          </ListItem>
          {i < filtered.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}