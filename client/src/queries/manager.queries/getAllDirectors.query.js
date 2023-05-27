import {API_URL} from "../../config";


export const getAllDirectors = async () => {
    const response = await fetch(`${API_URL}/api/manager/directors`); // Replace with your API endpoint for fetching directors
    if (!response.ok) {
        throw new Error('Failed to fetch directors');
    }
    return response.json();
};

