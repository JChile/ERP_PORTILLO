import axios from "axios";

export const getProyectos = async ({ authToken }) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto/`;
  const { data } = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
