import axios from "axios";

export const createProducto = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/producto/`;

  const { data } = await axios.post(URL, { ...body });
  return data;
};
