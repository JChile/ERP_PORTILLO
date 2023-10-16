import axios from "axios";

export const getModulos = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/modulo_permission/`;
  const { data } = await axios.get(URL);
  return data;
};
