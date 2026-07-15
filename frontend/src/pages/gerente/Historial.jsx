import React, { useMemo, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

import { BG, MOCK } from "../../constants/HistorialGerente";
import HistorialHeader from "../../components/gerente/HistorialHeader";
import HistorialFiltros from "../../components/gerente/HistorialFiltros";
import HistorialListaMobile from "../../components/gerente/HistorialListaMobile";
import HistorialTablaDesktop from "../../components/gerente/HistorialTablaDesktop";
import DetalleDialog from "../../components/gerente/DetalleDialog";


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
      {/* Header */}
      <HistorialHeader />

      {/* Filtros */}
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
      
      {/* Tabla */}
      <Box sx={{ mt: 2 }}>
        {isMobile ? (
          // VISTA MÓVIL: Lista 
          <HistorialListaMobile filtered={filtered} setSelected={setSelected} />
        ) : (
          // VISTA ESCRITORIO: Tu tabla original
          <HistorialTablaDesktop filtered={filtered} setSelected={setSelected} />
        )}
      </Box>

      {/* Modal detalles */}
      <DetalleDialog selected={selected} setSelected={setSelected} />
    </Box>
  );
}
