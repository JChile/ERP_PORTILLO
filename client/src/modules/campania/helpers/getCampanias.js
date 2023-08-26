import axios from "axios";

export const getCampanias = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/campania/`;

  const { data } = await axios.get(URL);
  return data;
};
