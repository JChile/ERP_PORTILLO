import axios from "axios";
export const obtenerPresupuestosProyecto = async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/presupuestoProyecto/?proyecto=${id}`;
  const { data } = await axios.get(URL);
  return data;
};
