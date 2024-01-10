import axios from "axios";

export const updateProyecto = async (idProyecto, updatedProyecto, authToken) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/proyecto/${idProyecto}`;
  console.log(updateProyecto);
  const { data } = await axios.put(
    URL, 
    {...updatedProyecto,},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};
