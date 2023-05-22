import { API_URL } from '../config';

export const updateMovie = async (payload) => {
    const response = await fetch(`${API_URL}/api/user/update-movie`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to update movie name.');
    }

    return response.json();
};


