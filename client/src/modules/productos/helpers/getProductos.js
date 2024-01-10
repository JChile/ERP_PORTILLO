import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_URL;

export const getProductos= async ({authToken}) => {
  const URL = `${DOMAIN}/api/producto/`;
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

export const getProductosActivos= async ({authToken}) => {
  const URL = `${DOMAIN}/api/productoActivo/`;
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
export const getProductosInactivos= async ({authToken}) => {
  const URL = `${DOMAIN}/api/productoInactivo/`;
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