import axios from "axios";

export const getModulos = async () => {
  try {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/modulo_permission/`;

    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los módulos:", error.message);
    throw error;
  }
};
