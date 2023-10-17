import axios from "axios";

export const updateRol = async (idRol, newRol) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/group/${idRol}`;
  const { data } = await axios.put(URL, newRol);
  return data;
};
