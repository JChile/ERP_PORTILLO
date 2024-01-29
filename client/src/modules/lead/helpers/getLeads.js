import axios from "axios";

export const getLeads = async (token, query) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/?${query}`;
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
