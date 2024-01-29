import axios from "axios";

export const createLlamada = async (body, token) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/llamada/`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(URL, { ...body }, config);
  return data;
};
