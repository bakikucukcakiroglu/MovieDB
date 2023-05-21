import {API_URL} from "../config";

export const addUser = async (user) => {

        const response = await fetch(`${API_URL}/api/user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

            if (response.ok) {
                return response.json(); // Resolve with the response body if successful
            } else {
                throw new Error("Couldn't create user.");
            }
};
