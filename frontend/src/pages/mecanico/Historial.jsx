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

import { GREEN, GREEN_DARK, BORDER, TEXT, MUTED, cardSx, greenBtn, historialCompleto} from "../../constants/Mecanico"
import HistorialMobileList from "../../components/mecanico/HistorialMobileList";
import HistorialDesktopTable from "../../components/mecanico/HistorialDesktopTable";

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
          <HistorialMobileList data={historialCompleto} />
        ) : (
          // VISTA ESCRITORIO: Tu tabla original
          <HistorialDesktopTable data={historialCompleto} />
        )}
          
      </Box>  

      {/* Botón "Agregar nuevo trabajo" posicionado abajo de todo */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button 
          startIcon={<BuildIcon sx={{ fontSize: 18 }} />}
          sx={{ ...greenBtn, px: 4, py: 1.5 }}
          onClick={() => navigate("/mecanico/trabajos")}
        >
          Agregar nuevo trabajo
        </Button>
      </Box>

    </Box>
  );
}