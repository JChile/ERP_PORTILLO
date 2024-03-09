import axios from "axios";

export const updatePresupuesto = async (id, body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/presupuestoProyecto/${id}`;
  const { data } = await axios.put(URL, { ...body });
  return data;
};
