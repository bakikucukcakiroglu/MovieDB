import {API_URL} from "../config";

export const addMovie = (movie) => {

    fetch(`${API_URL}/api/user/add-movie`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    }).then((response) => {
        if (response.ok) {
            return response.json(); // Resolve with the response body if successful
        } else {
            throw new Error("Couldn't create movie.");
        }
    })
};
