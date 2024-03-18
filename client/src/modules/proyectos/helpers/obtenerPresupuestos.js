import axios from "axios";
export const obtenerPresupuestosProyecto = async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/presupuestoProyecto/?proyecto=${id}`;
  const { data } = await axios.get(URL);
  return data;
};


export const obtenerPresupuestosProyectoMes = async (id, anio, mes ) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  // http://127.0.0.1:8000/api/presupuestoProyecto/?proyecto=1&anio=2024&mes=3
  const URL = `${DOMAIN}/api/presupuestoProyecto/?proyecto=${id}&anio=${anio}&mes=${mes}`;
  const { data } = await axios.get(URL);
  return data;
}