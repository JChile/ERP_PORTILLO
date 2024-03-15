import axios from "axios";

export const updateGastosCampania = async (idCampania, body, authToken) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    try {
        const URL = `${DOMAIN}/api/gastoCampania/${idCampania}`;
        const { data } = await axios.put(
            URL,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            }
        );
        return data;
    } catch (error) {
        throw error;
    }
};