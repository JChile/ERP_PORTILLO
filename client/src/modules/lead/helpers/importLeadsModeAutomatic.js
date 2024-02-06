import axios from "axios";

export const importLeadsModeAutomatic = async (body, token, query) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadMultipleCreationAutomatic/?${query}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(URL, body, config);
  return data;
};
