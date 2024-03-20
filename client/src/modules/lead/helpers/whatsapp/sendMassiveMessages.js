import axios from "axios";

export const sendMassiveMessage = async (leads, message, token) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/registroMasivoMensajes/`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {leads: [...leads], mensaje: message};
  console.log(body)
  const { data } = await axios.post(URL, body, config);
  return data;
};
