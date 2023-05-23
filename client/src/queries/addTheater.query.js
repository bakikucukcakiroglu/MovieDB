import {API_URL} from "../config";

export const addTheater = async (theater) => {

    const response = await fetch(`${API_URL}/api/user/theater/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(theater),
    })

    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        const errorData = await response.text(); // Parse the error response body
        throw new Error(errorData); // Throw an error with the error message
    }
};
