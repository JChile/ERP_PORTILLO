import axios from "axios";

export const updateRol = async (idRol, newRol, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/group/${idRol}`;
  const { data } = await axios.put(URL, newRol, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
