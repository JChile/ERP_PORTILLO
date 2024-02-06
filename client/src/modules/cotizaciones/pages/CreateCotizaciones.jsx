import React from "react";
import { FilterProyectos } from "../../../components";
import { Button } from "@mui/material";
import { useState } from "react";
import { CustomPdfViewer } from "../CustomPdfViewer";
import { useNavigate } from "react-router-dom";
import { BsBackspace } from "react-icons/bs";

function CreateCotizaciones() {
  const [showPdf, setShowPdf] = useState(false);
  const navigate = useNavigate();

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

        <Button
          variant="contained"
          color="inherit"
          sx={{ textTransform: "capitalize" }}
          endIcon={<BsBackspace />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>

        {showPdf ? (
          <CustomPdfViewer open={showPdf} onClose={() => setShowPdf(false)} />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default CreateCotizaciones;
