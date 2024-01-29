import axios from "axios";

export const getRoles = async () => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/group/`;

  const { data } = await axios.get(URL);
  return data;
};
