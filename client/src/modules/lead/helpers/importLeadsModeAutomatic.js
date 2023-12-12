import axios from "axios";

export const importLeadsModeAutomatic = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadMultipleCreationAutomatic/`;
  const { data } = await axios.post(URL, body);
  return data;
};
