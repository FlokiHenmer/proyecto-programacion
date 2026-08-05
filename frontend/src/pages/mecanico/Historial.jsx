import React, { useMemo, useState } from "react";
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
import HistorialMobileList from "../../components/mecanico/Historial/HistorialMobileList";
import HistorialDesktopTable from "../../components/mecanico/Historial/HistorialDesktopTable";
import VehiculoHistorialDetalle from "../../components/mecanico/Historial/VehiculoHistorialDetalle";
import HistorialFiltros from "../../components/mecanico/Historial/HistorialFiltros";

export default function Historial() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [patenteSel, setPatenteSel] = useState(null);

  // Filtrado reactivo para la barra de búsqueda y fechas
  const filtrados = useMemo(() => {
    const q = search.trim().toLowerCase();
    return historialCompleto.filter((r) => {
      const matchQ =
        !q ||
        r.vehiculo.toLowerCase().includes(q) ||
        r.patente.toLowerCase().includes(q) ||
        (r.servicio && r.servicio.toLowerCase().includes(q));
      const matchDesde = !desde || r.fecha >= desde;
      const matchHasta = !hasta || r.fecha <= hasta;
      return matchQ && matchDesde && matchHasta;
    });
  }, [search, desde, hasta]);

  // Busca los registros que coincidan ya sea por patente o por nombre de vehículo
  const registrosVehiculo = useMemo(
    () => historialCompleto.filter((r) => r.patente === patenteSel || r.vehiculo === patenteSel),
    [patenteSel]
  );

  // Si se seleccionó una patente, muestra el detalle de los servicios viejos de ese vehículo
  if (patenteSel) {
    return (
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <VehiculoHistorialDetalle
          patente={patenteSel}
          registros={registrosVehiculo}
          onVolver={() => setPatenteSel(null)}
        />
      </Box>
    );
  }

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

      {/* Barra de Búsqueda y Filtros */}
      <HistorialFiltros
        search={search}
        setSearch={setSearch}
        tipo={tipo}
        setTipo={setTipo}
        desde={desde}
        setDesde={setDesde}
        hasta={hasta}
        setHasta={setHasta}
      />


      <Box sx={{ p: 2 }}>
        {isMobile ? (
          <HistorialMobileList data={filtrados} onVerVehiculo={setPatenteSel} />
        ) : (
          // VISTA ESCRITORIO: Tu tabla original
          <HistorialDesktopTable data={filtrados} onVerVehiculo={setPatenteSel} />
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