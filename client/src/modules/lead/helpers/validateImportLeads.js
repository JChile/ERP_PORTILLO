import axios from "axios";

export const validateImportLeads = async (body, token) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadCreationConfirmation/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(URL, { ...body }, config);
  return data;
};
