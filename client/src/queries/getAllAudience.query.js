import {API_URL} from "../config";


export const getAllAudience = async (payload) => {

    const response = await fetch(`${API_URL}/api/user/audience`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });


    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        throw new Error('Failed to fetch audience');
    }
};

