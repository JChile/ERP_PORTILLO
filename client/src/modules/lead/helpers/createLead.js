import axios from "axios";

export const createLead = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/`;
  const { data } = await axios.post(URL, { ...body });
  return data;
};
