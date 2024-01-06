import axios from "axios";

export const updateProducto = async (idProducto, updatedProducto) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/producto/${idProducto}`;
  console.log(updateProducto);
  const { data } = await axios.put(URL, {
    ...updatedProducto,
  });
  return data;
};
