import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { BORDER, GREEN, TEXT, tipoMeta, sameDay, toISO, today } from "../../../constants/CalendarioGerente";

export default function WeekView({ weekDays, eventsByDay, selectedDay, setSelectedDay, openEdit }) {
  return (
    <>
      {weekDays.map((d, i) => {
        const evs = eventsByDay.get(toISO(d)) || [];
        const isToday = sameDay(d, today);
        const isSelected = sameDay(d, selectedDay);
        return (
          <Box key={i} onClick={() => setSelectedDay(d)} sx={{ cursor: "pointer", minHeight: 220, p: 1, borderRadius: 2, border: `1px solid ${isSelected ? GREEN : BORDER}`, bgcolor: "#fff", display: "flex", flexDirection: "column", gap: 0.5 }}>
            {/* Aquí eliminamos el Typography del nombre del día */}
            <Box sx={{ alignSelf: "flex-end", fontSize: 12, fontWeight: 800, color: isToday ? "#000" : TEXT, bgcolor: isToday ? GREEN : "transparent", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {d.getDate()}
            </Box>
            <Divider />
            <Stack spacing={0.5} sx={{ overflow: "auto" }}>
              {evs.map((e) => (
                <Box key={e.id} onClick={(ev) => { ev.stopPropagation(); openEdit(e); }} sx={{ p: 0.6, borderRadius: 1, bgcolor: tipoMeta(e.tipo).bg, color: tipoMeta(e.tipo).color, borderLeft: `3px solid ${tipoMeta(e.tipo).color}`, cursor: "pointer" }}>
                  <Typography sx={{ fontSize: 11, fontWeight: 800 }}>{e.hora}</Typography>
                  <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{e.titulo}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        );
      })}
    </>
  );
}