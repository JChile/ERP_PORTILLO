import axios from "axios";

export const consultPresupuestoProyectoDate = async (body) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/presupuestoProyecto/?proyecto=${body["proyecto"]}&anio=${body["anio"]}&mes=${body["mes"]}`
    console.log(URL)
    const { data } = await axios.get(URL)
    return data;
};