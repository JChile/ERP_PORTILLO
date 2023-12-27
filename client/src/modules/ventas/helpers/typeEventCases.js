import axios from "axios";

const DOMAIN = process.env.VITE_BACKEND_URL;

const getTipoEventos = async () => {
  const URL = `${DOMAIN}/api/tipoEvento/`;
  const { data } = await axios.get(URL);
  return data;
};

const createTipoEvento = async (body) => {
  const URL = `${DOMAIN}/api/tipoEvento/`;
  const { data } = await axios.post(URL, { ...body });
  return data;
};

const getTipoEvento = async (id) => {
  const URL = `${DOMAIN}/api/tipoEvento/${id}`;
  const { data } = await axios.get(URL);
  return data;
};

const deleteTipoEvento = async (id, event) => {
  const URL = `${DOMAIN}/api/tipoEvento/${id}`;
  const { data } = await axios.put(URL, { ...event });
  return data;
};

const updateTipoEvento = async (id, event) => {
  const URL = `${DOMAIN}/api/tipoEvento/${id}`;
  const { data } = await axios.put(URL, { ...event });
  return data;
};

export {
  getTipoEvento,
  getTipoEventos,
  createTipoEvento,
  deleteTipoEvento,
  updateTipoEvento,
};
