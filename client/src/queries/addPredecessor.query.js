import {API_URL} from "../config";

export const addPredecessor = async (movie) => {

    const response = await fetch(`${API_URL}/api/user/add-predecessor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    });


    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        throw new Error("Couldn't create predecessor.");
    }
};
