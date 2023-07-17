import axios from "axios";

export const createRoles = async (newRole) => {
  const DOMAIN = import.meta.env.VITE_BACKEND_URL;

  const URL = `${DOMAIN}/api/group/`;

  try {
    const response = await axios.post(URL, newRole);
    
    if (response.status === 200) {
        
        console.log("Nuevo rol creado");

    }
  } 
  catch (err) {
    console.error(err);
    throw new Error(err);
  }

  const { data } = await axios.get(URL);
  return data;
};
