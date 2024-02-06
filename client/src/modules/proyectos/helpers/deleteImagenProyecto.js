import axios from "axios";

export const deleteImagenProyecto = async (idItem) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/imagenProyecto/${idItem}`;
  const { data } = await axios.delete(URL);
  return data;
};
