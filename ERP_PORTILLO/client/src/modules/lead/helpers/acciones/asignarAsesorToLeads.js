import axios from "axios";

export const asignarAsesorToLeads = async (body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/asignacionAsesorLeadById/`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const { data } = await axios.post(URL, { ...body }, config);
  return data;
};
