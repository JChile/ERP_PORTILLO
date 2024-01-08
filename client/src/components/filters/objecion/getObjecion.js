import axios from "axios";

export const getObjecion= async () => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/objecion/` 
    const { data } = await axios.get(URL);
    return data
}