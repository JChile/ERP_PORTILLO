import axios from "axios";

export const getLeads = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/`;

  const { data } = await axios.get(URL);

  return data;
};

export const getLeadsActivos = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadActivo/`;

  const { data } = await axios.get(URL);

  return data;
};

export const getLeadsNoAsignados = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadNoAsignado/`;

  const { data } = await axios.get(URL);

  return data;
};
