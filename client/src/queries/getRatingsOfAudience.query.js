import {API_URL} from "../config";


export const getRatingsOfAudienceByUsername = async (username) => {
    const response = await fetch(`${API_URL}/api/user/ratings/${username}`); // Replace with your API endpoint for fetching directors
    if (!response.ok) {
        throw new Error('Failed to fetch directors');
    }
    return response.json();
};

