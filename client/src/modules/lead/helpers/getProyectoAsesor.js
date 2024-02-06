import axios from "axios";

export const getProyectoAsesor = async (token, projectId) => {
  const DOMAIN = process.env.VITE_BACKEND_URL;
  const url = `${DOMAIN}/api/proyecto/${projectId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(url, config);
  return data;
};
