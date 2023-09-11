import axios from "axios";

export const getEstadoLead= async () => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/estado/` 
    const { data } = await axios.get(URL);
    return data
}