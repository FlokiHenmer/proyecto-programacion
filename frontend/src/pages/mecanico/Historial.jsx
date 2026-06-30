import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Stack,
  Avatar,
  useMediaQuery, 
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

const GREEN = "#44FF34";
const GREEN_DARK = "#22cc15";
const BORDER = "#e5e7eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";

const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
};

const greenBtn = {
  bgcolor: GREEN,
  color: "#06210a",
  fontWeight: 700,
  textTransform: "none",
  borderRadius: 2,
  boxShadow: "none",
  px: 4,
  py: 1.2,
  "&:hover": { bgcolor: GREEN_DARK, boxShadow: "none" },
};

const historialCompleto = [
  { id: 1, patente: "ABC-123", vehiculo: "Toyota Hilux", fecha: "12/10/2023", servicio: "Cambio de Aceite", mecanico: "Ricardo Gómez" },
  { id: 2, patente: "XYZ-789", vehiculo: "Ford Ranger", fecha: "11/10/2023", servicio: "Frenos Delanteros", mecanico: "Ricardo Gómez" },
  { id: 3, patente: "DEF-456", vehiculo: "VW Amarok", fecha: "10/10/2023", servicio: "Suspensión y Alineación", mecanico: "Ricardo Gómez" },
  { id: 4, patente: "GHI-012", vehiculo: "Mercedes Sprinter", fecha: "09/10/2023", servicio: "Alineación Completa", mecanico: "Ricardo Gómez" },
  { id: 5, patente: "JKL-345", vehiculo: "Iveco Daily", fecha: "08/10/2023", servicio: "Ajuste General de Motor", mecanico: "Ricardo Gómez" },
  { id: 6, patente: "MNO-789", vehiculo: "Fiat Fiorino", fecha: "05/10/2023", servicio: "Cambio de Bujías", mecanico: "Ricardo Gómez" },
];

export default function Historial() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
      
      {/* Título de la Sección */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
          Registro de Actividad
        </Typography>
        <Typography variant="caption" sx={{ color: MUTED, fontSize: 13 }}>
          Historial completo de servicios y modificaciones en la flota.
        </Typography>
      </Box>


      <Box sx={{ p: 2 }}>
        {isMobile ? (
          <List sx={{ width: '100%', bgcolor: 'white', borderRadius: 3, border: `1px solid ${BORDER}`, p: 0 }}>
            {historialCompleto.map((row, i) => (
              <React.Fragment key={row.id}>
                
                <ListItem sx={{ py: 1.5, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  
                  <Avatar sx={{ bgcolor: "#f1f5f9", color: MUTED, width: 30, height: 30, flexShrink: 0, mt: 0 }}>
                    <DirectionsCarFilledIcon fontSize="small" />
                  </Avatar>
                  
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Título del vehículo */}
                    <Typography sx={{ fontWeight: 700, fontSize: 14, whiteSpace: 'normal' }}>
                      {row.vehiculo}
                    </Typography>
                    
                    {/* Servicio con whiteSpace normal para permitir salto de línea */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                      <Typography variant="body2" sx={{ fontSize: 13, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {row.servicio}
                      </Typography>
                    </Stack>

                    {/* Mecánico (lo ponemos debajo para que no moleste si el texto del servicio es largo) */}
                    <Box sx={{ mt: 1 }}>
                      <Typography sx={{ fontSize: 10, bgcolor: "#e2e8f0", px: 1, borderRadius: 1, display: 'inline-block' }}>
                        {row.mecanico}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
                
                {i < historialCompleto.length - 1 && <Divider component="li" sx={{ ml: 2 }} />}
              </React.Fragment>
            ))}
          </List>
        ) : (

          // VISTA ESCRITORIO: Tu tabla original
          <Card sx={{ cardSx }}>
            <Box sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 600 }}>
                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Vehículo</TableCell>
                    <TableCell>Servicio</TableCell>
                    <TableCell>Mecánico</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historialCompleto && historialCompleto.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.fecha}</TableCell>
                      
                      {/* CORRECCIÓN AQUÍ: Busca "vehiculo", si no, busca "modelo" */}
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {/* Icono del auto */}
                          <DirectionsCarFilledIcon sx={{ color: MUTED, fontSize: 18 }} />
                          
                          {/* Nombre del vehículo */}
                          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                            {row.vehiculo || row.modelo || "N/A"}
                          </Typography>
                        </Stack>
                      </TableCell>
                      
                      <TableCell>{row.servicio || "N/A"}</TableCell>
                      
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar sx={{ width: 24, height: 24, fontSize: 10, bgcolor: "#cbd5e1" }}>
                            {row.mecanico?.charAt(0)}
                          </Avatar>
                          <Typography sx={{ fontSize: 13 }}>{row.mecanico}</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Card>
        )}  
      </Box>  

      {/* Botón "Agregar nuevo trabajo" posicionado abajo de todo */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button 
          startIcon={<BuildIcon sx={{ fontSize: 18 }} />}
          sx={greenBtn} 
          onClick={() => navigate("/mecanico/trabajos")}
        >
          Agregar nuevo trabajo
        </Button>
      </Box>

    </Box>
  );
}