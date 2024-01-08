import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getProductosActivos= async () => {
  const URL = `${DOMAIN}/api/productoActivo/`;
  const { data } = await axios.get(URL);
  return data;
};
export const getProductosInactivos= async () => {
  const URL = `${DOMAIN}/api/productoInactivo/`;
  const { data } = await axios.get(URL);
  return data;
};