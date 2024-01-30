import axios from "axios";

export const createVideoProyecto = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/videoProyecto/`;

  const { data } = await axios.post(URL, body);
  return data;
};
