import axios from "axios";

//const DOMAIN = import.meta.env.VITE_BACKEND_URL;
const DOMAIN = "http://127.0.0.1:8000";

const getEvents = async (token) => {
  const URL = `${DOMAIN}/api/evento/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(URL, config);
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
