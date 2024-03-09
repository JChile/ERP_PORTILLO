import axios from "axios";

export const registrarPresupuesto = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/presupuestoProyecto/`;

  const { data } = await axios.post(URL, { ...body });
  return data;
};
