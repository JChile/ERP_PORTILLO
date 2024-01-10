import axios from "axios";

export const updateProducto = async (idProducto, body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/producto/${idProducto}`;
  console.log(updateProducto);
  const { data } = await axios.put(
    URL, 
    {...body,},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};
