import axios from "axios";

export const createUsuario = async (body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/user_profile/`;

  const { data } = await axios.post(URL, {
    ...body,
  });
  return data;
};
