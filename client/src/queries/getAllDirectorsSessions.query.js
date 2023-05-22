import {API_URL} from "../config";


export const getAllDirectorsSessions = async (directorUsername) => {
    const response = await fetch(`${API_URL}/api/user/directors-sessions/${directorUsername}`); // Replace with your API endpoint for fetching directors
    if (!response.ok) {
        throw new Error('Failed to fetch sessions of the director');
    }
    return response.json();
};

