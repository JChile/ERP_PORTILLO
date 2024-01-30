import axios from "axios";

export const createImagenProyecto = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/imagenProyecto/`;

  const { data } = await axios.post(URL, body);
  return data;
};
