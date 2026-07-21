import { Card, CardContent, Box, Stack, Typography, Divider, TextField } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { cardSx, BG, BORDER, TEXT, MUTED, colorHex } from "../../constants/Operario";

const textoEstado = {
  green: "Apto para trabajar",
  yellow: "Operar con precaución",
  red: "No apto para conducir",
};

export default function Estado({ estadoGeneral, informadoA, setInformadoA }) {
  return (
    <Card
      sx={{
        ...cardSx,
        mt: 3,
        borderLeft: estadoGeneral
          ? `5px solid ${colorHex(estadoGeneral)}`
          : `4px solid ${BORDER}`,
        bgcolor: estadoGeneral ? colorHex(estadoGeneral) : "#fff",
        color: estadoGeneral ? "#fff" : TEXT,
        boxShadow: estadoGeneral
          ? `0 8px 30px ${colorHex(estadoGeneral)}40`
          : "0 2px 10px rgba(15, 23, 42, 0.04)",
        transition: "all .35s ease",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: estadoGeneral ? "rgba(255,255,255,0.18)" : BG,
              border: estadoGeneral
                ? "1px solid rgba(255,255,255,0.3)"
                : `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HelpIcon sx={{ color: estadoGeneral ? "#fff" : TEXT }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
              {estadoGeneral ? textoEstado[estadoGeneral] : "Completá el checklist"}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                opacity: estadoGeneral ? 0.95 : 1,
                color: estadoGeneral ? "#fff" : MUTED,
                mt: 0.25,
              }}
            >
              {estadoGeneral
                ? "Estado general calculado en base a las selecciones."
                : "Seleccioná una opción en cada sección para conocer el estado general."}
            </Typography>
          </Box>
        </Stack>
        {(estadoGeneral === "yellow" || estadoGeneral === "red") && (
          <>
            <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.4)" }} />
            <TextField
              fullWidth
              required
              label="¿A quién se informó la falla?"
              placeholder="Nombre de la persona informada"
              value={informadoA}
              onChange={(e) => setInformadoA(e.target.value)}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}