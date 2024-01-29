import axios from "axios";

export const getUsuarioPerfil = async (idUser, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user/${idUser}`;

  const { data } = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};
