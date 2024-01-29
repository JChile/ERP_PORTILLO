import axios from "axios";

export const getCampania= async () => {
    const DOMAIN = process.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/campania/` 
    const { data } = await axios.get(URL);
    return data
}