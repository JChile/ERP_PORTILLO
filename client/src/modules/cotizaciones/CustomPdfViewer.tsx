import { Backdrop, BackdropRoot, Button, Dialog } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { PdfDocument } from "./PdfDocument";
import createPdfFile from "./createPdfFile";

export const CustomPdfViewer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => {};
}) => {
  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <div className="absolute mx-auto my-3 max-w-xl inset-0 flex flex-col items-center justify-center bg-white">
        <Button
          onClick={onClose}
          variant="contained"
          color="error"
          sx={{
            borderRadius: "0px",
            width: "100%",
            textTransform: "capitalize",
          }}
        >
          Cerrar vista
        </Button>
        <div style={{ width: "100%", height: "80vh", flex: "1" }}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <PdfDocument />
          </PDFViewer>
        </div>
      </div>
    </Backdrop>
  );
};

/*
  
*/
// className="absolute mx-auto my-3 max-w-xl inset-0 flex flex-col items-center justify-center z-30 bg-white"
