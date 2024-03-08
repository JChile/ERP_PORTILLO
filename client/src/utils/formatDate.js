import dayjs from "dayjs";

export const formatDate_ISO861_to_date = (dateString) => {
  // Parsear la cadena a un objeto de fecha con dayjs
  const dateTimeObject = dayjs(dateString);

  // Obtener solo la parte de la fecha (YYYY-MM-DD)
  const formattedDate = dateTimeObject.format("YYYY-MM-DD");
  return formattedDate;
};

// FUNCION PARA PARSEAR LA FECHA DE FORMATO ISO A UN FORMATO MAS VISUAL
export const formatDate_ISO861_to_formatdate = (fecha_hora_iso) => {
  // Crear un objeto Date a partir de la cadena de fecha
  let fecha = new Date(fecha_hora_iso);

  // Obtener los componentes de la fecha
  let year = fecha.getFullYear();
  let month = String(fecha.getMonth() + 1).padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
  let day = String(fecha.getDate()).padStart(2, "0");
  let hours = String(fecha.getHours()).padStart(2, "0");
  let minutes = String(fecha.getMinutes()).padStart(2, "0");
  let seconds = String(fecha.getSeconds()).padStart(2, "0");

  // Formatear la fecha como "YYYY/MM/DD HH:mm:ss"
  let fechaFormateada = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return fechaFormateada;
};

// FUNCION PARA PARSEAR LA FECHA DE FORMATO ISO DATE A UN FORMATO MAS VISUAL
export const formatDate_ISO861_to_formatOnlyDate = (fecha_hora_iso) => {
  // Crear un objeto Date a partir de la cadena de fecha
  let fecha = new Date(fecha_hora_iso);

  // Obtener los componentes de la fecha
  let year = fecha.getFullYear();
  let month = String(fecha.getMonth() + 1).padStart(2, "0"); // Añadir ceros a la izquierda si es necesario
  let day = String(fecha.getDate()).padStart(2, "0");

  // Formatear la fecha como "YYYY/MM/DD HH:mm:ss"
  let fechaFormateada = `${day}/${month}/${year}`;
  return fechaFormateada;
}

// FUNCION PARA OBTENER LA HORA ACTUAL EN FORMATO FECHA POSTGRESS
export const obtenerHoraActualFormatPostgress = () => {
  const ahora = new Date();

  // Obtener componentes de fecha y hora
  const año = ahora.getFullYear();
  const mes = agregarCero(ahora.getMonth() + 1); // Meses en JavaScript van de 0 a 11
  const dia = agregarCero(ahora.getDate());
  const hora = agregarCero(ahora.getHours());
  const minutos = agregarCero(ahora.getMinutes());
  const segundos = agregarCero(ahora.getSeconds());

  // Formatear como datetime de PostgreSQL
  const datetimePostgreSQL = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

  return datetimePostgreSQL;
};

function agregarCero(numero) {
  return numero < 10 ? `0${numero}` : numero;
}
