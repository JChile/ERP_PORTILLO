import axios from "axios";

export const getProductosByProyecto = async (idProyecto) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/productoList/?proyecto=${idProyecto}&estado=A`;
    const { data } = await axios.get(URL);
    return data;
};
