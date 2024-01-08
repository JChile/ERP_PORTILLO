import axios from "axios";

export const getRolById = async (idRol) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/group_modulo/${idRol}`;
  const { data } = await axios.get(URL);
  return data;
};
