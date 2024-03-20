import axios from "axios";

export const deleteLead = async (idItem, body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  try {
    const URL = `${DOMAIN}/api/lead/${idItem}`;
    const { data } = await axios.delete(
      URL,
      {
        data: body, // Aquí debes pasar el cuerpo de la solicitud dentro del objeto "data"
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
