import { Card, CardContent, Stack, Box, Typography, Button, List, ListItem, ListItemIcon, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Chip, Menu, MenuItem, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { COLORS, EXTRA_COLORS, cardSx, buttonStyles } from "../../../constants/Gerente";

export default function OperariosList({ operarios, onAdd, onEdit, onDelete, anchorEl, onMenuOpen, onMenuClose, onStatusChange, onVerHistorial }) {
  return (
    <Card sx={{ ...cardSx, mb: 4 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, width: "100%" }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Lista de Operarios</Typography>
            <Typography sx={{ color: COLORS.MUTED, fontSize: 13 }}>Equipo registrado</Typography>
          </Box>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            onClick={onAdd}
            sx={{ ...buttonStyles.blueBtn, px: 4, py: 1.5, alignSelf: "flex-start" }}
          >
            Agregar Operario
          </Button>
        </Box>

        <List disablePadding>
          {operarios.map((o, index) => (
            <ListItem
              key={index}
              divider={index !== operarios.length - 1}
              sx={{ py: 1.5, pr: 9, alignItems: 'flex-start' }} // Reducimos el padding derecho ya que el botón directo ya no está
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
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Tooltip title="Ver historial de formularios">
                    <IconButton onClick={() => onVerHistorial?.(o)} size="small">
                      <HistoryIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar operario">
                    <IconButton onClick={() => onEdit?.(o, index)} size="small">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <IconButton onClick={(e) => onMenuOpen(e, index)} size="small">
                    <SettingsOutlinedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
        >
          <MenuItem onClick={() => onStatusChange("activo")}>
            <ListItemIcon><PersonIcon fontSize="small" sx={{ color: "#166534" }} /></ListItemIcon>
            <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Activo</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => onStatusChange("inactivo")}>        
            <ListItemIcon><PersonOffIcon fontSize="small" sx={{ color: COLORS.YELLOW_TEXT }} /></ListItemIcon>
            <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600 } }}>Marcar Inactivo</ListItemText>
          </MenuItem>
          
          {/* Opción de Eliminar en el menú de la tuerca */}
          <MenuItem onClick={onDelete}>        
            <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: EXTRA_COLORS.RED || "#ef4444" }} /></ListItemIcon>
            <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 13, fontWeight: 600, color: EXTRA_COLORS.RED || "#ef4444" } }}>Eliminar Operario</ListItemText>
          </MenuItem>
        </Menu>
        
      </CardContent>
    </Card>
  );
}