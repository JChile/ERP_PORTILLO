import axios from "axios";

export const consultTipoCambio = async () => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/cambioDolar/`;

  const { data } = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
};