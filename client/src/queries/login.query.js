import {API_URL} from "../config";

export const login = (credentials) =>
        fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then((response) => {
            if (response.ok) {
                return response.json(); // Resolve with the response body if successful
            } else {
                throw new Error('Invalid credentials');
            }
        }
);


