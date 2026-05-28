import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

function App() {

  return (
    <Card sx={{ maxWidth: 300, margin: "auto", marginTop: 5 }}>
      <CardContent>
        <Typography variant="h5">Mi primera Card</Typography>
        <Typography variant="body2">Este es un texto dentro de la card.</Typography>
        <Button variant="contained" color="primary">Acción</Button>
      </CardContent>
    </Card>

  );
}

export default App;
