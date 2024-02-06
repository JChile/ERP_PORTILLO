import * as XLSX from "xlsx/xlsx.mjs";
import { formatDate_ISO861_to_formatdate } from "../../../../../utils";

export const exportLeadsAsignados = (data) => {
  //   formateamos la data que queremos exportar

  console.log(data);
  
  const formatData = data.map((element, index) => {
    return {
      "#": index + 1,
      nombre: element["nombre"],
      apellido: element["apellido"],
      proyecto: element["campania"]["proyecto"]["nombre"],
      campania: element["campania"]["nombre"],
      celular: element["celular"],
      celular2: element["celular2"],
      estadoLead: element["estadoLead"],
      objecion: element["objecion"]["nombre"],
      fechaAsignacion: formatDate_ISO861_to_formatdate(element["fecha_asignacion"])  ,
      fechaActualizacion: formatDate_ISO861_to_formatdate(element["fecha_actualizacion"]),
    };
  });

  console.log(formatData);

  // Crear un libro de trabajo y agregar una hoja
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(formatData);

  // Definir los nombres de los headers y establecer estilos
  const headerNames = [
    "#",
    "Nombre",
    "Apellido",
    "Proyecto",
    "Campaña",
    "Celular",
    "Celular 2",
    "Estado Lead",
    "Objeción",
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads no asignados");

  // Exportar el libro de trabajo a un archivo
  XLSX.writeFile(workbook, "output.xlsx");
};
