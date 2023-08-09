import axios from "axios";

export const getUsuarioPerfil = async (idUser) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user_profile/${idUser}`;

  const { data } = await axios.get(URL);
  return data;
};
