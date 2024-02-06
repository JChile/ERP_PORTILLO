import axios from "axios";

export const createImagenProducto = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/imagenProducto/`;

  const { data } = await axios.post(URL, body);
  return data;
};
