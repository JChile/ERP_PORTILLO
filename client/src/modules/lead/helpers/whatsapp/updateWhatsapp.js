import axios from "axios";

export const updateWhatsapp = async (idItem, body, token) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/whatsapp/${idItem}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.put(URL, { ...body }, config);
  return data;
};
