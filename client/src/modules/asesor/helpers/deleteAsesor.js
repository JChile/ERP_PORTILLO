import axios from "axios";

export const deleteAsesor = async (idItem, body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/asesor/${idItem}`;

  const { data } = await axios.put(URL, { ...body });
  return data;
};
