import axios from "axios";

export const getRolById = async (idRol) => {
  try {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/group_modulo/${idRol}`;

    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los módulos:", error.message);
    throw error;
  }
};
