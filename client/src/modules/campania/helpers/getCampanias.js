import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getCampanias = async (query, authToken) => {
  const URL = `${DOMAIN}/api/campania/?${query}`;
  const { data } = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
