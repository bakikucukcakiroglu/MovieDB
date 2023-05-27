import {API_URL} from "../config";

export const buyTicket = async (buyTicketInfo) => {

    const response = await fetch(`${API_URL}/api/user/buy-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(buyTicketInfo),
    });


    if (response.ok) {
        return response.json(); // Resolve with the response body if successful
    } else {
        throw new Error("Couldn't buy ticket.");
    }
};
