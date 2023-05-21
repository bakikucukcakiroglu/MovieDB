

import { useQuery } from 'react-query'
import { useMutation } from 'react-query';
import {API_URL} from "../config";
export const deleteUser = async (username) => {
    // Perform the delete request to your API
    const response = await fetch(`${API_URL}/api/user/delete/${username}`, {
        method: 'DELETE',
        // Add any necessary headers or authentication tokens
    });

    if (!response.ok) {
        throw new Error('Failed to delete user.');
    }

    // Return the response data if needed
    return response.json();
};