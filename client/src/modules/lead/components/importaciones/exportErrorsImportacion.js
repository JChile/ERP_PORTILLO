import * as XLSX from "xlsx/xlsx.mjs";

export const exportErrorsImportacion = (data) => {
  //   formateamos la data que queremos exportar
  const formatData = data.map((element) => {
    return {
      horaRecepcion: element["data"]["horaRecepcion"]
        ? element["data"]["horaRecepcion"]
        : "",
      nombre: element["data"]["nombre"] ? element["data"]["nombre"] : "",
      apellido: element["data"]["apellido"] ? element["data"]["apellido"] : "",
      celular: element["data"]["celular"] ? element["data"]["celular"] : "",
      celular2: element["data"]["celular2"] ? element["data"]["celular2"] : "",
      campania: element["data"]["campania"] ? element["data"]["campania"] : "",
      comentario: element["data"]["comentario"]
        ? element["data"]["comentario"]
        : "",
      asesor: element["data"]["asesor"] ? element["data"]["asesor"] : "",
      detalle: element["errores"].join("\n"),
    };
  });

  console.log(formatData);

  // Crear un libro de trabajo y agregar una hoja
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(formatData);

  // Definir los nombres de los headers y establecer estilos
  const headerNames = [
    "horaRecepcion",
    "nombre",
    "apellido",
    "celular",
    "celular2",
    "campania",
    "comentario",
    "asesor",
    "detalle",
  ];

  headerNames.forEach((header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: 0 });
    worksheet[cellRef] = {
      v: header,
      s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } },
    };
  });

  // Establecer el ancho de las columnas del header
  worksheet["!cols"] = headerNames.map(() => ({ wch: 15 })); // Puedes ajustar el ancho según sea necesario

  // Agregar la hoja al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, "errores-importacion");

  // Exportar el libro de trabajo a un archivo
  XLSX.writeFile(workbook, "importacion-leads-errores.xlsx");
};
