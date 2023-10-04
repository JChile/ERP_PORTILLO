import axios from "axios";
export const getCampania = async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/campania/${id}`;

  const { data } = await axios.get(URL);
  return data;
};
