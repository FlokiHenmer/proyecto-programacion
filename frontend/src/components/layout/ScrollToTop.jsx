import React from "react";
import { useScrollTrigger, Box, Fab, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop() {
  // useScrollTrigger detecta automáticamente cuando el usuario hace scroll hacia abajo
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 150, // Se activa cuando bajas 150px
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que la subida sea suave y animada
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 25, right: 25, zIndex: 1000 }}
      >
        <Fab
          size="medium"
          aria-label="scroll back to top"
          sx={{
            bgcolor: "#fde68a", 
            color: "#92400e",
            borderRadius: 4,
            "&:hover": {
              bgcolor: "#f8db57",
            },
            boxShadow: 3,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
}