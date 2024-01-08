import axios from "axios";
export const getProducto= async (id) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/producto/${id}`;
  console.log("--->"+URL+"---->"+id);
  const { data } = await axios.get(URL);
  return data;
};
