import axios from "axios";

export const getProyectos = async () => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto/`;
  const { data } = await axios.get(URL);
  return data;
};
