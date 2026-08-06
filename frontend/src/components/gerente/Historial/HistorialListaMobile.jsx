import React from "react";
import { Box, Typography, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HistoryIcon from "@mui/icons-material/History";
import { BORDER, BG, MUTED, tipoColor } from "../../../constants/HistorialGerente";

export default function HistorialListaMobile({ filtered, setSelected, onVerHistorial }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'white', borderRadius: 3, border: `1px solid ${BORDER}` }}>
      {filtered.map((row, i) => (
        <React.Fragment key={i}>
          <ListItem
            button
            onClick={() => setSelected(row)}
            sx={{ py: 1.5 }}
            secondaryAction={
              <Tooltip title="Ver historial del vehículo">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVerHistorial?.(row);
                  }}
                  sx={{ border: `1px solid ${BORDER}`, borderRadius: 1.5 }}
                >
                  <HistoryIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: BG, color: MUTED }}>
                <DirectionsCarFilledIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>

            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, justifyContent: 'space-between', pr: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: 12, color: MUTED }}>
                    {row.fecha}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 12, color: MUTED }}>
                    {row.operario}
                  </Typography>
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
