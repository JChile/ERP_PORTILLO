import axios from "axios";

export const deleteProducto = async (idProducto, updateProducto) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  try {
    const URL = `${DOMAIN}/api/producto/${idProducto}`;
    const { data } = await axios.put(URL, {...updateProducto});
    console.log(data)
    return data;
  }
  catch (error) {
    throw error
  }
};
