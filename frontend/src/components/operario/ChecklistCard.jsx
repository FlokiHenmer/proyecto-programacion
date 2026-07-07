import { Card, CardContent, Stack, Box, Typography, Button, TextField } from "@mui/material";
import { cardSx, colorHex, TEXT, MUTED, BORDER } from "../../constants/Operario";

export default function ChecklistCard({ section, data, onChange }) {
  const currentColor = data?.color;
  const iconColor = currentColor ? colorHex(currentColor) : MUTED;

  return (
    <Box sx={{ width: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.3% - 16px)" }, maxWidth: 400 }}>
      <Card sx={{ ...cardSx, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ color: iconColor, bgcolor: `${iconColor}15`, p: 1, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {section.icon}
            </Box>
            <Typography sx={{ fontWeight: 700, color: TEXT, alignSelf: "center", display: "flex", alignItems: "center" }}>
              {section.titulo}
            </Typography>
          </Stack>
          {section.subtitulo && <Typography sx={{ fontSize: 12, color: MUTED, mb: 1.5 }}>{section.subtitulo}</Typography>}
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            {section.opciones.map((op) => {
              const isSelected = data?.opcion === op.label;
              const color = colorHex(op.color);
              return (
                <Button key={op.label} onClick={() => onChange({ opcion: op.label, color: op.color })}
                  sx={{ border: `1px solid ${isSelected ? color : BORDER}`, bgcolor: isSelected ? `${color}20` : "transparent", color: isSelected ? color : TEXT, fontWeight: 600, textTransform: "none", fontSize: 12, px: 2, "&:hover": { bgcolor: `${color}10`, border: `1px solid ${color}` } }}>
                  {op.label}
                </Button>
              );
            })}
          </Stack>
          <TextField fullWidth size="small" multiline rows={2} placeholder="Observaciones..." value={data?.obs || ""}
            onChange={(e) => onChange({ ...data, obs: e.target.value })} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 }, bgcolor: "#f9fafb" }} />
        </CardContent>
      </Card>
    </Box>
  );
}