import axios from "axios";

export const getLeads = async (token) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/`;
  const { data } = await axios.get(URL);
  return data;
};

export const getLeadsActivos = async (token) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadActivo/`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(URL, config);

  return data;
};

export const getLeadsNoAsignados = async (token) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/leadNoAsignado/`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(URL, config);

  return data;
};

/** Endpoints para realizar solitudes de leads por asesor,
 *  endpoints relacionados al area de ventas
 *  @param {string} token, user access token
 *  @returns {object} data, object with asesor information and its leads.
 *  @throws {error} if something happens
 * */
export const getAsesorLeads = async (token, queries = "") => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/asesorLead/`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data, error } = await axios.get(URL, config);
  if (error) throw error;
  return data;
};
