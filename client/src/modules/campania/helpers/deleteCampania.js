import axios from "axios";

export const deleteCampania = async (idCampania, updateCampania) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/campania/${idCampania}`;
  const { data } = await axios.put(URL, {...updateCampania});
  return data;
};
