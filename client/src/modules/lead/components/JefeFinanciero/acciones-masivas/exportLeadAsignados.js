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
      asesor: `${element["asesor"]["first_name"]} ${element["asesor"]["last_name"]}`,
      fechaAsignacion: formatDate_ISO861_to_formatdate(
        element["fecha_asignacion"]
      ),
      fechaCreacion: formatDate_ISO861_to_formatdate(element["fecha_creacion"]),
    };
  });

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
    "Asesor actual",
    "Fecha asignación",
    "Fecha creación",
  ];

  headerNames.forEach((header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: 0 });
    worksheet[cellRef] = {
      v: header,
      s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } },
    };
  });

  // Establecer el ancho de las columnas del header
  worksheet["!cols"] = headerNames.map((element) => {
    if (element === "#") return { wch: 4 };
    if (element === "Nombre") return { wch: 26 };
    if (element === "Apellido") return { wch: 26 };
    if (element === "Proyecto") return { wch: 17 };
    if (element === "Campaña") return { wch: 30 };
    if (element === "Celular") return { wch: 12 };
    if (element === "Celular 2") return { wch: 12 };
    if (element === "Estado Lead") return { wch: 13 };
    if (element === "Objeción") return { wch: 30 };
    if (element === "Asesor actual") return { wch: 32 };
    if (element === "Fecha asignación") return { wch: 19 };
    if (element === "Fecha creación") return { wch: 19 };
  });

  // Agregar la hoja al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads no asignados");

  // Exportar el libro de trabajo a un archivo
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  XLSX.writeFile(workbook, `exportacion_leads_asignados${timestamp}.xlsx`);
};
