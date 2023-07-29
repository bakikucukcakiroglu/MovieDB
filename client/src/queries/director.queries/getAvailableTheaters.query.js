import {API_URL} from "../../config";


export const getAvailableTheaters = async (date, slot) => {
    const response = await fetch(`${API_URL}/api/director/available-theaters/${date}/${slot}`); // Replace with your API endpoint for fetching sessions


    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        const errorData = await response.text(); // Parse the error response body
        throw new Error(errorData); // Throw an error with the error message
    }
};