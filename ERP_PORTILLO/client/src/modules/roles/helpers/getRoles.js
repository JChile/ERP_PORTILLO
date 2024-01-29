import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getRoles = async (authToken) => {
  const URL = `${DOMAIN}/api/group/`;
  const { data } = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
