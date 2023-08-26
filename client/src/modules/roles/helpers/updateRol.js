import axios from "axios";

export const updateRol = async (idRol, newRol) => {
  try {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/group/${idRol}`;

    const response = await axios.put(URL, newRol);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
