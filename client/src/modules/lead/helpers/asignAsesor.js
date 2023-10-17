import axios from "axios";

export const multipleAsingAsesor = async (body) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    const URL = `${DOMAIN}/api/asesorAsignacion/`;
    const { data } = await axios.post(URL, { ...body });
    console.log("data--", data);
    return data;
};