import axios from "axios";

export const getEstadoAsesor = async () => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/estado_asesor/`;

  const { data } = await axios.get(URL);
  return data;
};
