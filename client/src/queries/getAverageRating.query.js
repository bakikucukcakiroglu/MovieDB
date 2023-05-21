import {API_URL} from "../config";


export const getAverageRating = async (movieID) => {
    const response = await fetch(`${API_URL}/api/user/average-rating/${movieID}`); // Replace with your API endpoint for fetching directors
    if (!response.ok) {
        throw new Error('Failed to get average rating of a film');
    }
    return response.json();
};

