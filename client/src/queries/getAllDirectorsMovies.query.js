import {API_URL} from "../config";


export const getAllDirectorsMovies = async (directorUsername) => {
    const response = await fetch(`${API_URL}/api/user/directors-movies/${directorUsername}`); // Replace with your API endpoint for fetching directors
    if (!response.ok) {
        throw new Error('Failed to fetch movies of a director');
    }
    return response.json();
};

