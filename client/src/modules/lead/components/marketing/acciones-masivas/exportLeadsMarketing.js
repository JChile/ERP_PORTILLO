import * as XLSX from 'xlsx/xlsx.mjs'
import { formatDate_ISO861_to_formatdate } from '../../../../../utils'

export const exportLeadsMarketing = (data) => {
  console.log(data)
  //   formateamos la data que queremos exportar
  const formatData = data.map((element, index) => {
    return {
      '#': index + 1,
      nombre: element['nombre'],
      apellido: element['apellido'],
      proyecto: element['proyecto']['nombre'],
      campania: element['campania']['nombre'],
      celular: element['celular'],
      celular2: element['celular2'],
      estadoLead: element['estadoLead']['descripcion'],
      asignado: element['asignado'] ? 'Si' : 'No',
      asesor: element['asignado']
        ? `${element['asesor']['first_name']} ${element['asesor']['last_name']}`
        : '',
      horaRecepcion: formatDate_ISO861_to_formatdate(element['horaRecepcion']),
      fecha_creacion: formatDate_ISO861_to_formatdate(
        element['fecha_creacion']
      ),
      fecha_asignacion: element['fecha_asignacion'] ? formatDate_ISO861_to_formatdate(
        element['fecha_asignacion']
      ) : ''
    }
  })

  // Crear un libro de trabajo y agregar una hoja
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(formatData)

  // Definir los nombres de los headers y establecer estilos
  const headerNames = [
    '#',
    'Nombre',
    'Apellido',
    'Proyecto',
    'Campaña',
    'Celular',
    'Celular 2',
    'Estado Lead',
    'Asignado',
    'Asesor',
    'Fecha recepción',
    'Fecha creación',
    'Fecha asignación'
  ]

  headerNames.forEach((header, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ c: colIndex, r: 0 })
    worksheet[cellRef] = {
      v: header,
      s: { font: { bold: true }, fill: { fgColor: { rgb: 'FFFF00' } } },
    }
  })

  // Establecer el ancho de las columnas del header
  worksheet['!cols'] = headerNames.map((element) => {
    if (element === '#') return { wch: 4 }
    if (element === 'Nombre') return { wch: 26 }
    if (element === 'Apellido') return { wch: 26 }
    if (element === 'Proyecto') return { wch: 17 }
    if (element === 'Campaña') return { wch: 30 }
    if (element === 'Celular') return { wch: 12 }
    if (element === 'Celular 2') return { wch: 12 }
    if (element === 'Estado Lead') return { wch: 13 }
    if (element === 'Asignado') return { wch: 8 }
    if (element === 'Asesor') return { wch: 35 }
    if (element === 'Fecha recepción') return { wch: 19 }
    if (element === 'Fecha creación') return { wch: 19 }
    if (element === 'Fecha asignación') return { wch: 19 }
  }) // Puedes ajustar el ancho según sea necesario

  // Agregar la hoja al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads exportados')

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  // Exportar el libro de trabajo a un archivo
  XLSX.writeFile(workbook, `exportacion_leads_marketing${timestamp}.xlsx`)
}
