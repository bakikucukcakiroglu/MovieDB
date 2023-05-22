import {API_URL} from "../config";

export const addMovieSession = async (movie) => {

    const response = await fetch(`${API_URL}/api/user/add-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    });


    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        throw new Error("Couldn't create session.");
    }
};
