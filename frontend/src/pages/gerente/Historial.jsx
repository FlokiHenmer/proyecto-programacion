import React, { useMemo, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { BG, MOCK } from "../../constants/HistorialGerente";
import HistorialHeader from "../../components/gerente/Historial/HistorialHeader";
import HistorialFiltros from "../../components/gerente/Historial/HistorialFiltros";
import HistorialListaMobile from "../../components/gerente/Historial/HistorialListaMobile";
import HistorialTablaDesktop from "../../components/gerente/Historial/HistorialTablaDesktop";
import DetalleDialog from "../../components/gerente/Historial/DetalleDialog";
import VehiculoHistorialGerente from "../../components/gerente/Historial/DetalleVehiculo";

const toISO = (s) => {
  const [d, m, y] = s.split("/");
  return `${y}-${m}-${d}`;
};

export default function HistorialGerente() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const [operario, setOperario] = useState("Todos");
  const [vehiculo, setVehiculo] = useState("Todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [selected, setSelected] = useState(null);
  const [vehiculoSel, setVehiculoSel] = useState(null);

  const filtered = useMemo(() => {
    return MOCK.filter((r) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          r.vehiculo.toLowerCase().includes(q) ||
          r.patente.toLowerCase().includes(q) ||
          r.operario.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (tipo !== "Todos" && r.tipo !== tipo) return false;
      if (operario !== "Todos" && r.operario !== operario) return false;
      if (vehiculo !== "Todos" && `${r.vehiculo} (${r.patente})` !== vehiculo) return false;
      const iso = toISO(r.fecha);
      if (desde && iso < desde) return false;
      if (hasta && iso > hasta) return false;
      return true;
    });
  }, [search, tipo, operario, vehiculo, desde, hasta]);

  const registrosVehiculo = useMemo(
    () =>
      MOCK.filter((r) => r.patente === vehiculoSel?.patente).sort(
        (a, b) => (toISO(a.fecha) < toISO(b.fecha) ? 1 : -1)
      ),
    [vehiculoSel]
  );

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: BG, minHeight: "100vh" }}>
      <HistorialHeader />

      {vehiculoSel ? (
        <VehiculoHistorialGerente
          vehiculo={vehiculoSel}
          registros={registrosVehiculo}
          onVolver={() => setVehiculoSel(null)}
          setSelected={setSelected}
        />
      ) : (
        <>
          <HistorialFiltros
            search={search}
            setSearch={setSearch}
            tipo={tipo}
            setTipo={setTipo}
            operario={operario}
            setOperario={setOperario}
            vehiculo={vehiculo}
            setVehiculo={setVehiculo}
            desde={desde}
            setDesde={setDesde}
            hasta={hasta}
            setHasta={setHasta}
          />

          <Box sx={{ mt: 2 }}>
            {isMobile ? (
              <HistorialListaMobile
                filtered={filtered}
                setSelected={setSelected}
                onVerHistorial={setVehiculoSel}
              />
            ) : (
              <HistorialTablaDesktop
                filtered={filtered}
                setSelected={setSelected}
                onVerHistorial={setVehiculoSel}
              />
            )}
          </Box>
        </>
      )}

      <DetalleDialog selected={selected} setSelected={setSelected} />
    </Box>
  );
}
