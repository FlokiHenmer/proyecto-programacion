import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Tooltip,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

const GREEN = "#44FF34";
const BORDER = "#e5e7eb";
const TEXT = "#334155";
const MUTED = "#64748b";
const BG = "#f8fafc";
const cardSx = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "none",
  bgcolor: "#fff",
};
const TIPOS = ["Todos", "Preventivo", "Correctivo", "Predictivo", "Inspección"];
const tipoColor = (t) => {
  switch (t) {
    case "Preventivo":
      return { bg: "#dcfce7", color: "#166534" };
    case "Correctivo":
      return { bg: "#fee2e2", color: "#b91c1c" };
    case "Predictivo":
      return { bg: "#dbeafe", color: "#1d4ed8" };
    case "Inspección":
      return { bg: "#fef3c7", color: "#a16207" };
    default:
      return { bg: "#f1f5f9", color: MUTED };
  }
};
const MOCK = [
  { id: "T-1042", fecha: "12/10/2025", vehiculo: "Scania R450 (ABC-123)", tipo: "Preventivo", operario: "Juan Pérez", resultado: "ok" },
  { id: "T-1041", fecha: "10/10/2025", vehiculo: "Mercedes Actros (DEF-456)", tipo: "Correctivo", operario: "Luis Gómez", resultado: "warn" },
  { id: "T-1040", fecha: "05/10/2025", vehiculo: "Iveco Stralis (GHI-789)", tipo: "Inspección", operario: "Carla Ruiz", resultado: "ok" },
  { id: "T-1039", fecha: "01/10/2025", vehiculo: "VW Constellation (JKL-012)", tipo: "Predictivo", operario: "Martín Díaz", resultado: "ok" },
  { id: "T-1038", fecha: "27/09/2025", vehiculo: "Ford Cargo (MNO-345)", tipo: "Correctivo", operario: "Ana Torres", resultado: "warn" },
  { id: "T-1037", fecha: "22/09/2025", vehiculo: "Scania G410 (PQR-678)", tipo: "Preventivo", operario: "Juan Pérez", resultado: "ok" },
];
function TipoChip({ tipo }) {
  const c = tipoColor(tipo);
  return (
    <Chip
      size="small"
      label={tipo}
      sx={{ bgcolor: c.bg, color: c.color, fontWeight: 700, borderRadius: 1.5 }}
    />
  );
}
export default function HistorialGerente() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => {
    return MOCK.filter((r) => {
      if (search && !r.vehiculo.toLowerCase().includes(search.toLowerCase())) return false;
      if (tipo !== "Todos" && r.tipo !== tipo) return false;
      // Simple date filter (dd/mm/yyyy → yyyy-mm-dd)
      const toISO = (s) => {
        const [d, m, y] = s.split("/");
        return `${y}-${m}-${d}`;
      };
      const iso = toISO(r.fecha);
      if (desde && iso < desde) return false;
      if (hasta && iso > hasta) return false;
      return true;
    });
  }, [search, tipo, desde, hasta]);

  const isMobile = useMediaQuery("(max-width:600px)");
  
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: BG, minHeight: "100vh" }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "#fff", border: `1px solid ${BORDER}`, color: TEXT, display: "flex" }}>
          <HistoryIcon />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
             Consulta cuestionarios y servicios finalizados de toda la flota 
          </Typography>
        </Box>
      </Stack>
      {/* Filtros */}
      <Card sx={{ ...cardSx, mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
              size="small"
              placeholder="Buscar por vehículo o patente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 2, minWidth: 220 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: MUTED, fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              type="date"
              label="Desde"
              InputLabelProps={{ shrink: true }}
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              sx={{ flex: 1, minWidth: 150 }}
            />
            <TextField
              size="small"
              type="date"
              label="Hasta"
              InputLabelProps={{ shrink: true }}
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              sx={{ flex: 1, minWidth: 150 }}
            />
            <TextField
              size="small"
              select
              label="Tipo de Servicio"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              sx={{ flex: 1, minWidth: 170 }}
            >
              {TIPOS.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </CardContent>
      </Card>
      
      {/* Tabla */}
      <Box sx={{ mt: 2 }}>
        {isMobile ? (
          // VISTA MÓVIL: Lista 
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
        ) : (
          
          // VISTA ESCRITORIO: Tu tabla original
          <Card sx={cardSx}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ overflowX: "auto" }}>
                <Table size="small" sx={{ minWidth: 760 }}>
                  <TableHead sx={{ bgcolor: "#f8fafc" }}>
                    <TableRow>
                      {["Fecha", "Vehículo", "Tipo", "Operario", "Resultado", "Acción"].map((h) => (
                        <TableCell
                          key={h}
                          sx={{ fontWeight: 700, color: MUTED, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}
                        >
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell sx={{ color: TEXT, fontWeight: 500 }}>{r.fecha}</TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 500, color: TEXT, fontSize: 14 }}>
                            {r.vehiculo}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TipoChip tipo={r.tipo} />
                        </TableCell>
                        <TableCell sx={{ color: TEXT, fontSize: 14 }}>{r.operario}</TableCell>
                        <TableCell>
                          {r.resultado === "ok" ? (
                            <Tooltip title="Completado sin incidencias">
                              <CheckCircleIcon sx={{ color: "#16a34a" }} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Completado con advertencias">
                              <WarningAmberIcon sx={{ color: "#f59e0b" }} />
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => setSelected(r)}
                            sx={{
                              border: `1px solid ${BORDER}`,
                              borderRadius: 1.5,
                              "&:hover": { bgcolor: "#f1f5f9" },
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: 18, color: TEXT }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ textAlign: "center", py: 4, color: MUTED }}>
                          No se encontraron resultados con los filtros aplicados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Modal detalles */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ pb: 1, fontWeight: 800, color: TEXT }}>
          Detalle del Servicio
        </DialogTitle>
        
        <DialogContent dividers sx={{ bgcolor: BG }}>
          {selected && (
            <Stack spacing={2}>
              {/* Bloque Info */}
              <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2, border: `1px solid ${BORDER}` }}>
                <Stack spacing={1.5}>
                  <Row label="Vehículo:" value={selected.vehiculo} />
                  <Row label="Operario:" value={selected.operario} />
                  <Row label="Fecha:" value={selected.fecha} />
                  <Row 
                    label="Tipo:" 
                    value={<TipoChip tipo={selected.tipo} />} 
                  />
                </Stack>
              </Box>

              {/* Bloque Observaciones */}
              <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2, border: `1px solid ${BORDER}` }}>
                <Typography variant="caption" sx={{ color: MUTED, fontWeight: 800, display: 'block', mb: 1 }}>
                  OBSERVACIONES Y RESULTADO
                </Typography>
                <Typography sx={{ color: TEXT, fontSize: 14, mb: 1 }}>
                  {selected.observaciones || "Servicio realizado según protocolo. Checklist completo y firmado."}
                </Typography>
                
                <Stack direction="row" alignItems="center" spacing={1}>
                  {selected.resultado === "ok" ? (
                    <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 20 }} />
                  ) : (
                    <WarningAmberIcon sx={{ color: "#d97706", fontSize: 20 }} />
                  )}
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: selected.resultado === "ok" ? "#16a34a" : "#d97706" }}>
                    {selected.resultado === "ok" ? "Sin incidencias" : "Con advertencias"}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setSelected(null)} sx={{ color: MUTED, fontWeight: 600, textTransform: "none" }}>
            Cerrar
          </Button>
          <Button 
            variant="contained"
            onClick={() => console.log("Descargando...")}
            sx={{ bgcolor: GREEN, color: "#000", textTransform: "none", fontWeight: 600, px: 3, "&:hover": { bgcolor: "#36d629"} }}
          >
            Descargar PDF
          </Button>
        </DialogActions>
      </Dialog>
  </Box>
);
}
function Row({ label, value }) {
return (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography sx={{ color: MUTED, fontSize: 13, fontWeight: 600 }}>{label}</Typography>
    <Box sx={{ color: TEXT, fontSize: 14, fontWeight: 600 }}>{value}</Box>
  </Stack>
);
}

