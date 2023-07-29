import {API_URL} from "../../config";


export const getAllSessions = async () => {
    const response = await fetch(`${API_URL}/api/audience/sessions`); // Replace with your API endpoint for fetching sessions
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    return response.json();
};

