import axios from "axios";

export const getAsesorById = async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/asesor/${id}`;

  const { data } = await axios.get(URL);
  return data;
};
