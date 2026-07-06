export const COLORS = {
  GREEN: "#44FF34",
  BORDER: "#e5e7eb",
  TEXT: "#0f172a",
  MUTED: "#64748b",
  BG: "#f8fafc",
  RED: "#dc2626",
  YELLOW: "#fef3c7",
  YELLOW_TEXT: "#92400e",
  RED_BG: "#fee2e2"
};

export const cardSx = { 
  borderRadius: 3, 
  border: `1px solid ${COLORS.BORDER}`, 
  boxShadow: "none", 
  bgcolor: "#fff" 
};

export const EXTRA_COLORS = {
  BLUE: "#0ea5e9",
  RED: "#dc2626",
  YELLOW: "#f59e0b",
  GRAY: "#94a3b8"
};

export const buttonStyles = {
  greenBtn: { bgcolor: "#44FF34", color: "#0f172a", fontWeight: 800, textTransform: "none", borderRadius: 2, px: 2, "&:hover": { bgcolor: "#36e028" } },
  blueBtn: { bgcolor: "#4e9cef", color: "#fff", fontWeight: 800, textTransform: "none", borderRadius: 2, px: 2, "&:hover": { bgcolor: "#3088e7" } }
};