import axios from "axios";

export const updateUsuario = async (idUsuario, body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user/${idUsuario}`;

  const { data } = await axios.put(
    URL,
    {
      ...body,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};
