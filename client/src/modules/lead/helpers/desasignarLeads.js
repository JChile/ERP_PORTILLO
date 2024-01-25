import axios from "axios";

export const quitarLeads = async (token, body) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/desasignacionAsesorLeadById/`;
  console.log(body)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(URL, { ...body }, config);
  return data;
};
