import React, { useState } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { BoxOptionsImportLeads } from "../components";
import * as XLSX from "xlsx/xlsx.mjs";

export const AddLeadSheet = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState([]);

  const [showOptions, setShowOptions] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const onShowOptions = () => {
    setShowOptions(true);
  };

  const onCloseOptions = () => {
    setShowOptions(false);
  };

  const handleImportClick = (desde, hasta) => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        // Supongamos que la hoja de cálculo que deseas procesar es la primera (índice 0)
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Obtén los datos como arreglo de objetos, comenzando desde la fila 6 (skipHeaderRows: 5)
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Haz lo que necesites con los datos aquí, como actualizar el estado
        const jsonDataRange = jsonData.slice(
          parseInt(desde, 10) - 2,
          parseInt(hasta, 10) - 1
        );
        setFileData(jsonDataRange);
        return jsonDataRange;
      };
      reader.readAsBinaryString(selectedFile);
    }
    return null;
  };

  const onShowOptionsImport = () => {
    if (!selectedFile) {
      console.log("Tienes que subir un archivo");
    } else {
      onShowOptions();
    }
  };

  const onImportFileLeads = (options) => {
    handleImportClick(options.rangoDesde, options.rangoHasta);
    onCloseOptions();
  };

  return (
    <>
      <div className="relative border-2 rounded-md border-inherit p-5 h-min-screen">
        <h1 className="text-lg font-bold">Importacion automatica</h1>
        <hr className="my-4"></hr>
        <div className="h-min-screen flex flex-col justify-center items-center">
          <div className="mb-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="mb-4 mx-auto"
            />
          </div>

          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={onShowOptionsImport}
            >
              Importar
            </button>
          </div>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      </div>
      {showOptions && (
        <BoxOptionsImportLeads
          onClose={onCloseOptions}
          onImportFileLeads={onImportFileLeads}
        />
      )}
    </>
  );
};
