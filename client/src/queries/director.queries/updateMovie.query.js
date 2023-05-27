import { API_URL } from '../../config';

export const updateMovie = async (payload) => {
    const response = await fetch(`${API_URL}/api/director/update-movie`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });


    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        const errorData = await response.text(); // Parse the error response body
        throw new Error(errorData); // Throw an error with the error message
    }
};


