export const formatCelular = (celular) => {
  return celular.match(/^\+(\d{1,2})\s*(\d[\s\d]+)$/)[2].replace(/\s/g, "");
};
