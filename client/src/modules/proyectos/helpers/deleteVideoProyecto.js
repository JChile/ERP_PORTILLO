import axios from "axios";

export const deleteVideoProyecto = async (idItem) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/videoProyecto/${idItem}`;
  const { data } = await axios.delete(URL);
  return data;
};
