import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getProyectos = async (token) => {
  const URL = `${DOMAIN}/api/proyecto/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(URL, config);
  return data;
};
