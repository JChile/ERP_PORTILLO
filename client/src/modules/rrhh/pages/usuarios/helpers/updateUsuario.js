import axios from "axios";

export const updateUsuario = async (idUsuario, body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user_profile/`;

  const { data } = await axios.put(URL, {
    ...body,
    id: idUsuario,
  });
  return data;
};
