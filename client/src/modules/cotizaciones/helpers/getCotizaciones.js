import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getCampanias= async (query) => {
  const URL = `${DOMAIN}/api/campania/?${query}`;
  const { data } = await axios.get(URL);
  return data;
};