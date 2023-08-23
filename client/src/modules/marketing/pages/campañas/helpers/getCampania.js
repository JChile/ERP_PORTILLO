import axios from "axios";

/**
 * Funcion utilitaria para obtener el detalle de una campaña.
 */
export const getCampania = async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/campania/${id}`;

  const { data } = await axios.get(URL);
  return data;
};
