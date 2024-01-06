import axios from "axios";

export const updateProyecto = async (idProyecto, updatedProyecto) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto/${idProyecto}`;
  console.log(updateProyecto);
  const { data } = await axios.put(URL, {
    ...updatedProyecto,
  });
  return data;
};
