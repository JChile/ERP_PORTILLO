import axios from "axios";

export const getUsuarios = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user/`;

  const { data } = await axios.get(URL);
  return data;
};
