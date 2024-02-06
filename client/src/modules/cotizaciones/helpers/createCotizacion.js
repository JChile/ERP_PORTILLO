import axios from "axios";

export const createCampania = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/campania/`;

  const { data } = await axios.post(URL, { ...body });
  return data;
};
