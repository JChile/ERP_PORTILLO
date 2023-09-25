import axios from "axios";

export const updateLead = async (idLead, updatedLead) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/${idLead}`;

  const { data } = await axios.put(URL, {
    ...updatedLead,
  });
  return data;
};