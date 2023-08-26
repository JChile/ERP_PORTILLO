import axios from "axios";

export const createRoles = async (newRole) => {
  try {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/group/`;

    const response = await axios.post(URL, newRole);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
