import {API_URL} from "../config";


export const getAvailableTheaters = async (date, slot) => {
    const response = await fetch(`${API_URL}/api/user/available-theaters/${date}/${slot}`); // Replace with your API endpoint for fetching sessions
    if (!response.ok) {
        throw new Error('Failed to fetch availabe Theaters');
    }
    return response.json();
};