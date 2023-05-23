import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
} from '@mui/material';

import {getAllDirectorsMovies} from "../../queries/getAllDirectorsMovies.query";
import {getRatingsOfAudienceByUsername} from "../../queries/getRatingsOfAudience.query";


const ListDirectorsMoviesModal = ({listDirectorsMoviesModal, setListDirectorsMoviesModal, setAlert}) => {
    const [username, setUsername] = useState('');
    const [response, setResponse] = useState([]);





    const handleClose = () => {
        setListDirectorsMoviesModal(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFetchDirectorsMovies = async () => {
        // Perform the API call to fetch ratings for the given username
        // Replace this with your actual API call implementation
        // For simplicity, here's a mock response
        setResponse([]);


        try {
            const data = await getAllDirectorsMovies(username);
            setResponse(data);
            // Handle successful update
            setAlert({active: true, alertType: "success", alertMessage: `Movies of ${username} is fetched successfully!`});

        } catch (error) {
            console.error("Fetch ratings error:", error);

            setAlert({active: true, alertType: "error", alertMessage: error.message});

        }


    };

    return (
        <div>
            <Dialog open={listDirectorsMoviesModal} onClose={handleClose}>
                <DialogTitle>Director's Movies</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Button onClick={handleFetchDirectorsMovies}>Fetch Director's Movies</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Session ID</TableCell>
                                <TableCell>Movie ID</TableCell>
                                <TableCell>Movie Name</TableCell>
                                <TableCell>Theatre ID</TableCell>
                                <TableCell>District</TableCell>
                                <TableCell>Time Slot</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.map((response) => (
                                <TableRow key={response.movie_id}>
                                    <TableCell>{response.session_id}</TableCell>
                                    <TableCell>{response.movie_id}</TableCell>
                                    <TableCell>{response.movie_name}</TableCell>
                                    <TableCell>{response.theater_id}</TableCell>
                                    <TableCell>{response.theater_district}</TableCell>
                                    <TableCell>{response.time_slot}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListDirectorsMoviesModal;
