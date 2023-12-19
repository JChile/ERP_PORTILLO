import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ListLeadCotizaciones = () => {
  return (
    <div>
      <Button variant="contained" sx={{ textTransform: "capitalize" }}>
        <Link to={"create/"}>Generar cotización</Link>
      </Button>
    </div>
  );
};

export default ListLeadCotizaciones;
