import axios from "axios";

export const deleteVideoProducto = async (idItem) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/videoProducto/${idItem}`;
  const { data } = await axios.delete(URL);
  return data;
};
