import { useState } from 'react';
import { useQuery } from 'react-query'
import { useMutation } from 'react-query';
import {API_URL} from "../config";

export const useAddUser = () => {
    const addUser = useMutation((user) =>
        fetch(`${API_URL}/api/user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then((response) => {
            if (response.ok) {
                return response.json(); // Resolve with the response body if successful
            } else {
                throw new Error("Couldn't create user.");
            }
        })
    );

    return addUser;
};
