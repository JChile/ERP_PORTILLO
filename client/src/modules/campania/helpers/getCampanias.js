import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getCampaniasActivas= async () => {
  const URL = `${DOMAIN}/api/campania_activa/`;
  const { data } = await axios.get(URL);
  return data;
};

export const getCampaniasInactivas = async () => {
  const URL = `${DOMAIN}/api/campania_inactiva/`;
  const { data } = await axios.get(URL);
  return data;
};
