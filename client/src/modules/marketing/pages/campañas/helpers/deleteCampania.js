import axios from "axios";

export const deleteCampania = async (idItem, body) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/campania/${idItem}`;
    
    const { data } = await axios.put(URL,{ body });
    return data;
}