import axios from "axios";

export const deleteProducto = async (idProducto, body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  try {
    const URL = `${DOMAIN}/api/producto/${idProducto}`;
    const { data } = await axios.put(
      URL, 
      {...body},
      {headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },}
      );
    console.log(data)
    return data;
  }
  catch (error) {
    throw error
  }
};
