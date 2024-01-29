import axios from "axios";

export const createProyecto = async (body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto/`;

  const { data } = await axios.post(
    URL, 
    { ...body },
    {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
