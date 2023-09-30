import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";

export const ImportFileLeads = () => {
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Supongamos que la hoja de cálculo que deseas procesar es la primera (índice 0)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Obtén los datos como arreglo de objetos, comenzando desde la fila 6 (skipHeaderRows: 5)
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Actualiza el estado con los datos del archivo
      setFileData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="mb-4">
      <h2 className="text-md font-semibold mb-2">Importa un archivo</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {/* Aquí puedes mostrar o utilizar los datos del archivo Excel */}
      <pre>{JSON.stringify(fileData, null, 2)}</pre>
    </div>
  );
};
