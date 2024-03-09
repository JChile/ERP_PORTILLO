import axios from "axios";

export const getGastosCampaniaById = async (body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/gastoCampania/`;

  const { data } = await axios.get(
    URL,
    { ...body },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};