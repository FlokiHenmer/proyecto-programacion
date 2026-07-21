import React from "react";
import { Box, Typography, Stack, Tooltip } from "@mui/material";
import { BORDER, GREEN, TEXT, MUTED, tipoMeta, sameDay, toISO, today } from "../../../constants/CalendarioGerente";

export default function MonthView({ grid, eventsByDay, selectedDay, setSelectedDay, openEdit, isMobile }) {
  return (
    <>
      {grid.map((cell, i) => {
        const evs = eventsByDay.get(toISO(cell.date)) || [];
        const isToday = sameDay(cell.date, today);
        const isSelected = sameDay(cell.date, selectedDay);
        return (
          <Box
            key={i}
            onClick={() => setSelectedDay(cell.date)}
            sx={{
              cursor: "pointer",
              height: 120,
              p: 0.75,
              borderRadius: 2,
              border: `1px solid ${isSelected ? GREEN : BORDER}`,
              bgcolor: cell.out ? "#fafafa" : "#fff",
              opacity: cell.out ? 0.5 : 1,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              overflow: "hidden",
              transition: "all .15s",
              "&:hover": { borderColor: GREEN, bgcolor: "#f8fafc" },
            }}
          >
            <Box sx={{ alignSelf: "flex-end", fontSize: 12, fontWeight: 700, color: isToday ? "#000" : TEXT, bgcolor: isToday ? GREEN : "transparent", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cell.date.getDate()}
            </Box>
            <Stack spacing={0.3} sx={{ overflow: "hidden" }}>
              {evs.slice(0, isMobile ? 1 : 2).map((e) => (
                <Tooltip key={e.id} title={`${e.hora} · ${e.titulo}`}>
                  <Box onClick={(ev) => { ev.stopPropagation(); openEdit(e); }} sx={{ fontSize: 10.5, px: 0.6, py: 0.2, borderRadius: 0.8, bgcolor: tipoMeta(e.tipo).bg, color: tipoMeta(e.tipo).color, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {e.titulo}
                  </Box>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        );
      })}
    </>
  );
}