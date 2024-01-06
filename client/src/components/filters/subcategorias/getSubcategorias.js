import axios from "axios";

export const getSubcategorias = async () => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/categoria/`;

  const { data } = await axios.get(URL);
  return data;
};
