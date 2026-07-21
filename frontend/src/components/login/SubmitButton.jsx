import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { GREEN, GREEN_DARK } from "../../constants/Login";

export default function SubmitButton() {
  return (
    <Button
      type="submit"
      fullWidth
      endIcon={<ArrowForward />}
      sx={{
        py: 1.3,
        borderRadius: 2,
        fontWeight: 800,
        letterSpacing: 0.5,
        color: "#0d1b0d",
        bgcolor: GREEN,
        boxShadow: "0 6px 16px rgba(68,255,52,0.35)",
        "&:hover": {
          bgcolor: GREEN_DARK,
          boxShadow: "0 8px 22px rgba(46,224,30,0.45)",
          transform: "translateY(-1px)",
        },
        transition: "all .2s ease",
      }}
    >
      INGRESAR
    </Button>
  );
}
