import axios from "axios";

export const updateCampania = async (idCampania, updatedCampaign) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/campania/${idCampania}`;

  const { data } = await axios.put(URL, {
    ...updatedCampaign,
  });
  return data;
};
