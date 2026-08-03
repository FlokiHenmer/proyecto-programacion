import React from "react";
import { Card, CardContent, Stack, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { cardSx, MUTED, TIPOS_SERVICIO } from "../../../constants/Mecanico";

export default function HistorialFiltros({
  search,
  setSearch,
  tipo,
  setTipo,
  desde,
  setDesde,
  hasta,
  setHasta,
}) {
  return (
    <Card sx={cardSx}>
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            size="small"
            placeholder="Buscar por vehículo, patente o servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2, minWidth: 200 }}
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
        </Stack>
      </CardContent>
    </Card>
  );
}