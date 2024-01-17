export const formatDate_ISO861_to_formatdate = (fecha_hora_iso) => {
  var fecha_hora = new Date(fecha_hora_iso);
  var options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return fecha_hora.toLocaleString("es-ES", options);
};

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
