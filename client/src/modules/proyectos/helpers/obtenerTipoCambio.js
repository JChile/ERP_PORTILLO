import axios from "axios";
export const obtenerTipoCambio = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/cambioDolar/`;
  const { data } = await axios.get(URL);
  return data;
};
