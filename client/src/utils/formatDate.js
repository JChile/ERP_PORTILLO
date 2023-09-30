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
