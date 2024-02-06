import axios from "axios";
const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getProyectosCampania = async (query) => {
  const URL = `${DOMAIN}/api/reporteProyectoCampania/?${query}`;
  const { data } = await axios.get(URL);
  return data;
};

export const getProyectoCampania = async (query) => {
  const URL = `${DOMAIN}/api/reporteProyectoCampania/${query}`;
  const { data } = await axios.get(URL);
  return data;
};
