export const formatReclamoDescripcion = (descripcion) => {
  var palabras = descripcion.split(" ");
  var primeras10Palabras = palabras.slice(0, 10).join(" ");
  var textoTruncado = primeras10Palabras + "...";
  return textoTruncado;
};
