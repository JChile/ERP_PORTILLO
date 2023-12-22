import axios from "axios";

export const deleteProyecto = async (idProyecto, updateProyecto) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  try {
    const URL = `${DOMAIN}/api/proyecto/${idProyecto}`;
    const { data } = await axios.put(URL, {...updateProyecto});
    console.log(data)
    return data;
  }
  catch (error) {
    throw error
  }
};
