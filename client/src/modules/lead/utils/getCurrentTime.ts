interface CurrentTime {
  startDate: string
  endDate: string
}

/**
 * Funcion que retorna el tiempo actual, startDate: TiempoActual
 * endDate: Tiempo anterior en 60 dias.
 * @returns 
 */
function getCurrentTime () : CurrentTime {
  const currentDate = new Date()
  const startDate = new Date(currentDate)
  startDate.setDate(startDate.getDate()-60)

  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = formatDate(currentDate)

  return {
    startDate: formattedStartDate,
    endDate: formattedEndDate
  }
}

function formatDate(date: Date) : string {
  const year = date.getFullYear()
  const month = String(date.getMonth()+1).padStart(2,'0')
  const day = String(date.getDate()).padStart(2,'0')
  return  `${year}-${month}-${day}`
}

export { getCurrentTime }