import React from "react";
import { List, ListItem, Avatar, Box, Typography, Stack, Divider } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { MUTED, BORDER } from "../../constants/Mecanico";

export default function HistorialMobileList({ data }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'white', borderRadius: 3, border: `1px solid ${BORDER}`, p: 0 }}>
      {data.map((row, i) => (
        <React.Fragment key={row.id}>

          <ListItem sx={{ py: 1.5, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            
            <Avatar sx={{ bgcolor: "#f1f5f9", color: MUTED, width: 30, height: 30, flexShrink: 0, mt: 0 }}>
              <DirectionsCarFilledIcon fontSize="small" />
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Título del vehículo */}  
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                {row.vehiculo}
              </Typography>

              {/* Servicio con whiteSpace normal para permitir salto de línea */}
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                <Typography variant="body2" sx={{ fontSize: 13, wordBreak: 'break-word' }}>
                  {row.servicio}
                </Typography>
              </Stack>

              {/* Mecánico */}
              <Box sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: 10, bgcolor: "#e2e8f0", px: 1, borderRadius: 1, display: 'inline-block' }}>
                  {row.mecanico}
                </Typography>
              </Box>

            </Box>
          </ListItem>

          {i < data.length - 1 && <Divider component="li" sx={{ ml: 2 }} />}
        </React.Fragment>
      ))}
    </List>
  );
}