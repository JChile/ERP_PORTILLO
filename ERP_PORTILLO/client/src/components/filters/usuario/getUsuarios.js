import axios from "axios";

export const getUsuarios = async () => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user_active/`;

  const { data } = await axios.get(URL);
  return data;
};
