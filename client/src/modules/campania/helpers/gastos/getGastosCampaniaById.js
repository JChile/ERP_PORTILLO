import axios from "axios";

export const getGastosCampaniaById = async (query, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/gastoCampania/?${query}`;

  const { data } = await axios.get(
    URL,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};