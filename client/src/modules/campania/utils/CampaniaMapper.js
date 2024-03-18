import { getReporteCampania } from "../helpers";

export const dataMapper = async ({ query, token }) => {
  const data = await getReporteCampania(query, token);

  console.log(data);

  const campañasUnicas = Array.from(
    new Set(
      Object.values(data).flatMap((semana) =>
        semana.campanias.map((campaña) => campaña.nombre)
      )
    )
  );

  // Crear el encabezado de la tabla
  const header = ["Campaña"];
  const headerWeeks = [];
  for (let semana in data) {
    header.push(`Leads ${semana}`);
    header.push(`Inversión ${semana} $`);

    // costo / Lead, encabezado.
    headerWeeks.push(`SEM${semana}`);
  }
  header.push("Total Leads");
  header.push("Total Inversión $");

  const solesLeadList = [];
  const dolaresLeadList = [];

  for (let semana in data) {
    let costoTotalLeadSoles = 0;
    let costoTotalLeadDolares = 0;
    let numeroLeads = 0;

    for (let campania of data[semana].campanias) {
      numeroLeads += campania.numeroLeads;
      costoTotalLeadSoles += campania.inversionSoles;
      costoTotalLeadDolares += campania.inversionDolares;
    }
    let promedioSoles = costoTotalLeadSoles / numeroLeads;
    let promedioDolares = costoTotalLeadDolares / numeroLeads;

    if (isFinite(promedioDolares)) {
      dolaresLeadList.push(parseFloat(promedioDolares.toFixed(2)));
    }
    else if(isNaN(promedioDolares)) {
      dolaresLeadList.push(0);
    }
    else {
      dolaresLeadList.push(promedioDolares)
    }

    if (isFinite(promedioSoles)) {
      solesLeadList.push(parseFloat(promedioSoles.toFixed(2)));
    }
    else if (isNaN(promedioSoles)){ 
      solesLeadList.push(0);
    }
    else {
      solesLeadList.push(promedioSoles)
    }

  }

  // Crear tabla de costos por lead por semana por asesor
  const costoLeadRows = [
    ["COSTO/LEAD $", ...dolaresLeadList, ],
    ["COSTO/LEAD S/", ...solesLeadList],
  ];

  // Crear filas de datos para la tabla
  const filas = campañasUnicas.map((campaña) => {
    const fila = [campaña];
    let totalLeadsCampania = 0;
    let totalInversionCampania = 0;
    for (let semana in data) {
      const datosSemana =
        data[semana].campanias.find((c) => c.nombre === campaña) || {};
      const leads = datosSemana.numeroLeads || 0;
      const inversionDolares = datosSemana.inversionDolares || 0;
      fila.push(leads);
      fila.push(parseFloat(inversionDolares.toFixed(2)));
      totalLeadsCampania += leads;
      totalInversionCampania += inversionDolares;
    }
    // Agregar celdas de totales al final de la fila
    fila.push(totalLeadsCampania);
    fila.push(parseFloat(totalInversionCampania.toFixed(2)));
    return fila;
  });

  // Agregar la fila de totales por filas
  const totalesFilas = ["Total Campaña"];
  for (let i = 1; i < filas[0].length; i += 2) {
    const totalLeads = filas.reduce((acc, fila) => acc + (fila[i] || 0), 0);
    const totalInversion = filas.reduce(
      (acc, fila) => acc + (fila[i + 1] || 0),
      0
    );
    totalesFilas.push(totalLeads);
    totalesFilas.push(parseFloat(totalInversion.toFixed(2)));
  }

  // Crear tabla de asignación de leads por semana por asesor
  const asesoresUnicos = Array.from(
    new Set(
      Object.values(data).flatMap((semana) =>
        semana.asesores.map((asesor) => asesor.username)
      )
    )
  );

  const leadAsignadosRows = asesoresUnicos.map((asesor) => {
    const row = [asesor];
    let totalLeadsAsesor = 0;
    for (let semana in data) {
      const datosSemana =
        data[semana].asesores.find((a) => a.username === asesor) || {};
      const leads = datosSemana.numeroLeads || 0;
      row.push(leads);
      totalLeadsAsesor += leads;
    }
    // Agregar celda de total al final de la fila
    row.push(totalLeadsAsesor);
    return row;
  });

  //console.log(leadAsignadosRows);
  // Agregar la fila de totales por columnas para asignación de leads
  const totalesLeadsColumnas = ["Total Leads"];
  if (leadAsignadosRows[0]) {
    for (let i = 1; i < leadAsignadosRows[0].length; i++) {
      const totalLeads = leadAsignadosRows.reduce(
        (acc, row) => acc + (row[i] || 0),
        0
      );
      totalesLeadsColumnas.push(totalLeads);
    }
  }

  // Crear tabla de costos por lead por semana por asesor
  const asesoresUnicosCostoLead = Array.from(
    new Set(
      Object.values(data).flatMap((semana) =>
        semana.asesores.map((asesor) => asesor.username)
      )
    )
  );

  const costoLeadAsesoresRows = asesoresUnicosCostoLead.map((asesor) => {
    const row = [];
    let sumDolares = 0;
    let sumSoles = 0;
    for (let semana in data) {
      const datosSemana =
        data[semana].asesores.find((a) => a.username === asesor) || {};

      let inversionAsesorDolares = datosSemana.numeroLeads * dolaresLeadList[semana - 1]
      let inversionAsesorSoles = datosSemana.numeroLeads * solesLeadList[semana - 1]

      inversionAsesorDolares= checkTypeNumber(inversionAsesorDolares)

      inversionAsesorSoles= checkTypeNumber(inversionAsesorSoles)

      sumDolares += inversionAsesorDolares;
      sumSoles += inversionAsesorSoles;
      row.push(inversionAsesorDolares);
    }
    row.unshift(asesor);
    row.push(parseFloat(sumDolares.toFixed(2)));
    row.push(parseFloat(sumSoles.toFixed(2)));
    return row;
  });

  // Agregar la fila de totales por columnas para costos por lead
  const totalesCostoLeadColumnas = ["Total"];
  if (costoLeadAsesoresRows[0]) {
    for (let i = 1; i < costoLeadAsesoresRows[0].length; i++) {
      const totalCostoLead = costoLeadAsesoresRows.reduce(
        (acc, row) => acc + (row[i] || 0),
        0
      );
      totalesCostoLeadColumnas.push(checkTypeNumber(totalCostoLead));
    }
  }

  return {
    header,
    rows: [...filas, totalesFilas],

    leadAsignadosHeader: ["Asesor", ...addSymbol('#',headerWeeks), "Total"],
    leadAsignadosRows: [...leadAsignadosRows, totalesLeadsColumnas],

    costoLeadAsesorHeader: ["Asesor", ...addSymbol('$',headerWeeks), "Total $", "Total S/"],
    costoLeadAsesorRows: [...costoLeadAsesoresRows, totalesCostoLeadColumnas],

    costoLeadHeader: ["Cost/Lead", ...headerWeeks,],
    costoLeadRows: costoLeadRows,
  };
};


/**
 * 
 * @param {String} symbol 
 * @param {String[]} weeksArray 
 */
function addSymbol(symbol, weeksArray) {
  return weeksArray.map(day => `${day} ${symbol}`)
}

function checkTypeNumber(numero) {
  if (isFinite(numero)) {
    return parseFloat(numero.toFixed(2));
  }
  else if(isNaN(numero)) {
    return 0;
  }
  else {
    return numero
  }
}
