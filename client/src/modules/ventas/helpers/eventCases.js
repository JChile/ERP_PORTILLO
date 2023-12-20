import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

const getEvents = async (user_id) => {
  const URL = `${DOMAIN}/api/evento/?usuarioId=${user_id}`;
  const { data } = await axios.get(URL);
  return data;
};

const createEvent = async (body) => {
  const URL = `${DOMAIN}/api/evento/`;
  const { data } = await axios.post(URL, { ...body });
  return data;
};

const getEvent = async (id) => {
  const URL = `${DOMAIN}/api/evento/${id}`;
  const { data } = await axios.get(URL);
  return data;
};

const deleteEvent = async (id, event) => {
  const URL = `${DOMAIN}/api/evento/${id}`;
  const { data } = await axios.put(URL, { ...event });
  return data;
};

const updateEvent = async (id, event) => {
  const URL = `${DOMAIN}/api/evento/${id}`;
  const { data } = await axios.put(URL, { ...event });
  return data;
};

export { getEvent, getEvents, createEvent, deleteEvent, updateEvent };
