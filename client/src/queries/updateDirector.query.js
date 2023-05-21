import { API_URL } from '../config';

export const updateDirectorPlatform = async (payload) => {
    const response = await fetch(`${API_URL}/api/user/update-platform`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to update director platform.');
    }

    return response.json();
};


