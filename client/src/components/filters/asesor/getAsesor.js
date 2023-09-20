import axios from "axios";

export const getAsesor= async () => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/asesor/` 
    const { data } = await axios.get(URL);
    return data
}