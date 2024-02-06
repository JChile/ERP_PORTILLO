import axios from "axios";

export const deleteImagenProducto = async (idItem) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/imagenProducto/${idItem}`;
  const { data } = await axios.delete(URL);
  return data;
};
