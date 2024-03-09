import axios from "axios";
export const obtenerPresupuestoProyecto = async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/presupuestoProyecto/${id}`;
  const { data } = await axios.get(URL);
  return data;
};
