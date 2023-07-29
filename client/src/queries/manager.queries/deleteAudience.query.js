import {API_URL} from "../../config";
export const deleteUser = async (username) => {
    // Perform the delete request to your API
    const response = await fetch(`${API_URL}/api/manager/delete/${username}`, {
        method: 'DELETE',
        // Add any necessary headers or authentication tokens
    });

    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        const errorData = await response.text(); // Parse the error response body
        throw new Error(errorData); // Throw an error with the error message
    }

};