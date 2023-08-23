import axios from "axios";

export const getProyectos = async () => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/proyecto/` 
    const { data } = await axios.get(URL);
    return data
}