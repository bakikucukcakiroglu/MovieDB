import {API_URL} from "../config";


export const getAudiencesTickets = async (username) => {

    const response = await fetch(`${API_URL}/api/user/tickets/${username}`); // Replace with your API endpoint for fetching directors


    if (response.ok) {
        return response.json();

    }else{

        const errorData = await response.text(); // Parse the error response body
        throw new Error(errorData); // Throw an error with the error message
    }

};

