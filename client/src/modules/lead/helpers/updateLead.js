import axios from "axios";

export const updateLead = async (idLead, updatedLead, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/${idLead}`;

  const { data } = await axios.put(
    URL,
    {
      ...updatedLead,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};
