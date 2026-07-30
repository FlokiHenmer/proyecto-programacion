import { Card, CardContent, Stack, Box, Typography, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Chip, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { COLORS, EXTRA_COLORS, cardSx, buttonStyles } from "../../../constants/Gerente";

export default function OperariosList({ operarios, onAdd, anchorEl, onMenuOpen, onMenuClose, onStatusChange }) {
  return (
    <Card sx={{ ...cardSx, mb: 4 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Lista de Operarios</Typography>
            <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>Equipo registrado</Typography>
          </Box>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            onClick={onAdd}
            sx={buttonStyles.blueBtn}
          >
            Agregar Operario
          </Button>
        </Stack>

        <List disablePadding>
          {operarios.map((o, index) => (
            <ListItem
              key={index}
              divider={index !== operarios.length - 1}
              sx={{ py: 1.5, pr: 6, alignItems: 'flex-start' }} // alignItems flex-start ayuda a que si el contenido crece, no se corte
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: o.estado === "activo" ? COLORS.GREEN : EXTRA_COLORS.GRAY }}>
                  {o.nombre.charAt(0)}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                    {o.nombre}
                  </Typography>
                }
                secondary={
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography sx={{ fontSize: 12, color: COLORS.MUTED }}>{o.rol}</Typography>
                    <Typography sx={{ fontSize: 12, color: COLORS.MUTED }}>• {o.email}</Typography>
                    <Chip
                      label={o.estado}
                      size="small"
                      sx={{
                        height: 18, fontSize: 10,
                        bgcolor: o.estado === "activo" ? "#dcfce7" : "#f1f5f9",
                        color: o.estado === "activo" ? "#166534" : "#475569"
                      }}
                    />
                  </Box>
                }
              />

              <ListItemSecondaryAction>
                <IconButton onClick={(e) => onMenuOpen(e, index)} edge="end">
                  <EditIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
        >
          <MenuItem onClick={() => onStatusChange("activo")}>Activo</MenuItem>
          <MenuItem onClick={() => onStatusChange("inactivo")}>Inactivo</MenuItem>
        </Menu>
        
      </CardContent>
    </Card>
  );
}