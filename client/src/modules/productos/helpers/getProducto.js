import axios from "axios";
export const getProducto= async (id, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/producto/${id}`;
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
