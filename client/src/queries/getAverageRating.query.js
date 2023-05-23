import {API_URL} from "../config";


export const getAverageRating = async (movieID) => {
    const response = await fetch(`${API_URL}/api/user/average-rating/${movieID}`); // Replace with your API endpoint for fetching directors

    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        const errorData = await response.text(); // Parse the error response body
        throw new Error(errorData); // Throw an error with the error message
    }
};

