import axios from "axios";

export const createVideoProducto = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/videoProducto/`;

  const { data } = await axios.post(URL, body);
  return data;
};
