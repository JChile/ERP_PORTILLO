import axios from "axios";

export const createRoles = async (newRole) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/group/`;
  const { data } = await axios.post(URL, newRole);
  return data;
};
