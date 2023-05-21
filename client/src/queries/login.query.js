import { useState } from 'react';
import { useQuery } from 'react-query'
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import {API_URL} from "../config";

export const useLogin = () => {
    const login = useMutation((credentials) =>
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
        })
    );

    return login;
};
