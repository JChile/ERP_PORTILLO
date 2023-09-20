import axios from "axios";

export const updateUsuario = async (idUsuario, body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user_profile/${idUsuario}`;

  const { data } = await axios.put(URL, {
    ...body,
  });
  return data;
};
