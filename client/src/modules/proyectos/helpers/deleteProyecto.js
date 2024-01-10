import axios from "axios";

export const deleteProyecto = async (idProyecto, body, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto/${idProyecto}`;
  const { data } = await axios.put(
    URL, 
    {...body},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  console.log(data)
  return data;
};
