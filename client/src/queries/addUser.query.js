import {API_URL} from "../config";

export const addUser = (user) => {

        fetch(`${API_URL}/api/user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((response) => {
            if (response.ok) {
                return response.json(); // Resolve with the response body if successful
            } else {
                throw new Error("Couldn't create user.");
            }
        })
};
