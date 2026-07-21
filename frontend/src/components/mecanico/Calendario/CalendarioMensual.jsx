import React from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BORDER, MUTED, TEXT, cardSx, MONTH_NAMES, statusColors } from "../../../constants/CalendarioMecanico";

export default function CalendarioMensual({ currentMonth, handlePrevMonth, handleNextMonth, daysGrid, currentEvents }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: TEXT }}>
        Vista Mensual
      </Typography>

      <Card sx={cardSx}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <IconButton onClick={handlePrevMonth}><ChevronLeftIcon /></IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{MONTH_NAMES[currentMonth]}</Typography>
            <IconButton onClick={handleNextMonth}><ChevronRightIcon /></IconButton>
          </Box>

          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minWidth: 500 }}>
              {["L", "M", "M", "J", "V", "S", "D"].map(d => (
                <Typography key={d} sx={{ textAlign: "center", fontWeight: 700, fontSize: 12, color: MUTED }}>{d}</Typography>
              ))}
              {daysGrid.map((d, i) => (
                <Box key={i} sx={{ minHeight: 80, border: `1px solid ${BORDER}`, p: 0.5 }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 600 }}>{d}</Typography>
                  {currentEvents[d] && (
                    <Box sx={{ bgcolor: statusColors[currentEvents[d].status].bg, color: statusColors[currentEvents[d].status].fg, fontSize: 9, p: 0.5, borderRadius: 1, mt: 0.5, fontWeight: 700 }}>
                      {currentEvents[d].title}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          
        </CardContent>
      </Card>
    </Box>
  );
}