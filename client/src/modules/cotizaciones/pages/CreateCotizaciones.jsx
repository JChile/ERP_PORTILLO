import React from "react";
import { FilterProyectos } from "../../../components";
import { Button } from "@mui/material";
import { useState } from "react";
import { CustomPdfViewer } from "../CustomPdfViewer";
import { Link } from "react-router-dom";

function CreateCotizaciones() {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <React.Fragment>
      <h1>Crear cotizacion</h1>
      <div className="flex justify-between">
        <Button
          sx={{ textTransform: "capitalize" }}
          variant="contained"
          onClick={() => setShowPdf(true)}
        >
          Generar PDF
        </Button>
        <Button variant="contained" sx={{ textTransform: "capitalize" }}>
          <Link to={"plantilla/"}>Crear plantilla</Link>
        </Button>
        {showPdf ? (
          <CustomPdfViewer open={showPdf} onClose={() => setShowPdf(false)} />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default CreateCotizaciones;
