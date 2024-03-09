import axios from "axios";

export const createGastosCampania = async (body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/gastoCampania/`;

  const { data } = await axios.post(
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