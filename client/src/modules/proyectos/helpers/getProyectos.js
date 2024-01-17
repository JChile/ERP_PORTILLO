import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getProyectos = async ({ authToken }) => {
  const URL = `${DOMAIN}/api/proyecto/`;
  const { data } = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
