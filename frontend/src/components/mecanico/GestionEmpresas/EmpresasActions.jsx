import { Box, Button, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { BORDER, MUTED, TEXT, ORANGE_BRAND } from "../../../constants/EmpresasMecanico";

export default function EmpresasActions({ query, setQuery, onCreate }) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 0.5, bgcolor: "#fff", border: `1px solid ${BORDER}`, borderRadius: 2, width: { xs: "100%", sm: 360 } }}>
        <SearchIcon sx={{ color: MUTED, fontSize: 20 }} />
        <InputBase
          placeholder="Buscar por razón social o CUIT..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ flex: 1, fontSize: 13, color: TEXT }}
        />
      </Box>
      <Button
        startIcon={<AddIcon />}
        onClick={onCreate}
        sx={{
          bgcolor: TEXT,
          color: BORDER,
          fontWeight: 700,
          textTransform: "none",
          borderRadius: 2,
          px: 2.5,
          py: 0.8,
          boxShadow: "none",
        }}
      >
        Agregar Nueva Empresa
      </Button>
    </Box>
  );
}