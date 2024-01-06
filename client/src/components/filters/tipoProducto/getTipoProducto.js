import axios from "axios";

export const getTipoProductos = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/tipoProducto/`;
  const { data } = await axios.get(URL);
  return data;
};
