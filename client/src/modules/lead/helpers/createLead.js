import axios from "axios";

export const createLead = async (body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/lead/`;
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
