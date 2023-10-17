import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getRoles = async () => {
  const URL = `${DOMAIN}/api/group/`;
  const { data } = await axios.get(URL);
  return data;
};
