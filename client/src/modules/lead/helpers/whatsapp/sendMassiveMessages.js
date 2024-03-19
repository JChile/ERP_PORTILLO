import axios from "axios";

export const sendMassiveMessage = async (leads, message, token) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/whatsapp/${idItem}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(URL, { leads, message }, config);
  return data;
};
