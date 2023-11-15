import axios from "axios";

export const validateImportLeads = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadCreationConfirmation/`;
  const { data } = await axios.post(URL, { ...body });
  return data;
};
