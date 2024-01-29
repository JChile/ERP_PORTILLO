import axios from "axios";

export const deleteCampania = async (idCampania, updateCampania, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  try {
    const URL = `${DOMAIN}/api/campania/${idCampania}`;
    const { data } = await axios.put(
      URL,
      { ...updateCampania },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
