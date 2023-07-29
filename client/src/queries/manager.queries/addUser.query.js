import {API_URL} from "../../config";

export const addUser = async (user) => {

        const response = await fetch(`${API_URL}/api/manager/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        if (response.ok) {
            return response.json(); // Resolve with the response body if successful
        } else {
            const errorData = await response.text(); // Parse the error response body
            throw new Error(errorData); // Throw an error with the error message
        }
};
