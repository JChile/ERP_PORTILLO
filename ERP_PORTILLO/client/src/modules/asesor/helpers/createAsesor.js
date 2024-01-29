import axios from "axios";

export const createAsesor = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/asesor/`;

  const { data } = await axios.post(URL, { ...body });
  return data;
};
