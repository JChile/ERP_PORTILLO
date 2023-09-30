import axios from "axios";

export const updateAsesor = async (idAsesor, body) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;
  const URL = `${DOMAIN}/api/asesor/${idAsesor}`;

  const { data } = await axios.put(URL, {
    ...body,
  });
  return data;
};
