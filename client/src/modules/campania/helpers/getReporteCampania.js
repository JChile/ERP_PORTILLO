import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getReporteCampania = async (query, authToken) => {
  const URL = `${DOMAIN}/api/reporteMarketing/?${query}`;
  const { data } = await axios.get(URL);
  return data;
};
