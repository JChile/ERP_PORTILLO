import axios from "axios";

export const getProyectosCampanias = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto_campania/`;
  const { data } = await axios.get(URL);
  return data;
};
