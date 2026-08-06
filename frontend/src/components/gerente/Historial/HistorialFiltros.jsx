import React from "react";
import { Card, CardContent, Stack, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { cardSx, MUTED, TIPOS, OPERARIOS, VEHICULOS } from "../../../constants/HistorialGerente";

export default function HistorialFiltros({
  search,
  setSearch,
  tipo,
  setTipo,
  desde,
  setDesde,
  hasta,
  setHasta,
  operario,
  setOperario,
  vehiculo,
  setVehiculo,
}) {
  return (
    <Card sx={{ ...cardSx, mb: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
              size="small"
              placeholder="Buscar por vehículo, patente u operario..."
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
              select
              label="Vehículo"
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
              sx={{ flex: 1, minWidth: 200 }}
            >
              {VEHICULOS.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              select
              label="Operario"
              value={operario}
              onChange={(e) => setOperario(e.target.value)}
              sx={{ flex: 1, minWidth: 170 }}
            >
              {OPERARIOS.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
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
        </Stack>
      </CardContent>
    </Card>
  );
}
