import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getDesasignadosObjecion = async (projectoId, query) => {
  const URL = `${DOMAIN}/api/reporteProporcionDesasignadosByObjecion/${projectoId}${query}`;
  const { data } = await axios.get(URL);
  return data;
};
export const getDesasignadosAsesor = async (projectId, query) => {
  const URL = `${DOMAIN}/api/reporteProporcionAsignadosDesasignadosByAsesor/${projectId}${query}`;
  const { data } = await axios.get(URL);
  return data;
};

export const getDesasignadosEstadoLead = async (projectId, query) => {
  const URL = `${DOMAIN}/api/reporteProporcionDesasignadosByEstadoLead/${projectId}${query}`;
  const { data } = await axios.get(URL);
  return data;
};

/*
http://localhost:8000/api/reporteProporcionAsignadosDesasignadosByAsesor/23
http://localhost:8000/api/reporteProporcionDesasignadosByEstadoLead/23
http://localhost:8000/api/reporteProporcionDesasignadosByObjecion/23
*/
