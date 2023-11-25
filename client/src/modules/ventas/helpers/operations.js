import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getEvents = async () => {
  const URL = `${DOMAIN}/api/evento/`;
  const { data } = await axios.get(URL);
  return data;
};

export const createEvent = async (body) => {
  const URL = `${DOMAIN}/api/event/`;
  const { data } = await axios.post(URL, { ...body });
  return data;
};

export const getEvent = async (id) => {
  const URL = `${DOMAIN}/api/evento/${id}`;
  const { data } = await axios.get(URL);
  return data;
};

export const deleteEvent = async (id, event) => {
  const URL = `${DOMAIN}/api/evento/${id}`;
  const { data } = await axios.put(URL, { ...event });
  return data;
};

export const updateEvent = async (id, event) => {
  const URL = `${DOMAIN}/api/evento/${id}`;
  const { data } = await axios.put(URL, { ...event });
  return data;
};
