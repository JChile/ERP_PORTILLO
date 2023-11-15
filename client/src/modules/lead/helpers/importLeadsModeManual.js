import axios from "axios";

export const importLeadsModeManual = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadMultipleCreationManual/`;
  const { data } = await axios.post(URL, { ...body });
  return data;
};
