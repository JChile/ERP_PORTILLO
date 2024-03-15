
import axios from "axios";

export const deleteGastosCampania = async (idCampania, authToken) => {
    const DOMAIN = import.meta.env.VITE_BACKEND_URL;
    try {
        const URL = `${DOMAIN}/api/gastoCampania/${idCampania}`;
        const { data } = await axios.delete(
            URL,
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
